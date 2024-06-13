import { Router } from "express";
import userRouter from "./user.router";
import employeeRouter from "./employee.router";
import laptopRouter from "./laptop.router";

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
  employeeRouter
  /*
#swagger.tags = ['Employees']
*/
);
api.use(
  "/laptops",
  laptopRouter
  /*
#swagger.tags = ['Laptops']
*/
);

export default api;
