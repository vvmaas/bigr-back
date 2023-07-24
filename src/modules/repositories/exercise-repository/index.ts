import { prisma } from "@/config";

async function find(id: number) {
  return prisma.exercise.findUnique({
    where: {
      id
    }
  });
}

async function findAll() {
  return prisma.exercise.findMany();
}

const exerciseRepository = {
  find,
  findAll
};

export default exerciseRepository;
