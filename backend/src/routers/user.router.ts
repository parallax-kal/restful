import { Router } from "express";
import { login, me } from "../controllers/user.controller";
import authMiddleware from "../middlewares/auth.middleware";

const userRouter = Router();

userRouter.post("/login", login);
userRouter.get("/me", authMiddleware, me)

export default userRouter;