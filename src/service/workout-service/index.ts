import workoutRepository, { UpdateWorkoutParams, CreateWorkoutParams } from "@/modules/repositories/workout-repository";
import workoutExerciseRepository from "@/modules/repositories/workoutexercise-repository";
import { badRequestError, unauthorizedError } from "@/errors";

async function getWorkouts(userId: number) {
  const workouts = await workoutRepository.findAll(userId);
  return workouts;
} 

async function getWorkout(id: number, userId: number) {
  const workout = await workoutRepository.find(id);
  const exercises = await workoutExerciseRepository.findByStage(id, workout.stage);

  if(workout.userId !== userId) {
    throw unauthorizedError();
  }

  const workoutExercises = {
    ...workout,
    exercises
  };
  return workoutExercises;
} 

async function postWorkout(params: CreateWorkoutParams) {
  if(!params.name) {
    throw badRequestError();
  }
  const workout = await workoutRepository.create(params);
  return workout;
} 

async function updateWorkout(id: number, params: UpdateWorkoutParams) {
  const workout = await workoutRepository.update(id, params);
  return workout;
} 

async function deleteWorkout(id: number) {
  const workout = await workoutRepository.deleteWorkout(id);
  return workout;
} 

const workoutService = {
  getWorkouts,
  getWorkout,
  postWorkout,
  updateWorkout,
  deleteWorkout
}; 

export default workoutService;
