import bcrypt from "bcrypt";
import userRepository from "@/modules/repositories/user-repository";
import { CreateUserParams, UpdateUserParams } from "@/modules/repositories/user-repository";
import { duplicatedEmailError } from "./errors";
import { badRequestError, invalidDataError } from "@/errors";
import { exclude } from "@/utils/prisma-utils";

export async function createUser({ email, password }: CreateUserParams) {
  await validateUniqueEmailOrFail(email);
  
  const hashedPassword = await bcrypt.hash(password, 12);
  return userRepository.create({
    email,
    password: hashedPassword,
  });
}

export async function updateUser(data: UpdateUserParams, id: number) {
  if(!data || !data.name || !data.height) {
    throw badRequestError();
  }

  const update = await userRepository.update({
    ...data
  }, id);

  return update;
}

export async function findUser(id: number) {
  if(isNaN(id) || id <= 0) {
    throw badRequestError();
  }

  const user = await userRepository.findById(id);
  
  if(!user) {
    throw invalidDataError();
  }
  return exclude(user, "password");
}

async function validateUniqueEmailOrFail(email: string) {
  const userWithSameEmail = await userRepository.findByEmail(email);
  if (userWithSameEmail) {
    throw duplicatedEmailError();
  }
}

const userService = {
  createUser,
  updateUser,
  findUser
};

export default userService;
