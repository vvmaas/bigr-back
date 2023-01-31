/*
  Warnings:

  - Added the required column `workoutId` to the `Diary` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Diary" ADD COLUMN     "workoutId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "Diary" ADD CONSTRAINT "Diary_workoutId_fkey" FOREIGN KEY ("workoutId") REFERENCES "Workout"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
