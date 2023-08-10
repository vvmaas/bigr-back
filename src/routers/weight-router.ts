import * as weightController from "@/modules/controllers/weight-controller";
import { Router } from "express";
import { authenticateToken } from "@/middlewares";

const weightRouter = Router();

weightRouter
  .all("/*", authenticateToken)
  .post("/", weightController.postWeight)
  .get("/", weightController.getWeight)
  .get("/all", weightController.getWeights)
  .get("/lower", weightController.getLowerWeight)
  .get("/higher", weightController.getHigherWeight)
  .get("/:id", weightController.getWeightById)
  .put("/:id", weightController.editWeight)
  .delete("/:id", weightController.deleteWeight)
;

export { weightRouter };
