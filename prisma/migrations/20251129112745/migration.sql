/*
  Warnings:

  - Added the required column `userId` to the `Wallpaper` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Wallpaper" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "category" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Wallpaper_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Wallpaper" ("category", "createdAt", "id", "image", "updatedAt") SELECT "category", "createdAt", "id", "image", "updatedAt" FROM "Wallpaper";
DROP TABLE "Wallpaper";
ALTER TABLE "new_Wallpaper" RENAME TO "Wallpaper";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
