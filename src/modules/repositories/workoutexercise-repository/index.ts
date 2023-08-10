import { prisma } from "@/config";
import { WorkoutExercise } from "@prisma/client";

async function create(workoutExercise: CreateWEParams) {
  return prisma.workoutExercise.create({
    data: {
      ...workoutExercise
    },
  });
}

//turn into deleted: true
async function deleteMany(workoutId: number) {
  return prisma.workoutExercise.deleteMany({
    where: {
      workoutId,
    },
  });
}

async function findByStage(workoutId: number) {
  return prisma.workoutExercise.findMany({
    where: {
      workoutId,
      lastOne: true
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
        sets: exercise.sets,
        repetitions: exercise.repetitions,
        weight: exercise.weight,
        lastOne: true,
        deleted: false
      }
    );
  });
}
  
export type CreateWEParams = Omit<WorkoutExercise, "id" | "createdAt" | "updatedAt">

const workoutExerciseRepository = {
  create,
  findByStage,
  createMany,
  deleteMany
};
  
export default workoutExerciseRepository;
