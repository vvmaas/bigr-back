import app, { init } from "@/app";
import { prisma } from "@/config";
import { faker } from "@faker-js/faker";
import httpStatus from "http-status";
import supertest from "supertest";
import { createUser, createWorkout } from "../factories";
import { cleanDb, generateValidToken } from "../helpers";
import * as jwt from "jsonwebtoken";
import { Workout } from "@prisma/client";

beforeAll(async () => {
  await init();
  await cleanDb();
});

const server = supertest(app);

const generateValidBodyCreate = () => ({
  name: faker.animal.cetacean(),
});
  
const generateInvalidBodyCreate = () => ({
  name: 1,
});

const generateValidBodyUpdate = (workout: Workout) => ({
  name: faker.animal.cetacean(),
  stage: workout.stage + 1
});

const generateInvalidBodyUpdate = () => ({
  name: 1,
  stage: 0
});

describe("GET /workout", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.get("/users");
    
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
    
  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();
    const response = await server.get("/users").set("Authorization", `Bearer ${token}`);
    
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
    
  it("should respond with status 401 if there is no session for given token", async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);
    const response = await server.get("/users").set("Authorization", `Bearer ${token}`);
    
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  describe("when token is valid", () => {
    it("should respond with status 200 and workouts data", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const workout = await createWorkout(user.id);
  
      const response = await server.get("/workout").set("Authorization", `Bearer ${token}`);
  
      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual([
        {
          id: workout.id,
          name: workout.name,
          userId: workout.userId,
          stage: workout.stage,
          deleted: workout.deleted,
          createdAt: workout.createdAt.toISOString(),
          updatedAt: workout.updatedAt.toISOString()
        }
      ]);
    });

    it("should respond with status 200 and an empty array", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
    
      const response = await server.get("/workout").set("Authorization", `Bearer ${token}`);
    
      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual([]);
    });
  });
});

describe("GET /workout/:id", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.get("/users/1");
      
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
      
  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();
    const response = await server.get("/users/1").set("Authorization", `Bearer ${token}`);
      
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
      
  it("should respond with status 401 if there is no session for given token", async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);
    const response = await server.get("/users/1").set("Authorization", `Bearer ${token}`);
      
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  describe("when token is valid", () => {
    it("should respond with status 200 and workout data", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const workout = await createWorkout(user.id);
    
      const response = await server.get(`/workout/${workout.id}`).set("Authorization", `Bearer ${token}`);
    
      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual(
        {
          id: workout.id,
          name: workout.name,
          userId: workout.userId,
          stage: workout.stage,
          deleted: workout.deleted,
          exercises: [],
          createdAt: workout.createdAt.toISOString(),
          updatedAt: workout.updatedAt.toISOString()
        }
      );
    });

    it("should respond with status 400 if workoutId is invalid", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
        
      const response = await server.get("/workout/-1").set("Authorization", `Bearer ${token}`);
        
      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it("should respond with status 400 if workoutId is invalid", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
          
      const response = await server.get("/workout/a").set("Authorization", `Bearer ${token}`);
          
      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it("should respond with status 401 if workoutId belongs to another user", async () => {
      const user = await createUser();
      const user2 = await createUser();
      const token = await generateValidToken(user);
      const workout = await createWorkout(user2.id);
            
      const response = await server.get(`/workout/${workout.id}`).set("Authorization", `Bearer ${token}`);
            
      expect(response.status).toBe(httpStatus.UNAUTHORIZED);
    });
  });
});

describe("POST /workout", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.post("/workout");
      
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
      
  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();
    const response = await server.post("/workout").set("Authorization", `Bearer ${token}`);
      
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
      
  it("should respond with status 401 if there is no session for given token", async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);
    const response = await server.post("/workout").set("Authorization", `Bearer ${token}`);
      
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  describe("when token is valid", () => {
    it("should respond with status 400 when body is not given", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
    
      const response = await server.post("/workout").set("Authorization", `Bearer ${token}`);
    
      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });
    
    it("should respond with status 400 when body is not valid", async () => {
      const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };
      const user = await createUser();
      const token = await generateValidToken(user);
    
      const response = await server.post("/workout").set("Authorization", `Bearer ${token}`).send(invalidBody);
    
      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });
    describe("when body is valid", () => {
      it("should respond with status 201 when body data is valid", async () => {
        const user = await createUser();
        const token = await generateValidToken(user);
        const body = generateValidBodyCreate();
    
        const response = await server.post("/workout").set("Authorization", `Bearer ${token}`).send(body);
    
        expect(response.status).toBe(httpStatus.CREATED);
      });

      it("should save workout on db", async () => {
        const user = await createUser();
        const token = await generateValidToken(user);
        const body = generateValidBodyCreate();
    
        const response = await server.post("/workout").set("Authorization", `Bearer ${token}`).send(body);
        
        const workout = await prisma.workout.findFirst({
          where: {
            id: response.body.id
          }
        });
        
        expect(workout).toEqual(
          expect.objectContaining({
            userId: user.id
          }),
        );
      });

      it("should respond with status 400 when body data is invalid", async () => {
        const user = await createUser();
        const token = await generateValidToken(user);
        const body = generateInvalidBodyCreate();
    
        const response = await server.post("/workout").set("Authorization", `Bearer ${token}`).send(body);
    
        expect(response.status).toBe(httpStatus.BAD_REQUEST);
      });
    });
  });
});

describe("PUT /workout/:id", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.put("/workout/1");
        
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
        
  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();
    const response = await server.put("/workout/1").set("Authorization", `Bearer ${token}`);
        
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
        
  it("should respond with status 401 if there is no session for given token", async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);
    const response = await server.put("/workout/1").set("Authorization", `Bearer ${token}`);
        
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
  describe("when token is valid", () => {
    it("should respond with status 400 when body is not given", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      
      const response = await server.put("/workout/1").set("Authorization", `Bearer ${token}`);
      
      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });
      
    it("should respond with status 400 when body is not valid", async () => {
      const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };
      const user = await createUser();
      const token = await generateValidToken(user);
      
      const response = await server.put("/workout/1").set("Authorization", `Bearer ${token}`).send(invalidBody);
      
      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });
    describe("when body is valid", () => {
      it("should respond with status 200 when body data and id are valid", async () => {
        const user = await createUser();
        const token = await generateValidToken(user);
        const workout = await createWorkout(user.id);
        const body = generateValidBodyUpdate(workout);
      
        const response = await server.put(`/workout/${workout.id}`).set("Authorization", `Bearer ${token}`).send(body);
      
        expect(response.status).toBe(httpStatus.OK);
      });
  
      it("should update workout on db", async () => {
        const user = await createUser();
        const token = await generateValidToken(user);
        const workout = await createWorkout(user.id);
        const body = generateValidBodyUpdate(workout);
      
        await server.put(`/workout/${workout.id}`).set("Authorization", `Bearer ${token}`).send(body);
          
        const workoutFind = await prisma.workout.findUnique({
          where: {
            id: workout.id
          }
        });
          
        expect(workoutFind).toEqual(
          expect.objectContaining({
            name: body.name,
            stage: workout.stage + 1
          }),
        );
      });
  
      it("should respond with status 400 when body data is invalid", async () => {
        const user = await createUser();
        const token = await generateValidToken(user);
        const body = generateInvalidBodyUpdate();
        const workout = await createWorkout(user.id);
      
        const response = await server.put(`/workout/${workout.id}`).set("Authorization", `Bearer ${token}`).send(body);
      
        expect(response.status).toBe(httpStatus.BAD_REQUEST);
      });

      it("should respond with status 400 when id is invalid", async () => {
        const user = await createUser();
        const token = await generateValidToken(user);
        const workout = await createWorkout(user.id);
        const body = generateValidBodyUpdate(workout);
      
        const response = await server.put("/workout/a").set("Authorization", `Bearer ${token}`).send(body);
      
        expect(response.status).toBe(httpStatus.BAD_REQUEST);
      });

      it("should respond with status 400 when id is invalid", async () => {
        const user = await createUser();
        const token = await generateValidToken(user);
        const workout = await createWorkout(user.id);
        const body = generateValidBodyUpdate(workout);
      
        const response = await server.put("/workout/-1").set("Authorization", `Bearer ${token}`).send(body);
      
        expect(response.status).toBe(httpStatus.BAD_REQUEST);
      });
    });
  });
});

describe("DELETE /workout/:id", () => {
  it("should respond with status 401 if no token is given", async () => {
    const response = await server.delete("/workout/1");
        
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
        
  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();
    const response = await server.delete("/workout/1").set("Authorization", `Bearer ${token}`);
        
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
        
  it("should respond with status 401 if there is no session for given token", async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);
    const response = await server.delete("/workout/1").set("Authorization", `Bearer ${token}`);
        
    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });
      
  describe("when token is valid", () => {
    it("should respond with status 200 when id is valid", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const workout = await createWorkout(user.id);
      
      const response = await server.delete(`/workout/${workout.id}`).set("Authorization", `Bearer ${token}`);
      
      expect(response.status).toBe(httpStatus.OK);
    });
  
    it("should update delete property of workout on db", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const workout = await createWorkout(user.id);
      
      await server.delete(`/workout/${workout.id}`).set("Authorization", `Bearer ${token}`);
          
      const workoutFind = await prisma.workout.findUnique({
        where: {
          id: workout.id
        }
      });
          
      expect(workoutFind).toEqual(
        expect.objectContaining({
          deleted: true
        }),
      );
    });

    it("should respond with status 400 when id is invalid", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      
      const response = await server.delete("/workout/a").set("Authorization", `Bearer ${token}`);
      
      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it("should respond with status 400 when id is invalid", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      
      const response = await server.delete("/workout/-1").set("Authorization", `Bearer ${token}`);
      
      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });
  });
});
  
