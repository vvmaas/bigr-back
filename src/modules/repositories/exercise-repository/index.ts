import { prisma } from "@/config";

async function find(id: number) {
  return prisma.exercise.findUnique({
    where: {
      id
    }
  });
}

async function findByKeyword(keyword: string) {
  return await prisma.exercise.findMany({
    where: {
      name: {
        contains: `${keyword}`,
        mode: "insensitive",
      },
    },
  });
}

async function findAll() {
  return prisma.exercise.findMany();
}

const exerciseRepository = {
  find,
  findAll,
  findByKeyword
};

export default exerciseRepository;
