/*
  Warnings:

  - You are about to drop the column `address` on the `Supplier` table. All the data in the column will be lost.
  - You are about to drop the column `contact` on the `Supplier` table. All the data in the column will be lost.
  - Added the required column `phone` to the `Supplier` table without a default value. This is not possible if the table is not empty.
  - Added the required column `supplierAddress` to the `Supplier` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Supplier" DROP COLUMN "address",
DROP COLUMN "contact",
ADD COLUMN     "phone" TEXT NOT NULL,
ADD COLUMN     "supplierAddress" TEXT NOT NULL;
