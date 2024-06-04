-- CreateTable
CREATE TABLE "_FavoriteToProduct" (
    "A" TEXT NOT NULL,
    "B" TEXT NOT NULL,
    CONSTRAINT "_FavoriteToProduct_A_fkey" FOREIGN KEY ("A") REFERENCES "Favorite" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "_FavoriteToProduct_B_fkey" FOREIGN KEY ("B") REFERENCES "Product" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "_FavoriteToProduct_AB_unique" ON "_FavoriteToProduct"("A", "B");

-- CreateIndex
CREATE INDEX "_FavoriteToProduct_B_index" ON "_FavoriteToProduct"("B");
