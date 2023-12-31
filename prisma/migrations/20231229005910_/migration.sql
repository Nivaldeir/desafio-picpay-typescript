/*
  Warnings:

  - You are about to drop the column `documents` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[document]` on the table `User` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `document` to the `User` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `usertype` on the `User` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "UserType" AS ENUM ('COMMON', 'MERCHANT');

-- DropIndex
DROP INDEX "User_documents_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "documents",
ADD COLUMN     "document" TEXT NOT NULL,
DROP COLUMN "usertype",
ADD COLUMN     "usertype" "UserType" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_document_key" ON "User"("document");
