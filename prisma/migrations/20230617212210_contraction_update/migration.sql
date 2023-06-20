/*
  Warnings:

  - You are about to drop the column `date` on the `Contraction` table. All the data in the column will be lost.
  - Added the required column `endTime` to the `Contraction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `isRunning` to the `Contraction` table without a default value. This is not possible if the table is not empty.
  - Added the required column `startTime` to the `Contraction` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Contraction" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "length" INTEGER NOT NULL,
    "song" TEXT,
    "startTime" DATETIME NOT NULL,
    "endTime" DATETIME NOT NULL,
    "isRunning" BOOLEAN NOT NULL,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "birthId" INTEGER NOT NULL,
    CONSTRAINT "Contraction_birthId_fkey" FOREIGN KEY ("birthId") REFERENCES "Birth" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Contraction" ("birthId", "createdAt", "id", "length", "song", "updatedAt") SELECT "birthId", "createdAt", "id", "length", "song", "updatedAt" FROM "Contraction";
DROP TABLE "Contraction";
ALTER TABLE "new_Contraction" RENAME TO "Contraction";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
