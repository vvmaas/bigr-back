import workoutService from "@/service/workout-service";
import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import httpStatus from "http-status";

export async function getWorkouts(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const workout = await workoutService.getWorkouts(userId);
    return res.status(httpStatus.OK).send(workout);    
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function getWorkout(req: AuthenticatedRequest, res: Response) {
  const { id } = req.params;
  
  try {
    const workout = await workoutService.getWorkout(Number(id));
    return res.status(httpStatus.OK).send(workout);    
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function postWorkout(req: AuthenticatedRequest, res: Response) {
  try {
    await workoutService.postWorkout({ 
      ...req.body,
      userId: req.userId
    });
    return res.sendStatus(httpStatus.CREATED);    
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function updateWorkout(req: AuthenticatedRequest, res: Response) {
  const { id } = req.params;

  try {
    await workoutService.updateWorkout(Number(id), { 
      ...req.body,
      userId: req.userId
    });
    return res.sendStatus(httpStatus.OK);    
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
