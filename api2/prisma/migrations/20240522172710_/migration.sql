/*
  Warnings:

  - You are about to drop the column `favoritesId` on the `Products` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Favorites" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "productsId" TEXT,
    CONSTRAINT "Favorites_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Favorites_productsId_fkey" FOREIGN KEY ("productsId") REFERENCES "Products" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Favorites" ("id", "userId") SELECT "id", "userId" FROM "Favorites";
DROP TABLE "Favorites";
ALTER TABLE "new_Favorites" RENAME TO "Favorites";
CREATE UNIQUE INDEX "Favorites_userId_key" ON "Favorites"("userId");
CREATE TABLE "new_Products" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "tag" TEXT,
    "description" TEXT,
    "price" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "marketplaceId" TEXT,
    CONSTRAINT "Products_marketplaceId_fkey" FOREIGN KEY ("marketplaceId") REFERENCES "markets-place" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Products" ("created_at", "description", "id", "marketplaceId", "price", "tag", "title", "updatedAt") SELECT "created_at", "description", "id", "marketplaceId", "price", "tag", "title", "updatedAt" FROM "Products";
DROP TABLE "Products";
ALTER TABLE "new_Products" RENAME TO "Products";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
