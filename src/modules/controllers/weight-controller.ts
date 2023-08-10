import weightService from "@/service/weight-service";
import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import httpStatus from "http-status";

export async function getWeight(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const weight = await weightService.getWeight(userId);
    return res.status(httpStatus.OK).send(weight); 
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function getLowerWeight(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const weight = await weightService.getHigherOrLower(userId, false);
    return res.status(httpStatus.OK).send(weight); 
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function getHigherWeight(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const weight = await weightService.getHigherOrLower(userId, true);
    return res.status(httpStatus.OK).send(weight); 
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function getWeights(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;

  try {
    const weights = await weightService.getWeights(userId);
    return res.status(httpStatus.OK).send(weights); 
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function getWeightById(req: AuthenticatedRequest, res: Response) {
  const { id } = req.params;

  try {
    const weight = await weightService.getWeightById(Number(id));
    return res.status(httpStatus.OK).send(weight); 
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}

export async function postWeight(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  const data = { ...req.body, userId };

  try {
    const weight = await weightService.postWeight(data);
    return res.status(httpStatus.CREATED).send(weight); 
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function editWeight(req: AuthenticatedRequest, res: Response) {
  const { id } = req.params;
  const data = { ...req.body };

  try {
    const weight = await weightService.editWeight(data, Number(id));
    return res.status(httpStatus.CREATED).send(weight); 
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function deleteWeight(req: AuthenticatedRequest, res: Response) {
  const { id } = req.params;

  try {
    await weightService.deleteWeight(Number(id));
    return res.sendStatus(httpStatus.NO_CONTENT); 
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}
