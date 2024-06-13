import { Router } from "express";
import {
  addLaptop,
  getLaptop,
  getLaptops,
  updateLaptop,
  deleteLaptop,
  getLaptopsByEmployee,
} from "../controllers/laptop.controller";

const laptopRouter = Router();

laptopRouter.get("/", getLaptops);
laptopRouter.get("/:id", getLaptop);
laptopRouter.post("/", addLaptop);
laptopRouter.put("/:id", updateLaptop);
laptopRouter.delete("/:id", deleteLaptop);
laptopRouter.get("/employee/:id", getLaptopsByEmployee);

export default laptopRouter;
