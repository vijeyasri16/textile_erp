/*
  Warnings:

  - The primary key for the `GoodsInwards` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `GoodsInwards` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `GoodsInwardsFabric` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `GoodsInwardsFabric` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The primary key for the `GoodsInwardsProcess` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `GoodsInwardsProcess` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Changed the type of `goodsInwardsId` on the `GoodsInwardsFabric` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `goodsInwardsId` on the `GoodsInwardsProcess` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "GoodsInwardsFabric" DROP CONSTRAINT "GoodsInwardsFabric_goodsInwardsId_fkey";

-- DropForeignKey
ALTER TABLE "GoodsInwardsProcess" DROP CONSTRAINT "GoodsInwardsProcess_goodsInwardsId_fkey";

-- AlterTable
ALTER TABLE "GoodsInwards" DROP CONSTRAINT "GoodsInwards_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "GoodsInwards_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "GoodsInwardsFabric" DROP CONSTRAINT "GoodsInwardsFabric_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "goodsInwardsId",
ADD COLUMN     "goodsInwardsId" INTEGER NOT NULL,
ADD CONSTRAINT "GoodsInwardsFabric_pkey" PRIMARY KEY ("id");

-- AlterTable
ALTER TABLE "GoodsInwardsProcess" DROP CONSTRAINT "GoodsInwardsProcess_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
DROP COLUMN "goodsInwardsId",
ADD COLUMN     "goodsInwardsId" INTEGER NOT NULL,
ADD CONSTRAINT "GoodsInwardsProcess_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE UNIQUE INDEX "GoodsInwardsFabric_goodsInwardsId_gSNo_key" ON "GoodsInwardsFabric"("goodsInwardsId", "gSNo");

-- CreateIndex
CREATE UNIQUE INDEX "GoodsInwardsProcess_goodsInwardsId_gSNo_key" ON "GoodsInwardsProcess"("goodsInwardsId", "gSNo");

-- AddForeignKey
ALTER TABLE "GoodsInwardsFabric" ADD CONSTRAINT "GoodsInwardsFabric_goodsInwardsId_fkey" FOREIGN KEY ("goodsInwardsId") REFERENCES "GoodsInwards"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodsInwardsProcess" ADD CONSTRAINT "GoodsInwardsProcess_goodsInwardsId_fkey" FOREIGN KEY ("goodsInwardsId") REFERENCES "GoodsInwards"("id") ON DELETE CASCADE ON UPDATE CASCADE;
