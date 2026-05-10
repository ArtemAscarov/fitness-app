/*
  Warnings:

  - You are about to drop the column `isFavorite` on the `Exercise` table. All the data in the column will be lost.
  - The `calory` column on the `Exercise` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Exercise" DROP COLUMN "isFavorite",
DROP COLUMN "calory",
ADD COLUMN     "calory" INTEGER;

-- AlterTable
ALTER TABLE "Refresh" ADD CONSTRAINT "Refresh_pkey" PRIMARY KEY ("id");

-- CreateTable
CREATE TABLE "Favorite" (
    "id" SERIAL NOT NULL,
    "excerciseId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Favorite_id_key" ON "Favorite"("id");

-- CreateIndex
CREATE UNIQUE INDEX "Favorite_excerciseId_userId_key" ON "Favorite"("excerciseId", "userId");

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Favorite" ADD CONSTRAINT "Favorite_excerciseId_fkey" FOREIGN KEY ("excerciseId") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;
