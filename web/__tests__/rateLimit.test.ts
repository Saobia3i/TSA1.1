import { rateLimit } from "@/lib/rateLimit";

describe("rateLimit", () => {
  it("allows requests within limit", () => {
    const result = rateLimit("test-key-1", { limit: 3, windowMs: 60000 });
    expect(result.success).toBe(true);
    expect(result.remaining).toBe(2);
  });

  it("blocks after limit exceeded", () => {
    const key = "test-key-2";
    const opts = { limit: 2, windowMs: 60000 };
    rateLimit(key, opts);
    rateLimit(key, opts);
    const result = rateLimit(key, opts);
    expect(result.success).toBe(false);
    expect(result.remaining).toBe(0);
  });

  it("different keys are independent", () => {
    const opts = { limit: 1, windowMs: 60000 };
    rateLimit("key-a", opts);
    const result = rateLimit("key-b", opts);
    expect(result.success).toBe(true);
  });
});
