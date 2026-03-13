/**
 * Shared environment variable helper.
 * Tries multiple key aliases and returns the first non-empty value.
 */
export function getEnvAny(...keys: string[]): string {
  for (const key of keys) {
    const value = process.env[key];
    if (value && value.trim()) return value.trim();
  }
  return "";
}
