import { Request, Response } from "express";
import { validateRegister, validateLogin } from "../util/validation";
import jwt from "jsonwebtoken";
import prisma from "../prisma/config";
import bcrypt from "bcrypt";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const { error } = validateLogin({ email, password });
    if (error) return res.status(400).json({ error: error.details[0].message });

    console.log(email, password);
  } catch (error) {
    return res.status(500).json({ error: "Error", stackTrace: error });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { fullname, email, phone, password } = req.body;

    const { error } = validateRegister({ fullname, email, phone, password });
    if (error) return res.status(400).json({ error: error.details[0].message });

    let hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: {
        fullname,
        email,
        phonenumber: phone,
        password: hashedPassword,
      },
    });

    let token = jwt.sign({ email }, process.env.JWT_KEY!.trim());
    return res.status(201).json({ token });
    
  } catch (error) {
    return res.status(500).json({ error: "Error", stackTrace: error });
  }
};

export const me = async (req: Request, res: Response) => {
  return res.status(200).json({ user: (req as any).user });
};
