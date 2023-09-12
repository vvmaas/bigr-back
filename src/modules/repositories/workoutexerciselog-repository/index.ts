import { prisma } from "@/config";
import { WorkoutExerciseLog } from "@prisma/client";

async function create(workoutExercise: CreateWELogParams) {
  return prisma.workoutExerciseLog.create({
    data: {
      ...workoutExercise
    },
  });
}

export type CreateWELogParams = Omit<WorkoutExerciseLog, "id" | "createdAt" | "updatedAt">

const workoutExerciseLogRepository = {
  create,
};
    
export default workoutExerciseLogRepository;
