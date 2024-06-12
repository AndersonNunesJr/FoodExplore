/*
  Warnings:

  - A unique constraint covering the columns `[userId,marketplaceId]` on the table `Historic` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Historic_userId_marketplaceId_key" ON "Historic"("userId", "marketplaceId");
