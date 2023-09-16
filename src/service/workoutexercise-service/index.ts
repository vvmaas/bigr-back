import workoutExerciseRepository, { CreateWEParams } from "@/modules/repositories/workoutexercise-repository";
import workoutRepository from "@/modules/repositories/workout-repository";
import { invalidDataError, unauthorizedError } from "@/errors";
import { Exercise } from "@prisma/client";

async function getWEByWorkout(workoutId: number) {
  const workout = await workoutRepository.find(workoutId);
  if(!workout) {
    throw invalidDataError();
  }
  return await workoutExerciseRepository.findByWorkout(workoutId);
}

async function deleteById(id: number) {
  await workoutExerciseRepository.deleteById(id);
}

async function postWE(exercises: Exercise[], workoutId: number, userId: number) {
  await workoutExerciseRepository.createMany(exercises, workoutId, userId);
}

const workoutExerciseService = {
  postWE,
  getWEByWorkout,
  deleteById
};

export default workoutExerciseService;
