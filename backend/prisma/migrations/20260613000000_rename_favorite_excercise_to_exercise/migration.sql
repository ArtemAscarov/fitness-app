-- Rename Favorite.excerciseId -> exerciseId (preserves existing data)
ALTER TABLE "Favorite" RENAME COLUMN "excerciseId" TO "exerciseId";

-- Keep index/constraint names in sync with the new column name
ALTER INDEX "Favorite_excerciseId_userId_key" RENAME TO "Favorite_exerciseId_userId_key";
ALTER TABLE "Favorite" RENAME CONSTRAINT "Favorite_excerciseId_fkey" TO "Favorite_exerciseId_fkey";
