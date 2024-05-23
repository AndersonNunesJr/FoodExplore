-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Products" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "tag" TEXT,
    "description" TEXT,
    "price" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "marketplaceId" TEXT,
    "favoritesId" TEXT,
    CONSTRAINT "Products_marketplaceId_fkey" FOREIGN KEY ("marketplaceId") REFERENCES "markets-place" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Products_favoritesId_fkey" FOREIGN KEY ("favoritesId") REFERENCES "Favorites" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Products" ("created_at", "description", "id", "marketplaceId", "price", "tag", "title", "updatedAt") SELECT "created_at", "description", "id", "marketplaceId", "price", "tag", "title", "updatedAt" FROM "Products";
DROP TABLE "Products";
ALTER TABLE "new_Products" RENAME TO "Products";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
