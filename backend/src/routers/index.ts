import { Router } from "express";
import userRouter from "./user.router";
import employeeRouter from "./employee.router";
import laptopRouter from "./laptop.router";
import authMiddleware from "../middlewares/auth.middleware";

const api = Router();

api.use(
  "/users",
  userRouter
  /*
#swagger.tags = ['Users']
*/
);
api.use(
  "/employees",
  authMiddleware,
  employeeRouter
  /*
#swagger.tags = ['Employees']
*/
);
api.use(
  "/laptops",
  authMiddleware,
  laptopRouter
  /*
#swagger.tags = ['Laptops']
*/
);

export default api;
