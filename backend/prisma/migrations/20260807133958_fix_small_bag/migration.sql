/*
  Warnings:

  - Made the column `categoryGroupId` on table `Category` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_categoryGroupId_fkey";

-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "categoryGroupId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Category" ADD CONSTRAINT "Category_categoryGroupId_fkey" FOREIGN KEY ("categoryGroupId") REFERENCES "CategoriesGroup"("id") ON DELETE CASCADE ON UPDATE CASCADE;
