/*
  Warnings:

  - You are about to drop the column `instruction` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `instructionTitle` on the `Exercise` table. All the data in the column will be lost.
  - You are about to drop the column `tokerId` on the `Refresh` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[tokenId]` on the table `Refresh` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `levelId` to the `Exercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `tokenId` to the `Refresh` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Favorite_id_key";

-- DropIndex
DROP INDEX "Refresh_tokerId_key";

-- AlterTable
ALTER TABLE "Exercise" DROP COLUMN "instruction",
DROP COLUMN "instructionTitle",
ADD COLUMN     "duration" TEXT,
ADD COLUMN     "levelId" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "Refresh" DROP COLUMN "tokerId",
ADD COLUMN     "tokenId" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Level" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,

    CONSTRAINT "Level_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ExerciseSection" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT,
    "list" TEXT[],
    "exerciseId" INTEGER NOT NULL,

    CONSTRAINT "ExerciseSection_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Level_slug_key" ON "Level"("slug");

-- CreateIndex
CREATE INDEX "Level_slug_idx" ON "Level"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "Refresh_tokenId_key" ON "Refresh"("tokenId");

-- AddForeignKey
ALTER TABLE "ExerciseSection" ADD CONSTRAINT "ExerciseSection_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Exercise" ADD CONSTRAINT "Exercise_levelId_fkey" FOREIGN KEY ("levelId") REFERENCES "Level"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
