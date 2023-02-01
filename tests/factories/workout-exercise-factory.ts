import { Workout, WorkoutExercise } from "@prisma/client";
import { prisma } from "@/config";
import faker from "@faker-js/faker";

export async function createWorkoutExercise(exerciseId: number, workout: Workout): Promise<WorkoutExercise> {
  return prisma.workoutExercise.create({
    data: {
      exerciseId,
      workoutId: workout.id,
      stage: workout.stage === 0 ? 0 : workout.stage + 1,
      weight: faker.datatype.number(),
      repetitions: faker.datatype.number(),
      sets: faker.datatype.number()
    },
  });
}
