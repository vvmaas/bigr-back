import workoutExerciseRepository from "@/modules/repositories/workoutexercise-repository";
import workoutRepository from "@/modules/repositories/workout-repository";
import exerciseRepository from "@/modules/repositories/exercise-repository";
import { CreateWEParams } from "@/modules/repositories/workoutexercise-repository";
import { invalidDataError } from "@/errors";

async function postWE(params: CreateWEParams) {
  const workout = await workoutRepository.find(params.workoutId);
  const exercise = await exerciseRepository.find(params.exerciseId);
  if(!workout || !exercise) {
    throw invalidDataError();
  }
  await workoutExerciseRepository.create(params);
}

const workoutExerciseService = {
  postWE,
};

export default workoutExerciseService;
