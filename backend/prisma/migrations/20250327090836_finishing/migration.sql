-- CreateTable
CREATE TABLE "FinishingEntry" (
    "id" SERIAL NOT NULL,
    "fMachine" TEXT NOT NULL,
    "fDate" TEXT NOT NULL,
    "fShift" TEXT NOT NULL,
    "fSupervisor" TEXT NOT NULL,
    "fOperator" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "FinishingEntry_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductionDetail" (
    "id" SERIAL NOT NULL,
    "fSNo" INTEGER NOT NULL,
    "fProdType" TEXT NOT NULL,
    "fProcess" TEXT NOT NULL,
    "fWeight" TEXT NOT NULL,
    "fRemarks" TEXT NOT NULL,
    "finishingEntryId" INTEGER NOT NULL,

    CONSTRAINT "ProductionDetail_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "ProductionDetail" ADD CONSTRAINT "ProductionDetail_finishingEntryId_fkey" FOREIGN KEY ("finishingEntryId") REFERENCES "FinishingEntry"("id") ON DELETE CASCADE ON UPDATE CASCADE;
