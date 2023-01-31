import bcrypt from "bcrypt";
import userRepository from "@/modules/repositories/user-repository";
import { CreateUserParams, UpdateUserParams } from "@/modules/repositories/user-repository";
import { duplicatedEmailError } from "./errors";
import { invalidDataError } from "@/errors";

export async function createUser({ email, password }: CreateUserParams) {
  await validateUniqueEmailOrFail(email);
  
  const hashedPassword = await bcrypt.hash(password, 12);
  return userRepository.create({
    email,
    password: hashedPassword,
  });
}

export async function updateUser({ height, weight, name }: UpdateUserParams, id: number) {
  return userRepository.update({
    height,
    weight,
    name
  }, id);
}

export async function findUser(id: number) {
  const user = await userRepository.findById(id);
  if(!user) {
    throw invalidDataError();
  }
  return user;
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
