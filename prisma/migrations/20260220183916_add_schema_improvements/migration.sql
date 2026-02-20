/*
  Warnings:

  - You are about to drop the `Category` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Wallpaper` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Wallpaper" DROP CONSTRAINT "Wallpaper_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "Wallpaper" DROP CONSTRAINT "Wallpaper_userId_fkey";

-- DropTable
DROP TABLE "Category";

-- DropTable
DROP TABLE "Wallpaper";

-- CreateTable
CREATE TABLE "wallpaper" (
    "id" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "categoryId" TEXT NOT NULL,

    CONSTRAINT "wallpaper_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "category" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "category_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "wallpaper_userId_idx" ON "wallpaper"("userId");

-- CreateIndex
CREATE INDEX "wallpaper_createdAt_idx" ON "wallpaper"("createdAt");

-- CreateIndex
CREATE UNIQUE INDEX "category_slug_key" ON "category"("slug");

-- CreateIndex
CREATE INDEX "user_createdAt_idx" ON "user"("createdAt");

-- AddForeignKey
ALTER TABLE "wallpaper" ADD CONSTRAINT "wallpaper_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "wallpaper" ADD CONSTRAINT "wallpaper_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
