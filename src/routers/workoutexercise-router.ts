import { createWE, getWEByWorkout } from "@/modules/controllers/workoutexercise-controller";
import { Router } from "express";
import { authenticateToken } from "@/middlewares";

const weRouter = Router();

weRouter
  .all("/*", authenticateToken)
  .post("/", createWE)
  .get("/from/:workoutId", getWEByWorkout)
  .get("/:id", )
  .delete("/", )
;

export { weRouter };
