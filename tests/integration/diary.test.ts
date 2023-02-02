import app, { init } from "@/app";
import { prisma } from "@/config";
import { faker } from "@faker-js/faker";
import httpStatus from "http-status";
import supertest from "supertest";
import { createDiary, createExercise, createUser, createWorkout, createWorkoutExercise } from "../factories";
import { cleanDb, generateValidToken } from "../helpers";
import * as jwt from "jsonwebtoken";
import { Workout, WorkoutExercise } from "@prisma/client";

beforeAll(async () => {
  await init();
  await cleanDb();
});

const server = supertest(app);

const generateValidBodyCreate = () => ({
  email: faker.internet.email(),
  password: faker.internet.password(6),
});

const generateValidBodyCreateDiary = async (userId: number, workoutexercise: WorkoutExercise, workout: Workout) => ({
  userId,
  workoutId: workout.id,
  Date: faker.datatype.datetime(),
  stage: workout.stage + 1,
  workoutExercises: [workoutexercise],
});

const generateInvalidBodyCreateDiary = async () => ({
  userId: "a",
  workoutId: "1",
  Date: "",
  stage: 0,
  workoutExercises: [0, 1, 1],
});

describe("GET /diary", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.get("/diary");

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();
    const response = await server.get("/diary").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if there is no session for given token", async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);
    const response = await server.get("/diary").set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe("when token is valid", () => {
    it("should respond with status 200 and empty array", async () => {
      const body = generateValidBodyCreate();
      const user = await createUser(body);
      const token = await generateValidToken(user);

      const response = await server.get("/diary").set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual([]);
    });

    it("should respond with status 200 and diary data", async () => {
      const body = generateValidBodyCreate();
      const user = await createUser(body);
      const token = await generateValidToken(user);
      const workout = await createWorkout(user.id);
      const diary = await createDiary(user.id, workout);
      
      const response = await server.get("/diary").set("Authorization", `Bearer ${token}`);
  
      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual([
        {
          id: diary.id,
          userId: diary.userId,
          workoutId: diary.workoutId,
          Date: diary.Date.toISOString(),
          stage: diary.stage,
          createdAt: diary.createdAt.toISOString(),
          updatedAt: diary.updatedAt.toISOString()
        }
      ]);
    });
  });
});

describe("POST /diary", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.post("/diary");
        
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
        
  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();
    const response = await server.post("/diary").set("Authorization", `Bearer ${token}`);
        
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
        
  it("should respond with status 401 if there is no session for given token", async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);
    const response = await server.post("/diary").set("Authorization", `Bearer ${token}`);
        
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  describe("when token is valid", () => {
    it("should respond with status 400 when body is not given", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      
      const response = await server.post("/diary").set("Authorization", `Bearer ${token}`);
      
      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });
      
    it("should respond with status 400 when body is not valid", async () => {
      const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };
      const user = await createUser();
      const token = await generateValidToken(user);
      
      const response = await server.post("/diary").set("Authorization", `Bearer ${token}`).send(invalidBody);
      
      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });
    describe("when body is valid", () => {
      it("should respond with status 201 when body data is valid", async () => {
        const user = await createUser();
        const token = await generateValidToken(user);
        const workout = await createWorkout(user.id);
        const exercise = await createExercise();
        const workoutExercise = await createWorkoutExercise(exercise.id, workout);
        const body = await generateValidBodyCreateDiary(user.id, workoutExercise, workout);
      
        const response = await server.post("/diary").set("Authorization", `Bearer ${token}`).send(body);
      
        expect(response.status).toBe(httpStatus.CREATED);
      });
  
      it("should save diary on db", async () => {
        const user = await createUser();
        const token = await generateValidToken(user);
        const workout = await createWorkout(user.id);
        const exercise = await createExercise();
        const workoutExercise = await createWorkoutExercise(exercise.id, workout);
        const body = await generateValidBodyCreateDiary(user.id, workoutExercise, workout);
      
        const response = await server.post("/diary").set("Authorization", `Bearer ${token}`).send(body);
          
        const diary = await prisma.diary.findFirst({
          where: {
            userId: user.id,
            workoutId: workout.id
          }
        });
        expect(response.status).toBe(httpStatus.CREATED);
        expect(diary).toEqual(
          expect.objectContaining({
            workoutId: workout.id,
            userId: user.id,
            stage: body.stage,
            Date: body.Date
          }),
        );
      });

      it("should update workout stage", async () => {
        const user = await createUser();
        const token = await generateValidToken(user);
        const workout = await createWorkout(user.id);
        const exercise = await createExercise();
        const workoutExercise = await createWorkoutExercise(exercise.id, workout);
        const body = await generateValidBodyCreateDiary(user.id, workoutExercise, workout);
      
        await server.post("/diary").set("Authorization", `Bearer ${token}`).send(body);
          
        const workoutFind = await prisma.workout.findUnique({
          where: {
            id: workout.id
          }
        });
          
        expect(workoutFind).toEqual(
          expect.objectContaining({
            stage: workout.stage + 1,
          }),
        );
      });

      it("should create new workoutExercise", async () => {
        const user = await createUser();
        const token = await generateValidToken(user);
        const workout = await createWorkout(user.id);
        const exercise = await createExercise();
        const workoutExercise = await createWorkoutExercise(exercise.id, workout);
        const body = await generateValidBodyCreateDiary(user.id, workoutExercise, workout);
      
        await server.post("/diary").set("Authorization", `Bearer ${token}`).send(body);
          
        const workoutExerciseFind = await prisma.workoutExercise.findFirst({
          where: {
            stage: body.stage
          }
        });
          
        expect(workoutExerciseFind).toEqual(
          expect.objectContaining({
            stage: workout.stage + 1,
          }),
        );
      });
  
      it("should respond with status 400 when body data is invalid", async () => {
        const user = await createUser();
        const token = await generateValidToken(user);
        const body = generateInvalidBodyCreateDiary();
      
        const response = await server.post("/diary").set("Authorization", `Bearer ${token}`).send(body);
      
        expect(response.status).toBe(httpStatus.BAD_REQUEST);
      });
    });
  });
});
