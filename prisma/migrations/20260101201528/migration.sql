-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Wallpaper" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "image" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "categoryCategoryId" TEXT NOT NULL,
    CONSTRAINT "Wallpaper_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Wallpaper_categoryCategoryId_fkey" FOREIGN KEY ("categoryCategoryId") REFERENCES "Category" ("categoryId") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Wallpaper" ("categoryCategoryId", "createdAt", "id", "image", "updatedAt", "userId") SELECT "categoryCategoryId", "createdAt", "id", "image", "updatedAt", "userId" FROM "Wallpaper";
DROP TABLE "Wallpaper";
ALTER TABLE "new_Wallpaper" RENAME TO "Wallpaper";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
