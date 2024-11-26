-- CreateEnum
CREATE TYPE "PasswordType" AS ENUM ('ACTIVE', 'MUSTCHANGE');

-- AlterTable
ALTER TABLE "Password" ADD COLUMN     "type" "PasswordType" NOT NULL DEFAULT 'ACTIVE';
