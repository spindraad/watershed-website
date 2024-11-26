-- CreateEnum
CREATE TYPE "PasswordType" AS ENUM ('ACTIVE', 'RESET');

-- AlterTable
ALTER TABLE "Password" ADD COLUMN     "type" "PasswordType" NOT NULL DEFAULT 'ACTIVE';
