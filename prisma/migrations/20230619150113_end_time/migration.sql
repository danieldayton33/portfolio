-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Contraction" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "length" INTEGER NOT NULL,
    "song" TEXT,
    "startTime" DATETIME NOT NULL,
    "endTime" DATETIME,
    "isRunning" BOOLEAN NOT NULL,
    "notes" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "birthId" INTEGER NOT NULL,
    CONSTRAINT "Contraction_birthId_fkey" FOREIGN KEY ("birthId") REFERENCES "Birth" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Contraction" ("birthId", "createdAt", "endTime", "id", "isRunning", "length", "notes", "song", "startTime", "updatedAt") SELECT "birthId", "createdAt", "endTime", "id", "isRunning", "length", "notes", "song", "startTime", "updatedAt" FROM "Contraction";
DROP TABLE "Contraction";
ALTER TABLE "new_Contraction" RENAME TO "Contraction";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
