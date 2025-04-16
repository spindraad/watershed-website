/*
  Warnings:

  - You are about to drop the column `meta` on the `Page` table. All the data in the column will be lost.
  - You are about to drop the column `summary` on the `Page` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Page` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[slug]` on the table `Page` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Page" DROP COLUMN "meta",
DROP COLUMN "summary",
DROP COLUMN "title";

-- CreateIndex
CREATE UNIQUE INDEX "Page_slug_key" ON "Page"("slug");
