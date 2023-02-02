import { getWorkout, getWorkouts, updateWorkout, postWorkout, deleteWorkout } from "@/modules/controllers";
import { Router } from "express";
import { authenticateToken } from "@/middlewares";

const workoutRouter = Router();

workoutRouter
  .all("/*", authenticateToken)
  .get("/", getWorkouts)
  .get("/:id", getWorkout)
  .post("/", postWorkout)
  .put("/:id", updateWorkout) 
  .delete("/:id", deleteWorkout) 
;

export { workoutRouter };
