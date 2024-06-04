/*
  Warnings:

  - You are about to drop the column `firstName` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `lastName` on the `Users` table. All the data in the column will be lost.
  - You are about to drop the column `salt` on the `Users` table. All the data in the column will be lost.
  - Added the required column `username` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Notes` MODIFY `content` VARCHAR(65535) NOT NULL;

-- AlterTable
ALTER TABLE `Users` DROP COLUMN `firstName`,
    DROP COLUMN `lastName`,
    DROP COLUMN `salt`,
    ADD COLUMN `username` VARCHAR(191) NOT NULL;
