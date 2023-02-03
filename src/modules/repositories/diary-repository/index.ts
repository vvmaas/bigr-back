import { prisma } from "@/config";
import { Diary, WorkoutExercise } from "@prisma/client";

async function create(diary: CreateDiaryParams) {
  return prisma.diary.create({
    data: {
      ...diary
    },
  });
}

async function find(userId: number) {
  return prisma.diary.findMany({
    where: {
      userId
    },
  });
}

async function findLog(id: number) {
  return prisma.diary.findUnique({
    where: {
      id
    },
  });
}

async function deleteLog(id: number) {
  return prisma.diary.delete({
    where: {
      id
    },
  });
}

export type CreateDiaryParams = Omit<Diary, "id" | "createdAt" | "updatedAt">
  
export type CreateDiaryLogParams = Omit<Diary, "id" | "createdAt" | "updatedAt"> & {
  workoutExercises: WorkoutExercise[];
};

const diaryRepository = {
  create,
  find,
  findLog,
  deleteLog
};
  
export default diaryRepository;
