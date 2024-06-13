import type { Request, Response } from "express";
import { validateEmployeeAdd } from "../util/validation";
import prisma from "../prisma/config";

export const addEmployee = async (req: Request, res: Response) => {
  try {
    const { fullname, email, phone, nationalId } = req.body;
    const { error } = validateEmployeeAdd({
      fullname,
      email,
      phone,
      nationalId,
    });
    if (error) return res.status(400).json({ error: error.details[0].message });

    await prisma.employee.create({
      data: {
        fullname,
        phonenumber: phone,
        email,
        nationalId,
        userId: (req as any).user.id,
      },
    });

    return res.status(201).json({ message: "Employee added successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Error", stackTrace: error });
  }
};

export const getEmployees = async (req: Request, res: Response) => {
  try {
    const { page, limit } = req.query;
    let employees = await prisma.employee.findMany({
      skip: (parseInt(page as string) - 1) * parseInt(limit as string),
      take: parseInt(limit as string),
      select: {
        id: true,
        fullname: true,
        email: true,
        phonenumber: true,
        nationalId: true,
        userId: true,
      },
    });
    let total = await prisma.employee.count();
    return res.status(200).json({ page, limit, data: employees, total });
  } catch (error) {
    return res.status(500).json({ error: "Error", stackTrace: error });
  }
};

export const getEmployee = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    let employee = await prisma.employee.findUnique({
      where: { id: parseInt(id) },
      select: {
        id: true,
        fullname: true,
        email: true,
        phonenumber: true,
        nationalId: true,
        userId: true,
      },
    });
    return res.status(200).json(employee);
  } catch (error) {
    return res.status(500).json({ error: "Error", stackTrace: error });
  }
};

export const updateEmployee = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { fullname, email, phone, nationalId } = req.body;
    const { error } = validateEmployeeAdd({
      fullname,
      email,
      phone,
      nationalId,
    });
    if (error) return res.status(400).json({ error: error.details[0].message });

    await prisma.employee.update({
      where: { id: parseInt(id) },
      data: {
        fullname,
        phonenumber: phone,
        email,
        nationalId,
      },
    });

    return res.status(200).json({ message: "Employee updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Error", stackTrace: error });
  }
};

export const deleteEmployee = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.employee.delete({ where: { id: parseInt(id) } });
    return res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Error", stackTrace: error });
  }
};
