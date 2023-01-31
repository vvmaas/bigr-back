import { createWE } from "@/modules/controllers";
import { Router } from "express";
import { authenticateToken } from "@/middlewares";

const diaryRouter = Router();

diaryRouter
  .all("/*", authenticateToken)
  .post("/", createWE)
;

export { diaryRouter };
