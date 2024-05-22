/*
  Warnings:

  - The primary key for the `Products` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Products" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "price" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "marketplaceId" TEXT,
    CONSTRAINT "Products_marketplaceId_fkey" FOREIGN KEY ("marketplaceId") REFERENCES "markets-place" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Products" ("created_at", "description", "id", "marketplaceId", "price", "title", "updatedAt") SELECT "created_at", "description", "id", "marketplaceId", "price", "title", "updatedAt" FROM "Products";
DROP TABLE "Products";
ALTER TABLE "new_Products" RENAME TO "Products";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
