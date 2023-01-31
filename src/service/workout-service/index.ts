import workoutRepository, { UpdateWorkoutParams, CreateWorkoutParams } from "@/modules/repositories/workout-repository";
import userRepository from "@/modules/repositories/user-repository";
import workoutExerciseRepository from "@/modules/repositories/workoutexercise-repository";
import { invalidDataError } from "@/errors";

async function getWorkouts(userId: number) {
  const workouts = await workoutRepository.findAll(userId);
  return workouts;
} 

async function getWorkout(id: number) {
  const workout = await workoutRepository.find(id);
  const exercises = await workoutExerciseRepository.findByStage(id, workout.stage);

  const workoutExercises = {
    ...workout,
    exercises
  };
  return workoutExercises;
} 

async function postWorkout(params: CreateWorkoutParams) {
  const user = await userRepository.findById(params.userId);
  if(!user) {
    throw invalidDataError();
  }
  const workout = await workoutRepository.create(params);
  return workout;
} 

async function updateWorkout(id: number, params: UpdateWorkoutParams) {
  const workout = await workoutRepository.update(id, params);
  return workout;
} 

const workoutService = {
  getWorkouts,
  getWorkout,
  postWorkout,
  updateWorkout
}; 

export default workoutService;
