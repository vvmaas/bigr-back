import diaryRepository from "@/modules/repositories/diary-repository";
import workoutExerciseRepository from "@/modules/repositories/workoutexercise-repository";
import workoutRepository from "@/modules/repositories/workout-repository";
import userRepository from "@/modules/repositories/user-repository";
import { Diary, Workout } from "@prisma/client";
import { CreateDiaryLogParams } from "@/modules/repositories/diary-repository";
import { invalidDataError } from "@/errors";
import { exclude } from "@/utils/prisma-utils";

async function postDiary(params: CreateDiaryLogParams) {
  await checkUserAndWorkout(params.userId, params.workoutId);
  await checkWorkoutStage(params.workoutId, params.stage);
  const workout = await workoutRepository.find(params.workoutId);

  return await stageUp(workout, params);
}

async function deleteDiary(id: number) {
  const log = await diaryRepository.findLog(id);
  const workout = await workoutRepository.find(log.workoutId);
  await checkUserAndWorkout(log.userId, log.workoutId);
  const checker = checkDiaryStage(workout.stage, log.stage);

  if(checker) {
    return await deleteDiaryLog(log);
  } else {
    return await stageDown(workout, log);
  }
}

async function deleteDiaryLog(log: Diary) {
  await diaryRepository.deleteLog(log.id);
  
  return await workoutExerciseRepository.deleteMany(log.workoutId, log.stage);
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

function checkDiaryStage(workoutStage: number, diaryStage: number) {
  if(workoutStage > diaryStage) {
    return true;
  }
  return false;
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

async function stageDown(workout: Workout, log: Diary) {
  await deleteDiaryLog(log);
  
  return await workoutRepository.update(workout.id, {
    name: workout.name,
    stage: log.stage - 1 
  });
}

const diaryService = {
  postDiary,
  getDiary,
  deleteDiary
};

export default diaryService;
