import { randomBytes } from "crypto";

export const generateId = (length = 7) => {
  return randomBytes(length).toString('base64url').slice(0, length);
};
