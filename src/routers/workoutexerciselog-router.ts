import { createLog, findLog } from "@/modules/controllers/workoutexerciselog-controller";
import { Router } from "express";
import { authenticateToken } from "@/middlewares";

const logRouter = Router();

logRouter
  .all("/*", authenticateToken)
  .post("/:workoutExerciseId", createLog)
  .get("/:workoutExerciseId", findLog)
  .delete("/", )
;

export { logRouter };
