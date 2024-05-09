/*
  Warnings:

  - The primary key for the `markets-place` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `users` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - Made the column `userId` on table `Favorits` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_markets-place" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "storename" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "markets-place_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_markets-place" ("created_at", "id", "storename", "updatedAt", "userId") SELECT "created_at", "id", "storename", "updatedAt", "userId" FROM "markets-place";
DROP TABLE "markets-place";
ALTER TABLE "new_markets-place" RENAME TO "markets-place";
CREATE UNIQUE INDEX "markets-place_storename_key" ON "markets-place"("storename");
CREATE UNIQUE INDEX "markets-place_userId_key" ON "markets-place"("userId");
CREATE UNIQUE INDEX "unique_marketplace_userId" ON "markets-place"("userId");
CREATE TABLE "new_users" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "roleId" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "users_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_users" ("created_at", "email", "id", "name", "password", "roleId", "updatedAt") SELECT "created_at", "email", "id", "name", "password", "roleId", "updatedAt" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
CREATE TABLE "new_Products" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "description" TEXT,
    "price" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "marketplaceId" TEXT,
    CONSTRAINT "Products_marketplaceId_fkey" FOREIGN KEY ("marketplaceId") REFERENCES "markets-place" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_Products" ("created_at", "description", "id", "marketplaceId", "price", "title", "updatedAt") SELECT "created_at", "description", "id", "marketplaceId", "price", "title", "updatedAt" FROM "Products";
DROP TABLE "Products";
ALTER TABLE "new_Products" RENAME TO "Products";
CREATE TABLE "new_Favorits" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Favorits_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Favorits" ("id", "userId") SELECT "id", "userId" FROM "Favorits";
DROP TABLE "Favorits";
ALTER TABLE "new_Favorits" RENAME TO "Favorits";
CREATE UNIQUE INDEX "Favorits_userId_key" ON "Favorits"("userId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
