-- CreateTable
CREATE TABLE "Favorits" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" INTEGER,
    CONSTRAINT "Favorits_userId_fkey" FOREIGN KEY ("userId") REFERENCES "users" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
