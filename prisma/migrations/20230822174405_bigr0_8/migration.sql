/*
  Warnings:

  - You are about to drop the column `lastOne` on the `WorkoutExercise` table. All the data in the column will be lost.
  - You are about to drop the column `repetitions` on the `WorkoutExercise` table. All the data in the column will be lost.
  - You are about to drop the column `sets` on the `WorkoutExercise` table. All the data in the column will be lost.
  - You are about to drop the column `weight` on the `WorkoutExercise` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "WorkoutExercise" DROP COLUMN "lastOne",
DROP COLUMN "repetitions",
DROP COLUMN "sets",
DROP COLUMN "weight";

-- CreateTable
CREATE TABLE "WorkoutExerciseLog" (
    "id" SERIAL NOT NULL,
    "workoutExerciseId" INTEGER NOT NULL,
    "sets" INTEGER NOT NULL,
    "repetitions" INTEGER NOT NULL,
    "weight" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "WorkoutExerciseLog_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "WorkoutExerciseLog" ADD CONSTRAINT "WorkoutExerciseLog_workoutExerciseId_fkey" FOREIGN KEY ("workoutExerciseId") REFERENCES "WorkoutExercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
