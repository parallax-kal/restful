import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
import {
  addLaptop,
  getLaptop,
  getLaptops,
  updateLaptop,
  deleteLaptop,
  getLaptopsByEmployee,
} from "../controllers/laptop.controller";

const laptopRouter = Router();

laptopRouter.get("/", authMiddleware, getLaptops);
laptopRouter.get("/:id", authMiddleware, getLaptop);
laptopRouter.post("/", authMiddleware, addLaptop);
laptopRouter.put("/:id", authMiddleware, updateLaptop);
laptopRouter.delete("/:id", authMiddleware, deleteLaptop);
laptopRouter.get("/employee/:id", authMiddleware, getLaptopsByEmployee);

export default laptopRouter;
