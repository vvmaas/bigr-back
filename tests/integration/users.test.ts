import app, { init } from "@/app";
import { prisma } from "@/config";
import { duplicatedEmailError } from "@/service/user-service/errors";
import { faker } from "@faker-js/faker";
import httpStatus from "http-status";
import supertest from "supertest";
import { createUser } from "../factories";
import { cleanDb, generateValidToken } from "../helpers";
import * as jwt from "jsonwebtoken";

beforeAll(async () => {
  await init();
  await cleanDb();
});

const server = supertest(app);

const generateValidBodyUpdate = () => ({
  name: faker.name.firstName(),
  weight: faker.datatype.number({ min: 40, max: 200 }),
  height: faker.datatype.number({ min: 100, max: 280 }),
});

const generateInvalidBodyUpdate = () => ({
  name: "",
  weight: -1,
  height: "height",
});

const generateValidBodyCreate = () => ({
  email: faker.internet.email(),
  password: faker.internet.password(6),
});

describe("GET /users", () => {
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
    it("should respond with status 200 and user data", async () => {
      const body = generateValidBodyCreate();
      const user = await createUser(body);
      const token = await generateValidToken(user);

      const response = await server.get("/users").set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.OK);
      expect(response.body).toEqual(expect.objectContaining({
        id: user.id,
        email: user.email,
      }),);
    });
  });
});

describe("POST /users", () => {
  it("should respond with status 400 when body is not given", async () => {
    const response = await server.post("/users");

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  it("should respond with status 400 when body is not valid", async () => {
    const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };

    const response = await server.post("/users").send(invalidBody);

    expect(response.status).toBe(httpStatus.BAD_REQUEST);
  });

  describe("when body is valid", () => {
    it("should respond with status 409 when there is an user with given email", async () => {
      const body = generateValidBodyCreate();
      await createUser(body);

      const response = await server.post("/users").send(body);

      expect(response.status).toBe(httpStatus.CONFLICT);
      expect(response.body).toEqual(duplicatedEmailError());
    });

    it("should respond with status 201 and create user when given email is unique", async () => {
      const body = generateValidBodyCreate();

      const response = await server.post("/users").send(body);

      expect(response.status).toBe(httpStatus.CREATED);
      expect(response.body).toEqual({
        id: expect.any(Number),
        email: body.email,
      });
    });

    it("should not return user password on body", async () => {
      const body = generateValidBodyCreate();

      const response = await server.post("/users").send(body);

      expect(response.body).not.toHaveProperty("password");
    });

    it("should save user on db", async () => {
      const body = generateValidBodyCreate();

      const response = await server.post("/users").send(body);

      const user = await prisma.user.findUnique({
        where: { email: body.email },
      });
      expect(user).toEqual(
        expect.objectContaining({
          id: response.body.id,
          email: body.email,
        }),
      );
    });
  });
});

describe("PUT /users", () => {
  it("should respond with status 401 if no token is given", async () => {
    const validBody = generateValidBodyUpdate();
    const response = await server.put("/users").send(validBody);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if given token is not valid", async () => {
    const token = faker.lorem.word();
    const validBody = generateValidBodyUpdate();
    const response = await server.put("/users").set("Authorization", `Bearer ${token}`).send(validBody);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  it("should respond with status 401 if there is no session for given token", async () => {
    const userWithoutSession = await createUser();
    const token = jwt.sign({ userId: userWithoutSession.id }, process.env.JWT_SECRET);
    const validBody = generateValidBodyUpdate();
    const response = await server.put("/users").set("Authorization", `Bearer ${token}`).send(validBody);

    expect(response.status).toBe(httpStatus.UNAUTHORIZED);
  });

  describe("when token is valid", () => {
    it("should respond with status 400 when body is not given", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const response = await server.put("/users").set("Authorization", `Bearer ${token}`);

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it("should respond with status 400 when body is not valid", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const invalidBody = { [faker.lorem.word()]: faker.lorem.word() };

      const response = await server.put("/users").set("Authorization", `Bearer ${token}`).send(invalidBody);

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    it("should respond with status 400 if body data is invalid", async () => {
      const user = await createUser();
      const token = await generateValidToken(user);
      const bodyUpdate = generateInvalidBodyUpdate();

      const response = await server.put("/users").set("Authorization", `Bearer ${token}`).send(bodyUpdate);

      expect(response.status).toBe(httpStatus.BAD_REQUEST);
    });

    describe("when body is valid", () => {
      it("should respond with status 200 and update user when given body data is valid", async () => {
        const user = await createUser();
        const token = await generateValidToken(user);
        const bodyUpdate = generateValidBodyUpdate();

        const response = await server.put("/users").set("Authorization", `Bearer ${token}`).send(bodyUpdate);

        expect(response.status).toBe(httpStatus.OK);
      });

      it("should update user on db", async () => {
        const bodyCreate = generateValidBodyCreate();
        const user = await createUser(bodyCreate);
        const token = await generateValidToken(user);
        const bodyUpdate = generateValidBodyUpdate();

        await server.put("/users").set("Authorization", `Bearer ${token}`).send(bodyUpdate);

        const userFind = await prisma.user.findUnique({
          where: { email: bodyCreate.email },
        });
        expect(userFind).toEqual(
          expect.objectContaining({
            name: bodyUpdate.name,
            height: bodyUpdate.height,
            weight: bodyUpdate.weight,
          }),
        );
      });
    });
  });
});

