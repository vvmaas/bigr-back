import workoutExerciseLogService from "@/service/workoutexerciselog-service";
import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import httpStatus from "http-status";

export async function createLog(req: AuthenticatedRequest, res: Response) {
  const workoutExerciseId = req.params.id;

  try {
    const workout = await workoutExerciseLogService.createLog({ ...req.body }, req.userId);
    return res.status(httpStatus.CREATED).send(workout);    
  } catch (error) {
    if(error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
