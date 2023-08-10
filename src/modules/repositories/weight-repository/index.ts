import { prisma } from "@/config";
import { Weight } from "@prisma/client";

async function create(data: CreateWeightParams) {
  return prisma.weight.create({
    data
  });
}

async function edit(data: UpdateWeightParams, id: number) {
  return prisma.weight.update({
    where: {
      id
    },
    data: {
      ...data
    }
  });
}

async function findLast(userId: number) {
  return prisma.weight.findFirst({
    where: {
      userId
    },
    orderBy: {
      id: "desc"
    }
  });
}

async function findHigherOrLower(userId: number, higher: boolean) {
  return prisma.weight.findFirst({
    where: {
      userId
    },
    orderBy: {
      value: higher ? "desc" : "asc"
    }
  });
}

async function findAll(userId: number) {
  return prisma.weight.findMany({
    where: {
      userId
    }
  });
}

async function findById(id: number) {
  return prisma.weight.findUnique({
    where: {
      id
    }
  });
}

async function erase(id: number) {
  return prisma.weight.delete({
    where: {
      id
    }
  });
}

export type CreateWeightParams = Pick<Weight, "value"  | "userId">

export type UpdateWeightParams = Omit<CreateWeightParams, "userId">

const weightRepository = {
  create,
  findLast,
  findAll,
  findById,
  edit,
  erase,
  findHigherOrLower
}; 
    
export default weightRepository;
