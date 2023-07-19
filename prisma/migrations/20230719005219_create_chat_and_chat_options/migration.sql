-- CreateTable
CREATE TABLE "Chat" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "shortName" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "isOptionsDisabled" BOOLEAN NOT NULL,
    "referenceLink" TEXT,
    "user_id" TEXT NOT NULL,
    CONSTRAINT "Chat_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "ChatOptions" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "option" TEXT NOT NULL,
    "optionResponse" TEXT NOT NULL,
    "referenceLink" TEXT NOT NULL,
    "chat_id" TEXT NOT NULL,
    CONSTRAINT "ChatOptions_chat_id_fkey" FOREIGN KEY ("chat_id") REFERENCES "Chat" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
