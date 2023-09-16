import { prisma } from "@/config";
import { WorkoutExerciseLog } from "@prisma/client";

async function create(workoutExercise: CreateWELogParams) {
  return prisma.workoutExerciseLog.create({
    data: {
      ...workoutExercise
    },
  });
}

async function findByWE(workoutExerciseId: number) {
  return prisma.workoutExerciseLog.findFirst({
    where: {
      workoutExerciseId
    },
    orderBy: {
      createdAt: "desc"
    }
  });
}

export type CreateWELogParams = Omit<WorkoutExerciseLog, "id" | "createdAt" | "updatedAt">

const workoutExerciseLogRepository = {
  create,
  findByWE
};
    
export default workoutExerciseLogRepository;
