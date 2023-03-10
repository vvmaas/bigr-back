import { updateUser, createUser, findUser } from "@/modules/controllers/user-controller";
import { Router } from "express";
import { authenticateToken } from "@/middlewares";

const userRouter = Router();

userRouter
  .post("/", createUser)
  .all("/*", authenticateToken)
  .get("/", findUser)
  .put("/", updateUser)
;

export { userRouter };
