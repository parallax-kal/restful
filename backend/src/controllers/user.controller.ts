import { Request, Response } from "express";
import { validateUserRegister, validateUserLogin } from "../util/validation";
import jwt from "jsonwebtoken";
import prisma from "../prisma/config";
import bcrypt from "bcrypt";

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const { error } = validateUserLogin({ email, password });
    if (error) return res.status(400).json({ error: error.details[0].message });

    let user = await prisma.user.findUnique({ where: { email } });

    if (!user)
      return res.status(401).json({
        error: "Invalid credentials",
      });

    let passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch)
      return res.status(401).json({
        error: "Invalid credentials",
      });

    let token = jwt.sign({ email }, process.env.JWT_KEY!.trim());

    return res.status(200).json({ token });
  } catch (error) {
    return res.status(500).json({ error: "Error", stackTrace: error });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const { fullname, email, phone, password } = req.body;

    const { error } = validateUserRegister({
      fullname,
      email,
      phone,
      password,
    });
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

export const getTotals = async (req: Request, res: Response) => {
  try {
    const totalEmployees = await prisma.employee.count();
    const totalLaptops = await prisma.laptop.count();
    const totalUsers = await prisma.user.count();
    return res.status(200).json({ totalEmployees, totalLaptops, totalUsers });
  } catch (error) {
    return res.status(500).json({
      error: "Error",
      stackTrace: error,
    });
  }
};
