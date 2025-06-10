/*
  Warnings:

  - Added the required column `maxNumberOfPeople` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "maxNumberOfPeople" INTEGER NOT NULL;
