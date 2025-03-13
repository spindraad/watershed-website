/*
  Warnings:

  - You are about to drop the column `contentRelationId` on the `Event` table. All the data in the column will be lost.
  - You are about to drop the column `contentRelationId` on the `NewsArticle` table. All the data in the column will be lost.
  - You are about to drop the column `contentRelationId` on the `Project` table. All the data in the column will be lost.
  - You are about to drop the `ContentRelation` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Creator` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Tag` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `title` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Creator" DROP CONSTRAINT "Creator_contentRelationId_fkey";

-- DropForeignKey
ALTER TABLE "Event" DROP CONSTRAINT "Event_contentRelationId_fkey";

-- DropForeignKey
ALTER TABLE "NewsArticle" DROP CONSTRAINT "NewsArticle_contentRelationId_fkey";

-- DropForeignKey
ALTER TABLE "Project" DROP CONSTRAINT "Project_contentRelationId_fkey";

-- DropForeignKey
ALTER TABLE "Tag" DROP CONSTRAINT "Tag_contentRelationId_fkey";

-- AlterTable
ALTER TABLE "Event" DROP COLUMN "contentRelationId";

-- AlterTable
ALTER TABLE "NewsArticle" DROP COLUMN "contentRelationId";

-- AlterTable
ALTER TABLE "Project" DROP COLUMN "contentRelationId",
ADD COLUMN     "title" JSONB NOT NULL;

-- DropTable
DROP TABLE "ContentRelation";

-- DropTable
DROP TABLE "Creator";

-- DropTable
DROP TABLE "Tag";
