/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `PasswordResets` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "PasswordResets_token_key" ON "PasswordResets"("token");
