/*
  Warnings:

  - You are about to drop the column `type` on the `Password` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Password" DROP COLUMN "type";

-- DropEnum
DROP TYPE "PasswordType";

-- CreateTable
CREATE TABLE "PasswordResets" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "PasswordResets_pkey" PRIMARY KEY ("id")
);
