import { prisma } from "@/config";
import { Prisma } from "@prisma/client";
import { User } from "@prisma/client";

async function create(data: CreateUserParams) {
  return prisma.user.create({
    data,
  });
}

async function update(data: UpdateUserParams, id: number) {
  return prisma.user.update({
    data: {
      ...data
    },
    where: {
      id
    }
  });
}

async function findByEmail(email: string) {
  const params: Prisma.UserFindUniqueArgs = {
    where: {
      email,
    },
  };
  
  return prisma.user.findUnique(params);
}

async function findById(id: number) {
  const params: Prisma.UserFindUniqueArgs = {
    where: {
      id,
    },
  };
  
  return prisma.user.findUnique(params);
}

export type CreateUserParams = Pick<User, "email" | "password">;

export type UpdateUserParams = Pick<User, "height" | "weight" | "name">;
  
const userRepository = {
  create,
  update,
  findByEmail,
  findById
};
  
export default userRepository;
