import workoutExerciseService from "@/service/workoutexercise-service";
import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import httpStatus from "http-status";

export async function createWE(req: AuthenticatedRequest, res: Response) {
  try {
    const workout = await workoutExerciseService.postWE({ ...req.body }, req.userId);
    return res.status(httpStatus.CREATED).send(workout);    
  } catch (error) {
    if(error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
