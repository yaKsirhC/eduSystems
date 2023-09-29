import crypto from "crypto";
import { s3 } from "../aws";
export function generateRandomHex(length: number) {
  const bytes = Math.ceil(length / 2); // Each byte produces two hexadecimal characters
  return crypto.randomBytes(bytes).toString("hex").slice(0, length);
}

