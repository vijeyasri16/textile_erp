-- CreateTable
CREATE TABLE "DyeingPlanning" (
    "id" SERIAL NOT NULL,
    "dlJobNo" TEXT NOT NULL,
    "dlRev" TEXT,
    "dlDate" TIMESTAMP(3),
    "dlCardWeight" TEXT,
    "dlMachine" TEXT,
    "dlFabric" TEXT,
    "dlColour" TEXT,
    "dlOldBatchNo" TEXT,
    "dlCRCode" TEXT,
    "dlCRDate" TIMESTAMP(3),
    "dlLRCode" TEXT,
    "dlLRDate" TIMESTAMP(3),
    "dlLRIndep" TEXT,
    "dlLRIndepDate" TIMESTAMP(3),
    "dlRemarks" TEXT,
    "dlColourIdentification" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DyeingPlanning_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DyeingPlanningStage" (
    "id" SERIAL NOT NULL,
    "dlStage" TEXT,
    "dlMLR" TEXT,
    "dlTLiquor" TEXT,
    "dyeingPlanningId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DyeingPlanningStage_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DyeingPlanningItem" (
    "id" SERIAL NOT NULL,
    "dlStage" TEXT,
    "dlItemName" TEXT,
    "dlValue" TEXT,
    "dlGPLPercentage" TEXT,
    "dlWeight" TEXT,
    "dyeingPlanningId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "DyeingPlanningItem_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "DyeingPlanningStage" ADD CONSTRAINT "DyeingPlanningStage_dyeingPlanningId_fkey" FOREIGN KEY ("dyeingPlanningId") REFERENCES "DyeingPlanning"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "DyeingPlanningItem" ADD CONSTRAINT "DyeingPlanningItem_dyeingPlanningId_fkey" FOREIGN KEY ("dyeingPlanningId") REFERENCES "DyeingPlanning"("id") ON DELETE CASCADE ON UPDATE CASCADE;
