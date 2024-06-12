/*
  Warnings:

  - You are about to drop the column `historicId` on the `Orders` table. All the data in the column will be lost.

*/
-- CreateTable
CREATE TABLE "_HistoricToOrders" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_HistoricToOrders_A_fkey" FOREIGN KEY ("A") REFERENCES "Historic" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_HistoricToOrders_B_fkey" FOREIGN KEY ("B") REFERENCES "Orders" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Orders" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "status" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "created_at" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_Orders" ("code", "created_at", "details", "id", "status") SELECT "code", "created_at", "details", "id", "status" FROM "Orders";
DROP TABLE "Orders";
ALTER TABLE "new_Orders" RENAME TO "Orders";
CREATE UNIQUE INDEX "Orders_code_key" ON "Orders"("code");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- CreateIndex
CREATE UNIQUE INDEX "_HistoricToOrders_AB_unique" ON "_HistoricToOrders"("A", "B");

-- CreateIndex
CREATE INDEX "_HistoricToOrders_B_index" ON "_HistoricToOrders"("B");
