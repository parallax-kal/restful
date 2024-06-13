import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { Request } from "express";

const { verify } = jwt;

export default function (req: Request, res: Response, next: NextFunction) {
  if (!req.header("Authorization"))
    return res.status(401).json({ error: "Access denied", message: "Invalid Token" });

  const token: string | undefined = req
    .header("Authorization")
    ?.trim()
    ?.replace("Bearer ", "");

  if (!token)
    return res.status(401).json({ error: "Access denied", message: "Invalid Token" });
  try {
    let key: string = process.env.JWT_KEY!.trim();
    const decoded = verify(token, key) as any;
    (req as any).user = { ...decoded };

    next();
  } catch (ex) {
    return res.status(400).json({ error: "Access denied", message: "Invalid Token" });
  }
}