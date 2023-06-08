import { createHmac } from "crypto";
export const hash = (password: string) => {
  //hash password
  return createHmac("sha256", password).digest("hex");
};
