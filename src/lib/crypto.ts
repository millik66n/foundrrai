import crypto from "crypto";

/**
 * Symmetric encryption for provider tokens (Vercel/Netlify/Supabase) stored at
 * rest. AES-256-GCM with the server-only FOUNDRR_TOKEN_ENCRYPTION_KEY (base64,
 * 32 bytes). Never expose decrypted tokens to the browser.
 */
function getKey(): Buffer {
  const raw = process.env.FOUNDRR_TOKEN_ENCRYPTION_KEY;
  if (!raw) throw new Error("FOUNDRR_TOKEN_ENCRYPTION_KEY is not configured.");
  const key = Buffer.from(raw, "base64");
  if (key.length !== 32) {
    throw new Error("FOUNDRR_TOKEN_ENCRYPTION_KEY must be 32 bytes (base64).");
  }
  return key;
}

/** Returns "iv:tag:ciphertext", all base64. */
export function encryptToken(plain: string): string {
  const iv = crypto.randomBytes(12);
  const cipher = crypto.createCipheriv("aes-256-gcm", getKey(), iv);
  const encrypted = Buffer.concat([cipher.update(plain, "utf8"), cipher.final()]);
  const tag = cipher.getAuthTag();
  return [iv.toString("base64"), tag.toString("base64"), encrypted.toString("base64")].join(":");
}

export function decryptToken(payload: string): string {
  const [ivB64, tagB64, dataB64] = payload.split(":");
  if (!ivB64 || !tagB64 || !dataB64) throw new Error("Malformed encrypted token.");
  const decipher = crypto.createDecipheriv("aes-256-gcm", getKey(), Buffer.from(ivB64, "base64"));
  decipher.setAuthTag(Buffer.from(tagB64, "base64"));
  return Buffer.concat([
    decipher.update(Buffer.from(dataB64, "base64")),
    decipher.final(),
  ]).toString("utf8");
}
