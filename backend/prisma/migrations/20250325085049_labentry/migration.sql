/*
  Warnings:

  - The primary key for the `GoodsInwards` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `GoodsInwardsFabric` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The primary key for the `GoodsInwardsProcess` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
-- DropForeignKey
ALTER TABLE "GoodsInwardsFabric" DROP CONSTRAINT "GoodsInwardsFabric_goodsInwardsId_fkey";

-- DropForeignKey
ALTER TABLE "GoodsInwardsProcess" DROP CONSTRAINT "GoodsInwardsProcess_goodsInwardsId_fkey";

-- AlterTable
ALTER TABLE "GoodsInwards" DROP CONSTRAINT "GoodsInwards_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ADD CONSTRAINT "GoodsInwards_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "GoodsInwards_id_seq";

-- AlterTable
ALTER TABLE "GoodsInwardsFabric" DROP CONSTRAINT "GoodsInwardsFabric_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "goodsInwardsId" SET DATA TYPE TEXT,
ADD CONSTRAINT "GoodsInwardsFabric_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "GoodsInwardsFabric_id_seq";

-- AlterTable
ALTER TABLE "GoodsInwardsProcess" DROP CONSTRAINT "GoodsInwardsProcess_pkey",
ALTER COLUMN "id" DROP DEFAULT,
ALTER COLUMN "id" SET DATA TYPE TEXT,
ALTER COLUMN "goodsInwardsId" SET DATA TYPE TEXT,
ADD CONSTRAINT "GoodsInwardsProcess_pkey" PRIMARY KEY ("id");
DROP SEQUENCE "GoodsInwardsProcess_id_seq";

-- CreateTable
CREATE TABLE "LabEntry" (
    "id" SERIAL NOT NULL,
    "lLabNo" TEXT NOT NULL,
    "lDate" TIMESTAMP(3) NOT NULL,
    "lReference" TEXT NOT NULL,
    "lContactPerson" TEXT NOT NULL,
    "lCustomer" TEXT NOT NULL,
    "lCancelled" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LabEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "LabDetailItem" (
    "id" SERIAL NOT NULL,
    "lSNo" INTEGER NOT NULL,
    "lColour" TEXT NOT NULL,
    "lPantoneNo" TEXT NOT NULL,
    "lJobNo" TEXT NOT NULL,
    "lFabricLight" TEXT NOT NULL,
    "lFastness" TEXT NOT NULL,
    "lApprovalBy" TEXT NOT NULL,
    "lRemarks" TEXT NOT NULL,
    "labEntryId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LabDetailItem_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LabEntry_lLabNo_key" ON "LabEntry"("lLabNo");

-- CreateIndex
CREATE UNIQUE INDEX "LabDetailItem_labEntryId_lSNo_key" ON "LabDetailItem"("labEntryId", "lSNo");

-- AddForeignKey
ALTER TABLE "GoodsInwardsFabric" ADD CONSTRAINT "GoodsInwardsFabric_goodsInwardsId_fkey" FOREIGN KEY ("goodsInwardsId") REFERENCES "GoodsInwards"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodsInwardsProcess" ADD CONSTRAINT "GoodsInwardsProcess_goodsInwardsId_fkey" FOREIGN KEY ("goodsInwardsId") REFERENCES "GoodsInwards"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "LabDetailItem" ADD CONSTRAINT "LabDetailItem_labEntryId_fkey" FOREIGN KEY ("labEntryId") REFERENCES "LabEntry"("id") ON DELETE CASCADE ON UPDATE CASCADE;
