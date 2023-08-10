import { prisma } from "@/config";
import { User } from "@prisma/client";

async function create(data: CreateUserParams) {
  return prisma.user.create({
    data,
  });
}

async function update(data: UpdateUserParams, id: number) {
  return prisma.user.update({
    where: {
      id
    },
    data: {
      ...data
    }
  });
}

async function findByEmail(email: string) {
  return prisma.user.findUnique({
    where: {
      email,
    },
  });
}

async function findById(id: number) {
  return prisma.user.findUnique({
    where: {
      id,
    },
  });
}

export type CreateUserParams = Pick<User, "email" | "password">;

export type UpdateUserParams = Pick<User, "height" | "name">;
  
const userRepository = {
  create,
  update,
  findByEmail,
  findById
};
  
export default userRepository;
