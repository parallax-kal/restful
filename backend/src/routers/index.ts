import { Router } from "express";
import userRouter from "./user.router";

const api = Router();

api.use("/users", userRouter);

export default api;