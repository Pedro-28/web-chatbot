/*
  Warnings:

  - Added the required column `date` to the `Chat` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Chat" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "shortName" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "isOptionsDisabled" BOOLEAN NOT NULL,
    "referenceLink" TEXT,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "Chat_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Chat" ("content", "id", "imageUrl", "isOptionsDisabled", "name", "referenceLink", "shortName", "user_id") SELECT "content", "id", "imageUrl", "isOptionsDisabled", "name", "referenceLink", "shortName", "user_id" FROM "Chat";
DROP TABLE "Chat";
ALTER TABLE "new_Chat" RENAME TO "Chat";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
