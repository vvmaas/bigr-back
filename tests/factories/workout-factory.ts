import { Workout } from "@prisma/client";
import { prisma } from "@/config";
import faker from "@faker-js/faker";

export async function createWorkout(userId: number): Promise<Workout> {
  return prisma.workout.create({
    data: {
      userId,
      name: faker.animal.cetacean()
    },
  });
}

export async function getWorkout(id: number): Promise<Workout> {
  return prisma.workout.findUnique({
    where: {
      id
    },
  });
}

export async function stageUpWorkout(id: number, stage: number): Promise<Workout> {
  return prisma.workout.update({
    where: {
      id
    },
    data: {
      stage
    },
  });
}
