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

employeeRouter.get("/", getEmployees);
employeeRouter.get("/:id", getEmployee);
employeeRouter.post("/", addEmployee);
employeeRouter.put("/:id", updateEmployee);
employeeRouter.delete("/:id", deleteEmployee);

export default employeeRouter;
