import diaryService from "@/service/diary-service";
import { AuthenticatedRequest } from "@/middlewares";
import { Response } from "express";
import httpStatus from "http-status";

export async function createDiaryLog(req: AuthenticatedRequest, res: Response) {
  try {
    const diary = await diaryService.postDiary({ ...req.body });
    return res.sendStatus(httpStatus.CREATED).send(diary);    
  } catch (error) {
    return res.sendStatus(httpStatus.BAD_REQUEST);
  }
}

export async function getDiary(req: AuthenticatedRequest, res: Response) {
  const { userId } = req;
  try {
    const diary = await diaryService.getDiary(userId);
    return res.status(httpStatus.OK).send(diary);    
  } catch (error) {
    return res.sendStatus(httpStatus.NOT_FOUND);
  }
}
