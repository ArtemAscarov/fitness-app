-- DropForeignKey
ALTER TABLE "ExerciseSection" DROP CONSTRAINT "ExerciseSection_exerciseId_fkey";

-- AddForeignKey
ALTER TABLE "ExerciseSection" ADD CONSTRAINT "ExerciseSection_exerciseId_fkey" FOREIGN KEY ("exerciseId") REFERENCES "Exercise"("id") ON DELETE CASCADE ON UPDATE CASCADE;
