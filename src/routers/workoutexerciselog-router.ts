import { createLog } from "@/modules/controllers/workoutexerciselog-controller";
import { Router } from "express";
import { authenticateToken } from "@/middlewares";

const logRouter = Router();

logRouter
  .all("/*", authenticateToken)
  .post("/:id", createLog)
  .get("/", )
  .delete("/", )
;

export { logRouter };
