import { Request, Response } from "express";
import { validateLaptopAdd } from "../util/validation";
import prisma from "../prisma/config";

export const addLaptop = async (req: Request, res: Response) => {
  try {
    const { name, brand, price, model, employeeId } = req.body;

    const { error } = validateLaptopAdd({ name, brand, price, model });

    if (error) return res.status(400).json({ error: error.details[0].message });

    await prisma.laptop.create({
      data: {
        name,
        brand,
        price,
        employeeId: parseInt(employeeId),
        model,
      },
    });

    return res.status(201).json({ message: "Laptop added successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Error", stackTrace: error });
  }
};

export const getLaptops = async (req: Request, res: Response) => {
  try {
    const { page, limit } = req.query;
    let laptops = await prisma.laptop.findMany({
      skip: (parseInt(page as string) - 1) * parseInt(limit as string),
      take: parseInt(limit as string),
      select: {
        id: true,
        name: true,
        brand: true,
        price: true,
        model: true,
        employeeId: true,
      },
    });
    let total = await prisma.laptop.count();
    return res
      .status(200)
      .json({ page: Number(page), limit: Number(limit), laptops, total });
  } catch (error) {
    return res.status(500).json({ error: "Error", stackTrace: error });
  }
};

export const getLaptop = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    let laptop = await prisma.laptop.findUnique({
      where: { id: parseInt(id) },
      select: {
        id: true,
        name: true,
        brand: true,
        price: true,
        model: true,
        employeeId: true,
      },
    });
    return res.status(200).json(laptop);
  } catch (error) {
    return res.status(500).json({ error: "Error", stackTrace: error });
  }
};

export const updateLaptop = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { name, brand, price, model, employeeId } = req.body;

    const { error } = validateLaptopAdd({ name, brand, price, model });

    if (error) return res.status(400).json({ error: error.details[0].message });

    await prisma.laptop.update({
      where: { id: parseInt(id) },
      data: {
        name,
        brand,
        price,
        model,
        employeeId: parseInt(employeeId),
      },
    });

    return res.status(200).json({ message: "Laptop updated successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Error", stackTrace: error });
  }
};

export const deleteLaptop = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.laptop.delete({ where: { id: parseInt(id) } });
    return res.status(200).json({ message: "Laptop deleted successfully" });
  } catch (error) {
    return res.status(500).json({ error: "Error", stackTrace: error });
  }
};

export const getLaptopsByEmployee = async (req: Request, res: Response) => {
  try {
    const { employeeId } = req.params;
    let laptops = await prisma.laptop.findMany({
      where: { employeeId: parseInt(employeeId) },
      select: {
        id: true,
        name: true,
        brand: true,
        price: true,
        model: true,
        employeeId: true,
      },
    });
    return res.status(200).json(laptops);
  } catch (error) {
    return res.status(500).json({ error: "Error", stackTrace: error });
  }
};
