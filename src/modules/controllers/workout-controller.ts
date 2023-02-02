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
  const { userId } = req;
  
  try {
    const workout = await workoutService.getWorkout(Number(id), userId);
    return res.status(httpStatus.OK).send(workout);    
  } catch (error) {
    if(error.name === "notFoundError") {
      return res.sendStatus(httpStatus.NOT_FOUND);
    }
    if(error.name === "UnauthorizedError") {
      return res.sendStatus(httpStatus.UNAUTHORIZED);
    }
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function postWorkout(req: AuthenticatedRequest, res: Response) {
  try {
    const workout = await workoutService.postWorkout({ 
      ...req.body,
      userId: req.userId
    });
    
    return res.sendStatus(httpStatus.CREATED).send(workout);    
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
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
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function deleteWorkout(req: AuthenticatedRequest, res: Response) {
  const { id } = req.params;

  try {
    await workoutService.deleteWorkout(Number(id));
    return res.sendStatus(httpStatus.OK);    
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
