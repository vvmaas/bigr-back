import { prisma } from "@/config";
import { WorkoutExercise } from "@prisma/client";

async function create(workoutExercise: CreateWEParams) {
  return prisma.workoutExercise.create({
    data: {
      ...workoutExercise
    },
  });
}

async function findByStage(workoutId: number, stage: number) {
  return prisma.workoutExercise.findMany({
    where: {
      stage,
      workoutId
    }
  });
}

async function createMany(exercises: WorkoutExercise[]) {
  exercises.map(async exercise => {
    await workoutExerciseRepository.create(
      {
        exerciseId: exercise.exerciseId,
        workoutId: exercise.workoutId,
        sets: exercise.sets,
        repetitions: exercise.repetitions,
        weight: exercise.weight,
        stage: exercise.stage + 1
      }
    );
  });
}
  
export type CreateWEParams = Omit<WorkoutExercise, "id" | "createdAt" | "updatedAt">

const workoutExerciseRepository = {
  create,
  findByStage,
  createMany
};
  
export default workoutExerciseRepository;
