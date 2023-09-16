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

async function findAll(userId: number) {
  return prisma.weight.findMany({
    where: {
      userId
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
  findAll,
  edit,
  erase,
}; 
    
export default weightRepository;
