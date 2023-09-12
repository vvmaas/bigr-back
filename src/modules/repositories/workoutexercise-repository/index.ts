import { prisma } from "@/config";
import { WorkoutExercise } from "@prisma/client";

async function create(workoutExercise: CreateWEParams) {
  return prisma.workoutExercise.create({
    data: {
      ...workoutExercise
    },
  });
}

async function deleteMany(workoutId: number) {
  return prisma.workoutExercise.updateMany({
    where: {
      workoutId,
    },
    data: {
      deleted: true
    }
  });
}

async function find(id: number) {
  return prisma.workoutExercise.findUnique({
    where: {
      id,
    }
  });
}

async function findByWorkout(workoutId: number) {
  return prisma.workoutExercise.findMany({
    where: {
      workoutId,
    }
  });
}

async function createMany(exercises: WorkoutExercise[]) {
  return exercises.map(async exercise => {
    await create(
      {
        userId: exercise.userId,
        exerciseId: exercise.exerciseId,
        workoutId: exercise.workoutId,
        deleted: false
      }
    );
  });
}
  
export type CreateWEParams = Omit<WorkoutExercise, "id" | "createdAt" | "updatedAt">

const workoutExerciseRepository = {
  create,
  find,
  findByWorkout,
  createMany,
  deleteMany
};
  
export default workoutExerciseRepository;
