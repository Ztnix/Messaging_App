/*
  Warnings:

  - You are about to drop the column `content` on the `Chat` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Chat` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Chat_title_key";

-- AlterTable
ALTER TABLE "Chat" DROP COLUMN "content",
DROP COLUMN "title";
