/*
  Warnings:

  - You are about to drop the column `userId` on the `Role` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `users` table. All the data in the column will be lost.
  - Made the column `storename` on table `markets-place` required. This step will fail if there are existing NULL values in that column.
  - Made the column `userId` on table `markets-place` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Role" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Role" ("created_at", "id", "name", "updatedAt") SELECT "created_at", "id", "name", "updatedAt" FROM "Role";
DROP TABLE "Role";
ALTER TABLE "new_Role" RENAME TO "Role";
CREATE TABLE "new_users" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "roleId" TEXT,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "users_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_users" ("created_at", "email", "id", "name", "password", "updatedAt") SELECT "created_at", "email", "id", "name", "password", "updatedAt" FROM "users";
DROP TABLE "users";
ALTER TABLE "new_users" RENAME TO "users";
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");
CREATE TABLE "new_markets-place" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "storename" TEXT NOT NULL,
    "userId" INTEGER NOT NULL,
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
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
