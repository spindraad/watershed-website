-- AlterTable
ALTER TABLE "Event" ADD COLUMN     "content" JSONB,
ADD COLUMN     "imageAlt" TEXT,
ADD COLUMN     "imageUrl" TEXT,
ADD COLUMN     "organiser" TEXT;

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "content" JSONB,
ADD COLUMN     "imageAlt" TEXT,
ADD COLUMN     "imageUrl" TEXT;

-- CreateTable
CREATE TABLE "Maker" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "profession" JSONB NOT NULL,
    "summary" JSONB NOT NULL,
    "slug" TEXT NOT NULL,
    "imageUrl" TEXT,
    "imageAlt" TEXT,
    "content" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Maker_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TalentProgram" (
    "id" TEXT NOT NULL,
    "title" JSONB NOT NULL,
    "duration" TEXT,
    "description" JSONB NOT NULL,
    "imageUrl" TEXT,
    "imageAlt" TEXT,
    "content" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TalentProgram_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CandyShopCategory" (
    "id" TEXT NOT NULL,
    "title" JSONB NOT NULL,
    "description" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CandyShopCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CandyShopItem" (
    "id" TEXT NOT NULL,
    "title" JSONB NOT NULL,
    "description" JSONB NOT NULL,
    "imageUrl" TEXT,
    "imageAlt" TEXT,
    "content" JSONB,
    "categoryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CandyShopItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RubriekCategory" (
    "id" TEXT NOT NULL,
    "title" JSONB NOT NULL,
    "description" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RubriekCategory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Rubriek" (
    "id" TEXT NOT NULL,
    "title" JSONB NOT NULL,
    "description" JSONB NOT NULL,
    "imageUrl" TEXT,
    "imageAlt" TEXT,
    "content" JSONB,
    "categoryId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Rubriek_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_EventMakers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_TalentProgramMakers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_ProjectMakers" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Maker_slug_key" ON "Maker"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "_EventMakers_AB_unique" ON "_EventMakers"("A", "B");

-- CreateIndex
CREATE INDEX "_EventMakers_B_index" ON "_EventMakers"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_TalentProgramMakers_AB_unique" ON "_TalentProgramMakers"("A", "B");

-- CreateIndex
CREATE INDEX "_TalentProgramMakers_B_index" ON "_TalentProgramMakers"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_ProjectMakers_AB_unique" ON "_ProjectMakers"("A", "B");

-- CreateIndex
CREATE INDEX "_ProjectMakers_B_index" ON "_ProjectMakers"("B");

-- AddForeignKey
ALTER TABLE "CandyShopItem" ADD CONSTRAINT "CandyShopItem_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "CandyShopCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Rubriek" ADD CONSTRAINT "Rubriek_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "RubriekCategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventMakers" ADD CONSTRAINT "_EventMakers_A_fkey" FOREIGN KEY ("A") REFERENCES "Event"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_EventMakers" ADD CONSTRAINT "_EventMakers_B_fkey" FOREIGN KEY ("B") REFERENCES "Maker"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TalentProgramMakers" ADD CONSTRAINT "_TalentProgramMakers_A_fkey" FOREIGN KEY ("A") REFERENCES "Maker"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_TalentProgramMakers" ADD CONSTRAINT "_TalentProgramMakers_B_fkey" FOREIGN KEY ("B") REFERENCES "TalentProgram"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectMakers" ADD CONSTRAINT "_ProjectMakers_A_fkey" FOREIGN KEY ("A") REFERENCES "Maker"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_ProjectMakers" ADD CONSTRAINT "_ProjectMakers_B_fkey" FOREIGN KEY ("B") REFERENCES "Project"("id") ON DELETE CASCADE ON UPDATE CASCADE;
