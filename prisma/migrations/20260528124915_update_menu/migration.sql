/*
  Warnings:

  - You are about to alter the column `activeMenu` on the `meuns` table. The data in that column could be lost. The data in that column will be cast from `TinyInt` to `VarChar(191)`.

*/
-- AlterTable
ALTER TABLE `meuns` MODIFY `activeMenu` VARCHAR(191) NULL;
