import { prisma } from "@/config";
import { Exercise, WorkoutExercise } from "@prisma/client";

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

async function deleteById(id: number) {
  return prisma.workoutExercise.update({
    where: {
      id,
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
      deleted: false
    },
    include: {
      Exercise: true,
    }
  });
}

async function createMany(exercises: Exercise[], workoutId: number, userId: number) {
  return exercises.map(async exercise => {
    await create(
      {
        userId: userId,
        exerciseId: exercise.id,
        workoutId: Number(workoutId),
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
  deleteMany,
  deleteById
};
  
export default workoutExerciseRepository;
