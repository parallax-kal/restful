/*
  Warnings:

  - You are about to alter the column `fullname` on the `Employee` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.

*/
-- AlterTable
ALTER TABLE "Employee" ALTER COLUMN "fullname" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "nationalId" SET DATA TYPE VARCHAR(255);
