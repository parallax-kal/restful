import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
import {
  addEmployee,
  getEmployee,
  getEmployees,
  updateEmployee,
  deleteEmployee,
} from "../controllers/employee.controller";

const employeeRouter = Router();

employeeRouter.get("/", authMiddleware, getEmployees);
employeeRouter.get("/:id", authMiddleware, getEmployee);
employeeRouter.post("/", authMiddleware, addEmployee);
employeeRouter.put("/:id", authMiddleware, updateEmployee);
employeeRouter.delete("/:id", authMiddleware, deleteEmployee);

export default employeeRouter;
