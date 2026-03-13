import {
  validateEmail,
  validatePassword,
  validateContact,
  normalizeInternationalWhatsappNumber,
  normalizeWhatsappWithCountryCode,
} from "@/lib/validators";

describe("validateEmail", () => {
  it("valid emails pass", () => {
    expect(validateEmail("user@example.com")).toBe(true);
    expect(validateEmail("user+tag@example.co.uk")).toBe(true);
  });

  it("invalid emails fail", () => {
    expect(validateEmail("notanemail")).toBe(false);
    expect(validateEmail("@example.com")).toBe(false);
    expect(validateEmail("user@")).toBe(false);
  });
});

describe("validatePassword", () => {
  it("strong password passes", () => {
    const result = validatePassword("Abcdef1@");
    expect(result.isValid).toBe(true);
    expect(result.errors).toHaveLength(0);
  });

  it("short password fails", () => {
    const result = validatePassword("Ab1@");
    expect(result.isValid).toBe(false);
    expect(result.errors).toContain("Password must be at least 8 characters");
  });

  it("missing uppercase fails", () => {
    const result = validatePassword("abcdef1@");
    expect(result.errors).toContain("Must contain uppercase letter");
  });

  it("missing number fails", () => {
    const result = validatePassword("Abcdefg@");
    expect(result.errors).toContain("Must contain number");
  });

  it("missing special char fails", () => {
    const result = validatePassword("Abcdef12");
    expect(result.errors).toContain("Must contain special character (!@#$%^&*)");
  });
});

describe("validateContact", () => {
  it("valid BD number passes", () => {
    expect(validateContact("+8801712345678")).toBe(true);
    expect(validateContact("01712345678")).toBe(true);
  });

  it("invalid number fails", () => {
    expect(validateContact("12345")).toBe(false);
    expect(validateContact("abcdefg")).toBe(false);
  });
});

describe("normalizeInternationalWhatsappNumber", () => {
  it("normalizes valid number", () => {
    expect(normalizeInternationalWhatsappNumber("+8801712345678")).toBe("+8801712345678");
  });

  it("throws if no + prefix", () => {
    expect(() => normalizeInternationalWhatsappNumber("8801712345678")).toThrow(
      "WhatsApp number must include country code"
    );
  });

  it("throws if too short", () => {
    expect(() => normalizeInternationalWhatsappNumber("+123")).toThrow(
      "Enter a valid WhatsApp number with country code"
    );
  });
});

describe("normalizeWhatsappWithCountryCode", () => {
  it("combines country code and local number", () => {
    expect(normalizeWhatsappWithCountryCode("+880", "1712345678")).toBe("+8801712345678");
  });

  it("strips leading zero from local number", () => {
    expect(normalizeWhatsappWithCountryCode("+880", "01712345678")).toBe("+8801712345678");
  });

  it("throws on invalid country code", () => {
    expect(() => normalizeWhatsappWithCountryCode("880", "1712345678")).toThrow(
      "Valid country code is required."
    );
  });

  it("throws on too short local number", () => {
    expect(() => normalizeWhatsappWithCountryCode("+880", "123")).toThrow(
      "Valid WhatsApp number is required."
    );
  });
});
