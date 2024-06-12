/*
  Warnings:

  - You are about to drop the `_HistoricToOrders` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `historicId` to the `Orders` table without a default value. This is not possible if the table is not empty.
  - Made the column `marketplaceId` on table `Historic` required. This step will fail if there are existing NULL values in that column.

*/
-- DropIndex
DROP INDEX "_HistoricToOrders_B_index";

-- DropIndex
DROP INDEX "_HistoricToOrders_AB_unique";

-- DropTable
PRAGMA foreign_keys=off;
DROP TABLE "_HistoricToOrders";
PRAGMA foreign_keys=on;

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Orders" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "status" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "historicId" TEXT NOT NULL,
    CONSTRAINT "Orders_historicId_fkey" FOREIGN KEY ("historicId") REFERENCES "Historic" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Orders" ("code", "created_at", "details", "id", "status") SELECT "code", "created_at", "details", "id", "status" FROM "Orders";
DROP TABLE "Orders";
ALTER TABLE "new_Orders" RENAME TO "Orders";
CREATE UNIQUE INDEX "Orders_code_key" ON "Orders"("code");
CREATE TABLE "new_Historic" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "marketplaceId" TEXT NOT NULL,
    CONSTRAINT "Historic_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Historic_marketplaceId_fkey" FOREIGN KEY ("marketplaceId") REFERENCES "markets-place" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Historic" ("id", "marketplaceId", "userId") SELECT "id", "marketplaceId", "userId" FROM "Historic";
DROP TABLE "Historic";
ALTER TABLE "new_Historic" RENAME TO "Historic";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
