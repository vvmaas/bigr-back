import { getExercises, getExercise, getExerciseByKeyword } from "@/modules/controllers/exercise-controller";
import { Router } from "express";
import { authenticateToken } from "@/middlewares";

const exerciseRouter = Router();

exerciseRouter
  .all("/*", authenticateToken)
  .get("/", getExercises)
  .get("/:id", getExercise)
  .get("/keyword/:keyword", getExerciseByKeyword)
;

export { exerciseRouter };
