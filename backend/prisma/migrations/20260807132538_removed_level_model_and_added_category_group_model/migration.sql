/*
  Warnings:

  - You are about to drop the column `levelId` on the `Exercise` table. All the data in the column will be lost.
  - The `role` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Level` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "ROLE" AS ENUM ('ADMIN', 'USER');

-- DropForeignKey
ALTER TABLE "Exercise" DROP CONSTRAINT "Exercise_levelId_fkey";

-- AlterTable
ALTER TABLE "Category" ADD COLUMN     "categoryGroupId" INTEGER;

-- AlterTable
ALTER TABLE "Exercise" DROP COLUMN "levelId";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "role",
ADD COLUMN     "role" "ROLE" NOT NULL DEFAULT 'USER';

-- DropTable
DROP TABLE "Level";

-- DropEnum
DROP TYPE "ROLES";

-- CreateTable
CREATE TABLE "CategoriesGroup" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,

    CONSTRAINT "CategoriesGroup_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_categoryGroupId_fkey" FOREIGN KEY ("categoryGroupId") REFERENCES "CategoriesGroup"("id") ON DELETE SET NULL ON UPDATE CASCADE;
