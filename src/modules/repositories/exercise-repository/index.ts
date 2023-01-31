import { prisma } from "@/config";

async function find(id: number) {
  return prisma.exercise.findUnique({
    where: {
      id
    }
  });
}

const exerciseRepository = {
  find
};

export default exerciseRepository;
