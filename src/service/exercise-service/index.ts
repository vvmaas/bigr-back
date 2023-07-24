import exerciseRepository from "@/modules/repositories/exercise-repository";
import { Exercise } from "@prisma/client";

import { notFoundError } from "@/errors";

async function getExercises(): Promise<Exercise[]> {
  const exercises = await exerciseRepository.findAll();
  if(!exercises) {
    throw notFoundError();
  }
  return exercises;
}

async function getExercise(id: number): Promise<Exercise> {
  const exercise = await exerciseRepository.find(id);
  if(!exercise) {
    throw notFoundError();
  }
  return exercise;
}

async function getExerciseByKeyword(keyword: string): Promise<Exercise[]> {
  const exercise = await exerciseRepository.findByKeyword(keyword);
  if(!exercise) {
    throw notFoundError();
  }
  return exercise;
}

const exerciseService = {
  getExercises,
  getExercise,
  getExerciseByKeyword
};

export default exerciseService;
