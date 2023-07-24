import exerciseService from "@/service/exercise-service";
import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import httpStatus from "http-status";

export async function getExercises(req: AuthenticatedRequest, res: Response) {
  try {
    const exercises = await exerciseService.getExercises();
    
    return res.status(httpStatus.OK).send(exercises); 
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function getExercise(req: AuthenticatedRequest, res: Response) {
  const { id } = req.params;
  try {
    const exercise = await exerciseService.getExercise(Number(id));
    
    return res.status(httpStatus.OK).send(exercise); 
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function getExerciseByKeyword(req: AuthenticatedRequest, res: Response) {
  const { keyword } = req.params;
  try {
    const exercise = await exerciseService.getExerciseByKeyword(keyword);
    
    return res.status(httpStatus.OK).send(exercise); 
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
