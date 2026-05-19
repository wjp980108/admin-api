-- CreateTable
CREATE TABLE `meuns` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `parentId` INTEGER NOT NULL DEFAULT 0,
    `name` VARCHAR(191) NOT NULL,
    `path` VARCHAR(191) NOT NULL,
    `routeName` VARCHAR(191) NOT NULL,
    `componentPath` VARCHAR(191) NULL,
    `icon` VARCHAR(191) NULL,
    `sort` INTEGER NOT NULL DEFAULT 0,
    `type` INTEGER NOT NULL,
    `perm` VARCHAR(191) NULL,
    `keepAlive` BOOLEAN NOT NULL DEFAULT false,
    `activeMenu` BOOLEAN NOT NULL DEFAULT false,
    `hideInMenu` BOOLEAN NOT NULL DEFAULT false,
    `hideInTag` BOOLEAN NOT NULL DEFAULT false,
    `hideParent` BOOLEAN NOT NULL DEFAULT false,
    `status` BOOLEAN NOT NULL DEFAULT true,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL,

    UNIQUE INDEX `meuns_parentId_name_key`(`parentId`, `name`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
