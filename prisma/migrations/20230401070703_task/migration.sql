/*
  Warnings:

  - The primary key for the `Task` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Added the required column `archived` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `done` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Added the required column `userId` to the `Task` table without a default value. This is not possible if the table is not empty.
  - Made the column `title` on table `Task` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Task" DROP CONSTRAINT "Task_pkey",
ADD COLUMN     "archived" BOOLEAN NOT NULL,
ADD COLUMN     "done" BOOLEAN NOT NULL,
ADD COLUMN     "due" TIMESTAMP(3),
ADD COLUMN     "end" TIMESTAMP(3),
ADD COLUMN     "group" TEXT,
ADD COLUMN     "priority" INTEGER,
ADD COLUMN     "start" TIMESTAMP(3),
ADD COLUMN     "type" TEXT,
ADD COLUMN     "userId" TEXT NOT NULL,
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "title" SET NOT NULL,
ADD CONSTRAINT "Task_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "Task_id_seq";
