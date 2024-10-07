import { Request, Response, NextFunction } from "express";

// Extend the Request interface to include the user property
declare module "express" {
  interface Request {
    user?: any;
  }
}
import jwt from "jsonwebtoken";

export const authenticateToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Access denied, token missing!" });
  }

  try {
    const JWT_SECRET = process.env.JWT_SECRET || "default_secret"; // Substitua "secret" por uma chave secreta segura
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid token" });
  }
};
