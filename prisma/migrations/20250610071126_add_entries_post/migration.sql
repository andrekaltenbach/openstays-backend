/*
  Warnings:

  - You are about to drop the column `UserId` on the `Post` table. All the data in the column will be lost.
  - The required column `userId` was added to the `Post` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "Post" DROP COLUMN "UserId",
ADD COLUMN     "isBed" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isCaravan" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "isTent" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "userId" TEXT NOT NULL;
