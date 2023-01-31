/*
  Warnings:

  - Added the required column `stage` to the `Diary` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stage` to the `WorkoutExercise` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Diary" ADD COLUMN     "stage" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Workout" ADD COLUMN     "stage" INTEGER NOT NULL DEFAULT 0;

-- AlterTable
ALTER TABLE "WorkoutExercise" ADD COLUMN     "stage" INTEGER NOT NULL;
