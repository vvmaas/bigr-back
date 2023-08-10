import { prisma } from "@/config";
import { Workout } from "@prisma/client";

async function findAll(userId: number) {
  return prisma.workout.findMany({
    where: {
      userId,
      deleted: false
    }
  });
}

async function find(id: number) {
  return prisma.workout.findUnique({
    where: {
      id
    },
  });
}

async function create(workout: CreateWorkoutParams) {
  return prisma.workout.create({
    data: {
      ...workout
    },
  });
}

async function update(id: number, workout: UpdateWorkoutParams) {
  return prisma.workout.update({
    where: {
      id
    },
    data: {
      ...workout
    }
  });
}

async function deleteWorkout(id: number) {
  return prisma.workout.update({
    where: {
      id
    },
    data: {
      deleted: true
    }
  });
}

export type CreateWorkoutParams = Omit<Workout, "id" | "deleted" | "createdAt" | "updatedAt">
export type UpdateWorkoutParams = Omit<Workout, "id" | "userId" | "deleted" |"createdAt" | "updatedAt">
  
const workoutRepository = {
  findAll,
  find,
  create,
  update,
  deleteWorkout
};
  
export default workoutRepository;
