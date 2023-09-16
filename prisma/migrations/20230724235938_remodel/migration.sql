/*
  Warnings:

  - You are about to drop the column `stage` on the `Workout` table. All the data in the column will be lost.
  - You are about to drop the column `stage` on the `WorkoutExercise` table. All the data in the column will be lost.
  - You are about to drop the `Diary` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `namePt` to the `Exercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `WorkoutExercise` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Diary" DROP CONSTRAINT "Diary_userId_fkey";

-- DropForeignKey
ALTER TABLE "Diary" DROP CONSTRAINT "Diary_workoutId_fkey";

-- AlterTable
ALTER TABLE "Exercise" ADD COLUMN     "namePt" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "weight" SET DEFAULT 0,
ALTER COLUMN "weight" SET DATA TYPE DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Workout" DROP COLUMN "stage";

-- AlterTable
ALTER TABLE "WorkoutExercise" DROP COLUMN "stage",
ADD COLUMN     "deleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "lastOne" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "userId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "Diary";

-- CreateTable
CREATE TABLE "Weight" (
    "id" SERIAL NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Weight_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Group" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "namePt" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Group_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Target" (
    "id" SERIAL NOT NULL,
    "exerciseId" INTEGER NOT NULL,
    "groupId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Target_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Weight" ADD CONSTRAINT "Weight_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Target" ADD CONSTRAINT "Target_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Target" ADD CONSTRAINT "Target_groupId_fkey" FOREIGN KEY ("groupId") REFERENCES "Group"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "WorkoutExercise" ADD CONSTRAINT "WorkoutExercise_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
