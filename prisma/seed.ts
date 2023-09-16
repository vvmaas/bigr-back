import { PrismaClient } from "@prisma/client";
import createExercises from "./seed-exercises";
const prisma = new PrismaClient();

export default async function main() {
  createExercises();
}

main()
  .catch((e) => {
    console.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

