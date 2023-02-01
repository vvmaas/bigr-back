import { createWE } from "@/modules/controllers";
import { Router } from "express";
import { authenticateToken } from "@/middlewares";

const weRouter = Router();

weRouter
  .all("/*", authenticateToken)
  .post("/", createWE)
;

export { weRouter };
