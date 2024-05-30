import { serverEnv } from "@/utils/env/server";
import { createCipheriv, createDecipheriv, pbkdf2Sync } from "crypto";

const derivedKey = pbkdf2Sync(serverEnv.SECRET, "salt", 1000, 32, "sha256");

export const encrypt = (value: any): string | null => {
  try {
    const text = typeof value === "object" ? JSON.stringify(value) : value;
    const cipher = createCipheriv("aes-256-ecb", derivedKey, null);
    let encrypted = cipher.update(text, "utf8", "base64");
    encrypted += cipher.final("base64");
    return encrypted;
  } catch (error) {
    return null;
  }
};

export const decrypt = <T = string>(encryptedText: string): T | null => {
  if (typeof encryptedText !== "string") return null;
  try {
    const decipher = createDecipheriv("aes-256-ecb", derivedKey, null);
    let decrypted = decipher.update(encryptedText, "base64", "utf8");
    decrypted += decipher.final("utf8");
    try {
      return JSON.parse(decrypted) as T;
    } catch (error) {
      return decrypted as any;
    }
  } catch (error) {
    return null;
  }
};
