import workoutExerciseService from "@/service/workoutexercise-service";
import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import httpStatus from "http-status";

export async function createWE(req: AuthenticatedRequest, res: Response) {
  try {
    const workout = await workoutExerciseService.postWE({ ...req.body });
    return res.status(httpStatus.OK).send(workout);    
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
