import { sign, verify } from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../config";

type TokenData = {
  email: string;
  id: number;
};

export const createJwtToken = ({ email, id }: TokenData) => {
  return sign({ email, id }, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
};

export const verifyJwtToken = (token: string) => {
  return verify(token, JWT_SECRET) as TokenData;
};
