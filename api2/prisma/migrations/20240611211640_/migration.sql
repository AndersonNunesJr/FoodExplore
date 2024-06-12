-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Historic" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "marketplaceId" TEXT,
    CONSTRAINT "Historic_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Historic_marketplaceId_fkey" FOREIGN KEY ("marketplaceId") REFERENCES "markets-place" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Historic" ("id", "userId") SELECT "id", "userId" FROM "Historic";
DROP TABLE "Historic";
ALTER TABLE "new_Historic" RENAME TO "Historic";
CREATE UNIQUE INDEX "Historic_userId_key" ON "Historic"("userId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
