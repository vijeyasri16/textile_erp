/*
  Warnings:

  - You are about to drop the `DyeingPlanning` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DyeingPlanningItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `DyeingPlanningStage` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "DyeingPlanningItem" DROP CONSTRAINT "DyeingPlanningItem_dyeingPlanningId_fkey";

-- DropForeignKey
ALTER TABLE "DyeingPlanningStage" DROP CONSTRAINT "DyeingPlanningStage_dyeingPlanningId_fkey";

-- DropTable
DROP TABLE "DyeingPlanning";

-- DropTable
DROP TABLE "DyeingPlanningItem";

-- DropTable
DROP TABLE "DyeingPlanningStage";

-- CreateTable
CREATE TABLE "dyeingPlanning" (
    "id" SERIAL NOT NULL,
    "dlJobNo" TEXT NOT NULL,
    "dlRev" TEXT,
    "dlDate" TIMESTAMP(3) NOT NULL,
    "dlCardWeight" TEXT,
    "dlMachine" TEXT,
    "dlFabric" TEXT,
    "dlColour" TEXT,
    "dlOldBatchNo" TEXT,
    "dlCRCode" TEXT,
    "dlCRDate" TIMESTAMP(3) NOT NULL,
    "dlLRCode" TEXT,
    "dlLRDate" TIMESTAMP(3) NOT NULL,
    "dlLRIndep" TEXT,
    "dlLRIndepDate" TIMESTAMP(3) NOT NULL,
    "dlRemarks" TEXT,
    "dlColourIdentification" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "dyeingPlanning_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dyeingPlanningStage" (
    "id" SERIAL NOT NULL,
    "dlStage" TEXT,
    "dlMLR" TEXT,
    "dlTLiquor" TEXT,
    "dyeingPlanningId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "dyeingPlanningStage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "dyeingPlanningItem" (
    "id" SERIAL NOT NULL,
    "dlStage" TEXT,
    "dlItemName" TEXT,
    "dlValue" TEXT,
    "dlGPLPercentage" TEXT,
    "dlWeight" TEXT,
    "dyeingPlanningId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "dyeingPlanningItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "dyeingPlanningStage" ADD CONSTRAINT "dyeingPlanningStage_dyeingPlanningId_fkey" FOREIGN KEY ("dyeingPlanningId") REFERENCES "dyeingPlanning"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "dyeingPlanningItem" ADD CONSTRAINT "dyeingPlanningItem_dyeingPlanningId_fkey" FOREIGN KEY ("dyeingPlanningId") REFERENCES "dyeingPlanning"("id") ON DELETE CASCADE ON UPDATE CASCADE;
