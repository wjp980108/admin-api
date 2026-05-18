/*
  Warnings:

  - You are about to drop the column `name` on the `users` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX `users_phone_key` ON `users`;

-- AlterTable
ALTER TABLE `users` DROP COLUMN `name`,
    ADD COLUMN `nickname` VARCHAR(191) NULL,
    ADD COLUMN `status` BOOLEAN NOT NULL DEFAULT true,
    MODIFY `phone` VARCHAR(191) NULL,
    MODIFY `avatar` VARCHAR(191) NULL,
    MODIFY `email` VARCHAR(191) NULL;
