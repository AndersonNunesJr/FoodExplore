/*
  Warnings:

  - You are about to drop the `Order` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `userId` to the `Historic` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Order_userId_key";

-- DropIndex
DROP INDEX "Order_code_key";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "Order";
PRAGMA foreign_keys=on;

-- CreateTable
CREATE TABLE "Orders" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "status" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "historicId" TEXT,
    CONSTRAINT "Orders_historicId_fkey" FOREIGN KEY ("historicId") REFERENCES "Historic" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Historic" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Historic_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Historic" ("id") SELECT "id" FROM "Historic";
DROP TABLE "Historic";
ALTER TABLE "new_Historic" RENAME TO "Historic";
CREATE UNIQUE INDEX "Historic_userId_key" ON "Historic"("userId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "Orders_code_key" ON "Orders"("code");
