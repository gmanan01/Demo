import type { Request, Response, NextFunction } from "express";
import { verifyJwtToken } from "../utils/token";

export default function authMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ message: "Not authenticated" });
  }
  try {
    const user = verifyJwtToken(token);
    res.locals.user = user;
  } catch (e) {
    return res.status(401).json({ message: "Invalid Token" });
  }
  next();
}
