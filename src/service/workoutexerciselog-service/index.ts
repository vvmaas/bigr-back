import workoutExerciseLogRepository, { CreateWELogParams } from "@/modules/repositories/workoutexerciselog-repository";
import workoutExerciseRepository from "@/modules/repositories/workoutexercise-repository";
import { invalidDataError, unauthorizedError } from "@/errors";

async function createLog(params: CreateWELogParams, userId: number) {
  const we = await workoutExerciseRepository.find(params.workoutExerciseId);
  if(!we) {
    throw invalidDataError();
  }
  if(we.userId !== userId) {
    throw unauthorizedError();
  }
  await workoutExerciseLogRepository.create(params);
}

const workoutExerciseService = {
  createLog,
};

export default workoutExerciseService;
