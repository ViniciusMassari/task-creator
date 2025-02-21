/*
  Warnings:

  - The `completed_at` column on the `tasks` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "tasks" DROP COLUMN "completed_at",
ADD COLUMN     "completed_at" TIMESTAMP(3);
