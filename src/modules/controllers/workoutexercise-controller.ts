import workoutExerciseService from "@/service/workoutexercise-service";
import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import httpStatus from "http-status";

export async function createWE(req: AuthenticatedRequest, res: Response) {
  const { exercises, workoutId } = req.body;
  try {
    await workoutExerciseService.postWE(exercises, workoutId, req.userId);
    return res.sendStatus(httpStatus.CREATED);    
  } catch (error) {
    if(error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function deleteWE(req: AuthenticatedRequest, res: Response) {
  const { id } = req.params;

  try {
    await workoutExerciseService.deleteById(Number(id));
    return res.sendStatus(httpStatus.NO_CONTENT);    
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function getWEByWorkout(req: AuthenticatedRequest, res: Response) {
  const { workoutId } = req.params;

  try {
    const workout = await workoutExerciseService.getWEByWorkout(Number(workoutId));
    return res.status(httpStatus.OK).send(workout);    
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
