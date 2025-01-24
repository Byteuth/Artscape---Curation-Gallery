/*
  Warnings:

  - Added the required column `objectId` to the `Artwork` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Artwork" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "objectId" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "images" TEXT NOT NULL,
    "description" TEXT,
    "source" TEXT,
    "medium" TEXT,
    "period" TEXT,
    "country" TEXT,
    "department" TEXT,
    "creditLine" TEXT,
    "objectDate" TEXT,
    "objectURL" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Artwork" ("createdAt", "description", "id", "images", "title", "updatedAt") SELECT "createdAt", "description", "id", "images", "title", "updatedAt" FROM "Artwork";
DROP TABLE "Artwork";
ALTER TABLE "new_Artwork" RENAME TO "Artwork";
CREATE UNIQUE INDEX "Artwork_objectId_key" ON "Artwork"("objectId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
