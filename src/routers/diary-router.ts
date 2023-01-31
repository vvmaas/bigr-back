import { getDiary, createDiaryLog } from "@/modules/controllers";
import { Router } from "express";
import { authenticateToken } from "@/middlewares";

const diaryRouter = Router();

diaryRouter
  .all("/*", authenticateToken)
  .get("/", getDiary)
  .post("/", createDiaryLog)
;

export { diaryRouter };
