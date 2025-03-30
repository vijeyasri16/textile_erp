/*
  Warnings:

  - You are about to drop the `Bill` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `updatedAt` to the `CollectionItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CollectionItem" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ALTER COLUMN "cPrevCollected" SET DEFAULT 0,
ALTER COLUMN "cPrevBalance" SET DEFAULT 0;

-- DropTable
DROP TABLE "Bill";

-- CreateTable
CREATE TABLE "BillPaymentHistory" (
    "id" SERIAL NOT NULL,
    "billNo" TEXT NOT NULL,
    "totalAmount" DOUBLE PRECISION NOT NULL,
    "collectedAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "balanceAmount" DOUBLE PRECISION NOT NULL,
    "lastUpdated" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BillPaymentHistory_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BillPaymentHistory_billNo_key" ON "BillPaymentHistory"("billNo");
