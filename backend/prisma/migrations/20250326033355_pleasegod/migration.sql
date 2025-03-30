/*
  Warnings:

  - You are about to drop the `dyeingPlanning` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `dyeingPlanningItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `dyeingPlanningStage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "dyeingPlanningItem" DROP CONSTRAINT "dyeingPlanningItem_dyeingPlanningId_fkey";

-- DropForeignKey
ALTER TABLE "dyeingPlanningStage" DROP CONSTRAINT "dyeingPlanningStage_dyeingPlanningId_fkey";

-- DropTable
DROP TABLE "dyeingPlanning";

-- DropTable
DROP TABLE "dyeingPlanningItem";

-- DropTable
DROP TABLE "dyeingPlanningStage";

-- CreateTable
CREATE TABLE "DyeingPlanning" (
    "id" SERIAL NOT NULL,
    "dlJobNo" TEXT NOT NULL,
    "dlRev" TEXT NOT NULL,
    "dlDate" TEXT NOT NULL,
    "dlCardWeight" TEXT NOT NULL,
    "dlMachine" TEXT NOT NULL,
    "dlFabric" TEXT NOT NULL,
    "dlColour" TEXT NOT NULL,
    "dlOldBatchNo" TEXT NOT NULL,
    "dlCRCode" TEXT NOT NULL,
    "dlCRDate" TEXT NOT NULL,
    "dlLRCode" TEXT NOT NULL,
    "dlLRDate" TEXT NOT NULL,
    "dlLRIndep" TEXT NOT NULL,
    "dlLRIndepDate" TEXT NOT NULL,
    "dlRemarks" TEXT NOT NULL,
    "dlColourIdentification" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DyeingPlanning_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DyeingPlanningStage" (
    "id" SERIAL NOT NULL,
    "dlSNo" INTEGER NOT NULL,
    "dlStage" TEXT NOT NULL,
    "dlMLR" TEXT NOT NULL,
    "dlTLiquor" TEXT NOT NULL,
    "dyeingPlanningId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DyeingPlanningStage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DyeingPlanningItem" (
    "id" SERIAL NOT NULL,
    "dlSNo" INTEGER NOT NULL,
    "dlStage" TEXT NOT NULL,
    "dlItemName" TEXT NOT NULL,
    "dlValue" TEXT NOT NULL,
    "dlGPLPercentage" TEXT NOT NULL,
    "dlWeight" TEXT NOT NULL,
    "dyeingPlanningId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DyeingPlanningItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DyeingPlanningStage" ADD CONSTRAINT "DyeingPlanningStage_dyeingPlanningId_fkey" FOREIGN KEY ("dyeingPlanningId") REFERENCES "DyeingPlanning"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DyeingPlanningItem" ADD CONSTRAINT "DyeingPlanningItem_dyeingPlanningId_fkey" FOREIGN KEY ("dyeingPlanningId") REFERENCES "DyeingPlanning"("id") ON DELETE CASCADE ON UPDATE CASCADE;
