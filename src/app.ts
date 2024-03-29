import "reflect-metadata";
import "express-async-errors";
import express, { Express } from "express";
import cors from "cors";
import {
  userRouter,
  authenticationRouter,
  workoutRouter,
  weRouter,
  logRouter,
  exerciseRouter,
  weightRouter
} from "@/routers";

import { loadEnv, connectDb, disconnectDB } from "@/config";

loadEnv();

const app = express();
app
  .use(cors())
  .use(express.json())
  .get("/health", (_req, res) => res.send("OK!"))
  .use("/users", userRouter)
  .use("/weight", weightRouter)
  .use("/auth", authenticationRouter)
  .use("/workout", workoutRouter)
  .use("/workoutexercise", weRouter)
  .use("/workoutexercise/log", logRouter)
  .use("/exercise", exerciseRouter)
;
  
export function init(): Promise<Express> {
  connectDb();
  return Promise.resolve(app);
}

export async function close(): Promise<void> {
  await disconnectDB();
}

export default app;
