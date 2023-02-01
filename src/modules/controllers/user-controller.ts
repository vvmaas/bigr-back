import userService from "@/service/user-service";
import { AuthenticatedRequest } from "@/middlewares";
import { Response, Request } from "express";
import httpStatus from "http-status";

export async function createUser(req: Request, res: Response) {
  const { email, password } = req.body;

  try {
    const user = await userService.createUser({ email, password });
    return res.status(httpStatus.CREATED).json({
      id: user.id,
      email: user.email,
    });
  } catch (error) {
    if (error.name === "DuplicatedEmailError") {
      return res.status(httpStatus.CONFLICT).send(error);
    }
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

export async function updateUser(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const update = await userService.updateUser({ ...req.body }, Number(userId));
    return res.status(httpStatus.OK).send({
      id: update.id,
      name: update.name,
      weight: update.weight,
      height: update.height,
    });
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}

export async function findUser(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  
  try {
    const user = await userService.findUser(userId);
    return res.status(httpStatus.OK).send(user);
  } catch (error) {
    return res.status(httpStatus.BAD_REQUEST).send(error);
  }
}
