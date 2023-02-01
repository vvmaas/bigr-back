import { Exercise } from "@prisma/client";
import { prisma } from "@/config";
import faker from "@faker-js/faker";

export async function createExercise(): Promise<Exercise> {
  return prisma.exercise.create({
    data: {
      name: faker.animal.dog()
    },
  });
}
