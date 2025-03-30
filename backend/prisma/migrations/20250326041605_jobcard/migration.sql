-- CreateTable
CREATE TABLE "JobCard" (
    "id" SERIAL NOT NULL,
    "jcDate" TEXT NOT NULL,
    "jcShift" TEXT,
    "jcLoadTime" TEXT,
    "jcUnloadTime" TEXT,
    "jcIdleHours" TEXT,
    "jcRunHours" TEXT,
    "jcRopeLength" TEXT,
    "jcSpeed" TEXT,
    "jcPreTreatment" TEXT,
    "jcDyeBath" TEXT,
    "jcDyes" TEXT,
    "jcAlkali" TEXT,
    "jcAfterTreatment" TEXT,
    "jcSLDate" TEXT,
    "jcCustomer" TEXT NOT NULL,
    "jcColour" TEXT,
    "jcBatchNo" TEXT NOT NULL,
    "jcLotNo" TEXT,
    "jcFRNNo" TEXT,
    "jcMachineNo" TEXT,
    "jcCustomerDCNo" TEXT,
    "jcWeight" TEXT,
    "jcMLR" TEXT,
    "jcRoll" TEXT,
    "jcFabricType" TEXT,
    "jcLabNo" TEXT,
    "jcGSM" TEXT,
    "jcScourBathPH" TEXT,
    "jcResH2O2" TEXT,
    "jcStartBathPH" TEXT,
    "jcAlkaliBathPH" TEXT,
    "jcSoapingPH" TEXT,
    "jcDyeFixingPH" TEXT,
    "jcFinalBathPH" TEXT,
    "jcDyeStartVolume" TEXT,
    "jcDosageVolume" TEXT,
    "jcJobCardCompletion" BOOLEAN NOT NULL DEFAULT false,
    "jcJobCardIssued" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "JobCard_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "PreTreatmentDetail" (
    "id" SERIAL NOT NULL,
    "jcSNo" INTEGER NOT NULL,
    "jcPretreatment" TEXT,
    "jcItem" TEXT,
    "jcRequiredQty" TEXT,
    "jcTemperature" TEXT,
    "jcTime" TEXT,
    "jcStartTime" TEXT,
    "jcFinishTime" TEXT,
    "jcDosingAndSteamTime" TEXT,
    "jobCardId" INTEGER NOT NULL,

    CONSTRAINT "PreTreatmentDetail_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "PreTreatmentDetail" ADD CONSTRAINT "PreTreatmentDetail_jobCardId_fkey" FOREIGN KEY ("jobCardId") REFERENCES "JobCard"("id") ON DELETE CASCADE ON UPDATE CASCADE;
