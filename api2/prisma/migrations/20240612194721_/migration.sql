/*
  Warnings:

  - A unique constraint covering the columns `[historicId,code]` on the table `Orders` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Orders_historicId_code_key" ON "Orders"("historicId", "code");
