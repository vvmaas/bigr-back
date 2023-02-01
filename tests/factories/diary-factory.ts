import { Diary, Workout } from "@prisma/client";
import { prisma } from "@/config";
import faker from "@faker-js/faker";

export async function createDiary(userId: number, workout: Workout): Promise<Diary> {
  return prisma.diary.create({
    data: {
      userId,
      workoutId: workout.id,
      stage: workout.stage + 1,
      Date: faker.datatype.datetime()
    },
  });
}
