/*
  Warnings:

  - You are about to drop the column `email` on the `Laptop` table. All the data in the column will be lost.
  - Added the required column `brand` to the `Laptop` table without a default value. This is not possible if the table is not empty.
  - Added the required column `model` to the `Laptop` table without a default value. This is not possible if the table is not empty.
  - Added the required column `name` to the `Laptop` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Laptop_email_key";

-- AlterTable
ALTER TABLE "Laptop" DROP COLUMN "email",
ADD COLUMN     "brand" VARCHAR(255) NOT NULL,
ADD COLUMN     "model" VARCHAR(255) NOT NULL,
ADD COLUMN     "name" VARCHAR(255) NOT NULL;
