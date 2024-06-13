import { NextFunction, Response } from "express";
import jwt from "jsonwebtoken";
import { Request } from "express";
import prisma from "../prisma/config";

const { verify } = jwt;

export default async function (
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (!req.header("Authorization"))
    return res
      .status(401)
      .json({ error: "Access denied", message: "Invalid Token" });

  const token: string | undefined = req
    .header("Authorization")
    ?.trim()
    ?.replace("Bearer ", "");

  if (!token)
    return res
      .status(401)
      .json({ error: "Access denied", message: "Invalid Token" });
  try {
    let key: string = process.env.JWT_KEY!.trim();
    const decoded = verify(token, key) as any;

    if (!decoded)
      return res
        .status(401)
        .json({ error: "Access denied", message: "Invalid Token" });

    const user = await prisma.user.findUnique({
      where: { email: decoded.email },
    });

    if (!user)
      return res
        .status(401)
        .json({ error: "Access denied", message: "Invalid Token" });

    (req as any).user = user;
    delete (req as any).user.password;
    next();
  } catch (ex) {
    return res
      .status(400)
      .json({ error: "Access denied", message: "Invalid Token" });
  }
}
