import * as weightController from "@/modules/controllers/weight-controller";
import { Router } from "express";
import { authenticateToken } from "@/middlewares";

const weightRouter = Router();

weightRouter
  .all("/*", authenticateToken)
  .post("/", weightController.postWeight)
  .get("/", weightController.getWeights)
  .put("/:id", weightController.editWeight)
  .delete("/:id", weightController.deleteWeight)
;

export { weightRouter };
