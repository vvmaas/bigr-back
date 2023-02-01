import app, { init } from "@/app";
import { prisma } from "@/config";
import { faker } from "@faker-js/faker";
import httpStatus from "http-status";
import supertest from "supertest";
import { createUser, createWorkout, createExercise } from "../factories";
import { cleanDb, generateValidToken } from "../helpers";
import * as jwt from "jsonwebtoken";
import { Workout } from "@prisma/client";

beforeAll(async () => {
  await init();
  await cleanDb();
});

const server = supertest(app);

const generateValidBodyCreate = (workout: Workout, exerciseId: number) => ({
  workoutId: workout.id,
  exerciseId,
  sets: faker.datatype.number(),
  weight: faker.datatype.number(),
  repetitions: faker.datatype.number(),
  stage: workout.stage === 0 ? 0 : workout.stage + 1
});
  
const generateInvalidBodyCreate = () => ({
  workoutId: -1,
  exerciseId: "a",
  sets: "a",
  weight: "a",
  repetitions: "a",
  stage: -1
});

describe("POST /workoutexercise", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.post("/workoutexercise");
        
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
        
  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();
    const response = await server.post("/workoutexercise").set("Authorization", `Bearer ${token}`);
        
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
        
  it("should respond with status 401 if there is no session for given token", async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);
    const response = await server.post("/workoutexercise").set("Authorization", `Bearer ${token}`);
        
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  describe("when token is valid", () => {
    it("should respond with status 400 when body is not given", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      
      const response = await server.post("/workoutexercise").set("Authorization", `Bearer ${token}`);
      
      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });
      
    it("should respond with status 400 when body is not valid", async () => {
      const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };
      const user = await createUser();
      const token = await generateValidToken(user);
      
      const response = await server.post("/workoutexercise").set("Authorization", `Bearer ${token}`).send(invalidBody);
      
      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });
    describe("when body is valid", () => {
      it("should respond with status 201 when body data is valid", async () => {
        const user = await createUser();
        const token = await generateValidToken(user);
        const exercise = await createExercise();
        const workout = await createWorkout(user.id);
        const body = generateValidBodyCreate(workout, exercise.id);
      
        const response = await server.post("/workoutexercise").set("Authorization", `Bearer ${token}`).send(body);
      
        expect(response.status).toBe(httpStatus.CREATED);
      });

      it("should respond with status 401 when workoutId belongs to a workout from another user", async () => {
        const user = await createUser();
        const user2 = await createUser();
        const token = await generateValidToken(user);
        const exercise = await createExercise();
        const workout = await createWorkout(user2.id);
        const body = generateValidBodyCreate(workout, exercise.id);
      
        const response = await server.post("/workoutexercise").set("Authorization", `Bearer ${token}`).send(body);
      
        expect(response.status).toBe(httpStatus.UNAUTHORIZED);
      });
  
      it("should save workoutexercise on db", async () => {
        const user = await createUser();
        const token = await generateValidToken(user);
        const exercise = await createExercise();
        const workout = await createWorkout(user.id);
        const body = generateValidBodyCreate(workout, exercise.id);
      
        await server.post("/workoutexercise").set("Authorization", `Bearer ${token}`).send(body);
          
        const workoutFind = await prisma.workoutExercise.findFirst({
          where: {
            workoutId: workout.id,
            exerciseId: exercise.id,
          }
        });
          
        expect(workoutFind).toEqual(
          expect.objectContaining({
            stage: body.stage,
            weight: body.weight,
            sets: body.sets,
            repetitions: body.repetitions,
          }),
        );
      });
  
      it("should respond with status 400 when body data is invalid", async () => {
        const user = await createUser();
        const token = await generateValidToken(user);
        const body = generateInvalidBodyCreate();
      
        const response = await server.post("/workoutexercise").set("Authorization", `Bearer ${token}`).send(body);
      
        expect(response.status).toBe(httpStatus.BAD_REQUEST);
      });
    });
  });
});
