-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Products" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
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
CREATE TABLE "new_markets-place" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "storename" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "markets-place_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_markets-place" ("created_at", "id", "storename", "updatedAt", "userId") SELECT "created_at", "id", "storename", "updatedAt", "userId" FROM "markets-place";
DROP TABLE "markets-place";
ALTER TABLE "new_markets-place" RENAME TO "markets-place";
CREATE UNIQUE INDEX "markets-place_storename_key" ON "markets-place"("storename");
CREATE UNIQUE INDEX "markets-place_userId_key" ON "markets-place"("userId");
CREATE UNIQUE INDEX "unique_marketplace_userId" ON "markets-place"("userId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
