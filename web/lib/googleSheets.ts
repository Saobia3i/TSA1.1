import { createPrivateKey, createSign } from "crypto";
import { getEnvAny } from "@/lib/env";

const GOOGLE_OAUTH_TOKEN_URL = "https://oauth2.googleapis.com/token";
const GOOGLE_SHEETS_SCOPE = "https://www.googleapis.com/auth/spreadsheets";
const DEFAULT_SHEET_NAME = "Enrollments";

type AccessTokenCache = {
  accessToken: string;
  expiresAt: number;
};

type GoogleSheetsConfig = {
  clientEmail: string;
  privateKey: string;
  spreadsheetId: string;
  sheetName: string;
};

const globalForSheets = globalThis as typeof globalThis & {
  __googleSheetsTokenCache?: AccessTokenCache;
};

function toBase64Url(value: Buffer | string) {
  const base64 = Buffer.from(value).toString("base64");
  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

function resolveSpreadsheetId(rawValue: string) {
  const trimmed = rawValue.trim();
  const match = trimmed.match(/\/spreadsheets\/d\/([a-zA-Z0-9-_]+)/);
  return match?.[1] || trimmed;
}

function toA1SheetName(sheetName: string) {
  return `'${sheetName.replace(/'/g, "''")}'`;
}

function parseServiceAccountJson(rawValue: string) {
  if (!rawValue) return null;

  try {
    const parsed = JSON.parse(rawValue);
    if (
      parsed &&
      typeof parsed.client_email === "string" &&
      typeof parsed.private_key === "string"
    ) {
      return parsed as {
        client_email: string;
        private_key: string;
      };
    }
  } catch {
    return null;
  }

  return null;
}

function getGoogleSheetsConfig(): GoogleSheetsConfig {
  const serviceAccountJson = parseServiceAccountJson(
    getEnvAny(
      "GOOGLE_SERVICE_ACCOUNT_JSON",
      "GOOGLE_SHEETS_SERVICE_ACCOUNT_JSON",
      "Google__ServiceAccountJson"
    ).replace(/\\n/g, "\n")
  );
  const clientEmail =
    serviceAccountJson?.client_email ||
    getEnvAny(
    "GOOGLE_SERVICE_ACCOUNT_EMAIL",
    "GOOGLE_SHEETS_CLIENT_EMAIL",
    "Google__ServiceAccountEmail"
  );
  const privateKey =
    serviceAccountJson?.private_key ||
    getEnvAny(
      "GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY",
      "GOOGLE_SHEETS_PRIVATE_KEY",
      "Google__ServiceAccountPrivateKey"
    ).replace(/\\n/g, "\n");
  const spreadsheetId = resolveSpreadsheetId(
    getEnvAny(
      "GOOGLE_ENROLLMENT_SHEET_ID",
      "GOOGLE_SHEETS_SPREADSHEET_ID",
      "Google__EnrollmentSheetId"
    )
  );
  const sheetName =
    getEnvAny(
      "GOOGLE_ENROLLMENT_SHEET_NAME",
      "GOOGLE_SHEETS_SHEET_NAME",
      "Google__EnrollmentSheetName"
    ) || DEFAULT_SHEET_NAME;

  if (!clientEmail || !privateKey) {
    throw new Error(
      "Google Sheets credentials are not configured. Set GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY, or GOOGLE_SERVICE_ACCOUNT_JSON."
    );
  }

  if (!privateKey.includes("BEGIN PRIVATE KEY")) {
    throw new Error(
      "Invalid Google Sheets private key. Use a Google Service Account private_key, not GOOGLE_CLIENT_SECRET or client_secret.json."
    );
  }

  return { clientEmail, privateKey, spreadsheetId, sheetName };
}

async function getGoogleAccessToken() {
  const cached = globalForSheets.__googleSheetsTokenCache;
  if (cached && cached.expiresAt > Date.now() + 60_000) {
    return cached.accessToken;
  }

  const { clientEmail, privateKey } = getGoogleSheetsConfig();
  const issuedAt = Math.floor(Date.now() / 1000);
  const header = { alg: "RS256", typ: "JWT" };
  const payload = {
    iss: clientEmail,
    scope: GOOGLE_SHEETS_SCOPE,
    aud: GOOGLE_OAUTH_TOKEN_URL,
    exp: issuedAt + 3600,
    iat: issuedAt,
  };

  const encodedHeader = toBase64Url(JSON.stringify(header));
  const encodedPayload = toBase64Url(JSON.stringify(payload));
  const unsignedToken = `${encodedHeader}.${encodedPayload}`;
  const signer = createSign("RSA-SHA256");
  signer.update(unsignedToken);
  signer.end();

  const signature = signer.sign(
    createPrivateKey({
      key: privateKey,
      format: "pem",
    })
  );
  const assertion = `${unsignedToken}.${toBase64Url(signature)}`;

  const response = await fetch(GOOGLE_OAUTH_TOKEN_URL, {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Google access token request failed: ${details}`);
  }

  const tokenResponse = (await response.json()) as {
    access_token: string;
    expires_in: number;
  };

  globalForSheets.__googleSheetsTokenCache = {
    accessToken: tokenResponse.access_token,
    expiresAt: Date.now() + tokenResponse.expires_in * 1000,
  };

  return tokenResponse.access_token;
}

async function getFirstSpreadsheetSheetName(
  spreadsheetId: string,
  accessToken: string
) {
  const response = await fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}?fields=sheets.properties.title`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    const details = await response.text();
    throw new Error(`Google Sheets metadata fetch failed: ${details}`);
  }

  const payload = (await response.json()) as {
    sheets?: Array<{ properties?: { title?: string } }>;
  };

  const firstSheetName = payload.sheets?.[0]?.properties?.title?.trim();
  if (!firstSheetName) {
    throw new Error("Google Sheets metadata did not return any sheet titles.");
  }

  return firstSheetName;
}

async function appendValuesToSheet(params: {
  spreadsheetId: string;
  sheetName: string;
  accessToken: string;
  values: string[][];
}) {
  const range = `${toA1SheetName(params.sheetName)}!A:I`;
  return fetch(
    `https://sheets.googleapis.com/v4/spreadsheets/${params.spreadsheetId}/values/${encodeURIComponent(
      range
    )}:append?valueInputOption=USER_ENTERED&insertDataOption=INSERT_ROWS`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${params.accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        values: params.values,
      }),
      cache: "no-store",
    }
  );
}

export async function appendEnrollmentToGoogleSheet(params: {
  enrollmentId: string;
  studentName: string;
  studentEmail: string;
  studentContact: string;
  courseName: string;
  courseId: string;
  status: string;
  enrolledAt: Date;
}) {
  console.log("🔄 Starting Google Sheets sync...");
  
  try {
    const { spreadsheetId, sheetName } = getGoogleSheetsConfig();
    console.log(`📊 Target Sheet: ${spreadsheetId} / ${sheetName}`);
    
    const accessToken = await getGoogleAccessToken();
    console.log("✓ Access token obtained");
    
    const enrolledAtBd = params.enrolledAt.toLocaleString("en-BD", {
      timeZone: "Asia/Dhaka",
      dateStyle: "full",
      timeStyle: "short",
    });

    const values = [
      [
        params.enrollmentId,
        params.studentName,
        params.studentEmail,
        params.studentContact,
        params.courseName,
        params.courseId,
        params.status,
        params.enrolledAt.toISOString(),
        enrolledAtBd,
      ],
    ];

    let response = await appendValuesToSheet({
      spreadsheetId,
      sheetName,
      accessToken,
      values,
    });

    if (!response.ok) {
      const details = await response.text();
      console.warn(`⚠️ Sheet append failed with configured name "${sheetName}": ${details}`);
      
      if (details.includes("Unable to parse range")) {
        console.log("🔍 Attempting to detect first sheet name...");
        const detectedSheetName = await getFirstSpreadsheetSheetName(
          spreadsheetId,
          accessToken
        );
        console.log(`📝 Detected sheet name: "${detectedSheetName}"`);

        response = await appendValuesToSheet({
          spreadsheetId,
          sheetName: detectedSheetName,
          accessToken,
          values,
        });
      } else {
        throw new Error(`Google Sheets append failed: ${details}`);
      }
    }

    if (!response.ok) {
      const details = await response.text();
      throw new Error(`Google Sheets append failed: ${details}`);
    }
    
    console.log("✅ Successfully appended to Google Sheets");
  } catch (error) {
    console.error("❌ Google Sheets sync error:", error);
    throw error; // Re-throw so caller can handle it
  }
}
