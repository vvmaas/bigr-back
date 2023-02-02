import diaryRepository from "@/modules/repositories/diary-repository";
import workoutExerciseRepository from "@/modules/repositories/workoutexercise-repository";
import workoutRepository from "@/modules/repositories/workout-repository";
import userRepository from "@/modules/repositories/user-repository";
import { Workout } from "@prisma/client";
import { CreateDiaryLogParams } from "@/modules/repositories/diary-repository";
import { invalidDataError } from "@/errors";
import { exclude } from "@/utils/prisma-utils";

async function postDiary(params: CreateDiaryLogParams) {
  await checkUserAndWorkout(params.userId, params.workoutId);
  await checkWorkoutStage(params.workoutId, params.stage);
  const workout = await workoutRepository.find(params.workoutId);

  return await stageUp(workout, params);
}

async function getDiary(userId: number) {
  const diary = await diaryRepository.find(userId);
  return diary;
}

async function checkUserAndWorkout(userId: number, workoutId: number) {
  const user = await userRepository.findById(userId);
  const workout = await workoutRepository.find(workoutId);
  if(!user || !workout) {
    throw invalidDataError;
  }
}

async function checkWorkoutStage(workoutId: number, stage: number) {
  const workout = await workoutRepository.find(workoutId);

  if(workout.stage+1 !== stage) {
    throw invalidDataError;
  }
}

async function stageUp(workout: Workout, params: CreateDiaryLogParams) {
  await workoutRepository.update(workout.id, {
    name: workout.name,
    stage: params.stage 
  });
  await workoutExerciseRepository.createMany(params.workoutExercises);
  return await diaryRepository.create(exclude(params, "workoutExercises"));
}

const diaryService = {
  postDiary,
  getDiary
};

export default diaryService;
