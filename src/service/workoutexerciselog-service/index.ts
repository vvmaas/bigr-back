import workoutExerciseLogRepository, { CreateWELogParams } from "@/modules/repositories/workoutexerciselog-repository";
import workoutExerciseRepository from "@/modules/repositories/workoutexercise-repository";
import { invalidDataError, unauthorizedError } from "@/errors";

async function createLog(params: CreateWELogParams, userId: number) {
  console.log(params);
    
  const we = await workoutExerciseRepository.find(params.workoutExerciseId);
  if(!we) {
    throw invalidDataError();
  }
  if(we.userId !== userId) {
    throw unauthorizedError();
  }
  return await workoutExerciseLogRepository.create(params);
}

async function findLog(workoutExerciseId: number, userId: number) {
  const we = await workoutExerciseRepository.find(workoutExerciseId);
  if(!we) {
    throw invalidDataError();
  }
  if(we.userId !== userId) {
    throw unauthorizedError();
  }
  return await workoutExerciseLogRepository.findByWE(workoutExerciseId);
}

const workoutExerciseService = {
  createLog,
  findLog
};

export default workoutExerciseService;
