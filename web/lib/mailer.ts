/**
 * Shared SMTP mailer utility.
 * Used by enrollment notification and admin course-details mail.
 */
import { getEnvAny } from "@/lib/env";

interface MailOptions {
  to: string;
  subject: string;
  text: string;
  html?: string;
}

export async function sendMail(options: MailOptions): Promise<void> {
  const smtpUser = getEnvAny("SMTP_USER", "SmtpUser", "Email__SmtpUser");
  const smtpPass = getEnvAny("SMTP_PASS", "SmtpPass", "Email__SmtpPass");
  const smtpHost =
    getEnvAny("SMTP_HOST", "SmtpHost", "Email__SmtpHost") || "smtp.gmail.com";
  const smtpPort = Number(
    getEnvAny("SMTP_PORT", "SmtpPort", "Email__SmtpPort") || "587"
  );
  const fromAddress =
    getEnvAny("SMTP_FROM", "FromEmail", "Email__FromEmail") || smtpUser;

  if (!smtpUser || !smtpPass) {
    throw new Error("SMTP credentials (SMTP_USER / SMTP_PASS) are not configured.");
  }

  const nodemailer = await import("nodemailer");
  const transporter = nodemailer.createTransport({
    host: smtpHost,
    port: smtpPort,
    secure: smtpPort === 465,
    auth: { user: smtpUser, pass: smtpPass },
  });

  await transporter.sendMail({
    from: fromAddress,
    to: options.to,
    subject: options.subject,
    text: options.text,
    ...(options.html ? { html: options.html } : {}),
  });
}
