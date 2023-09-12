import workoutExerciseRepository, { CreateWEParams } from "@/modules/repositories/workoutexercise-repository";
import workoutRepository from "@/modules/repositories/workout-repository";
import exerciseRepository from "@/modules/repositories/exercise-repository";
import { invalidDataError, unauthorizedError } from "@/errors";

async function getWEByWorkout(workoutId: number) {
  const workout = await workoutRepository.find(workoutId);
  if(!workout) {
    throw invalidDataError();
  }
  await workoutExerciseRepository.findByWorkout(workoutId);
}

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
  getWEByWorkout
};

export default workoutExerciseService;
