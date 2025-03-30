/*
  Warnings:

  - You are about to drop the `BillPaymentHistory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CollectionItem` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "CollectionItem" DROP CONSTRAINT "CollectionItem_collectionId_fkey";

-- AlterTable
ALTER TABLE "Collection" ALTER COLUMN "cUnAdjustAmt" SET DEFAULT 0;

-- DropTable
DROP TABLE "BillPaymentHistory";

-- DropTable
DROP TABLE "CollectionItem";

-- CreateTable
CREATE TABLE "CollectionDetail" (
    "id" SERIAL NOT NULL,
    "collectionId" INTEGER NOT NULL,
    "cSNo" INTEGER NOT NULL,
    "cBillNo" TEXT NOT NULL,
    "cBillAmount" DOUBLE PRECISION NOT NULL,
    "cPrevCollected" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "cPrevBalance" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "cCurAmount" DOUBLE PRECISION NOT NULL,
    "cCurBalance" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CollectionDetail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CollectionDetail_cBillNo_idx" ON "CollectionDetail"("cBillNo");

-- CreateIndex
CREATE UNIQUE INDEX "CollectionDetail_collectionId_cSNo_key" ON "CollectionDetail"("collectionId", "cSNo");

-- AddForeignKey
ALTER TABLE "CollectionDetail" ADD CONSTRAINT "CollectionDetail_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE CASCADE ON UPDATE CASCADE;
