import workoutExerciseRepository from "@/modules/repositories/workoutexercise-repository";
import workoutRepository from "@/modules/repositories/workout-repository";
import exerciseRepository from "@/modules/repositories/exercise-repository";
import { CreateWEParams } from "@/modules/repositories/workoutexercise-repository";
import { invalidDataError, unauthorizedError } from "@/errors";

async function postWE(params: CreateWEParams, userId: number) {
  const workout = await workoutRepository.find(params.workoutId);
  const exercise = await exerciseRepository.find(params.exerciseId);
  if(!workout || !exercise) {
    throw invalidDataError();
  }
  if(workout.userId !== userId) {
    throw unauthorizedError();
  }
  await workoutExerciseRepository.create(params);
}

const workoutExerciseService = {
  postWE,
};

export default workoutExerciseService;
