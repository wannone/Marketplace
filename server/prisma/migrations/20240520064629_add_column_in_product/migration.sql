/*
  Warnings:

  - Added the required column `image_url` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `product` ADD COLUMN `image_url` VARCHAR(191) NOT NULL,
    ADD COLUMN `quantity` INTEGER NOT NULL;
