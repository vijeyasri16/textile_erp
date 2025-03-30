-- CreateTable
CREATE TABLE "Delivery" (
    "id" SERIAL NOT NULL,
    "dlVNo" TEXT NOT NULL,
    "dlDate" TIMESTAMP(3) NOT NULL,
    "dlReferenceType" TEXT NOT NULL,
    "dlCustomer" TEXT NOT NULL,
    "dlDeliveryTo" TEXT NOT NULL,
    "dlJobNo" TEXT NOT NULL,
    "dlGreigeWeight" TEXT NOT NULL,
    "dlBillingName" TEXT,
    "dlNarration" TEXT,
    "dlAppxVal" TEXT,
    "dlFormJJNo" TEXT,
    "dlWhoseVehicle" TEXT,
    "dlVehicleNum" TEXT,
    "dlDriverName" TEXT,
    "dlStyleNo" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Delivery_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "DeliveryDetail" (
    "id" SERIAL NOT NULL,
    "dlSNo" INTEGER NOT NULL,
    "dlInwNo" TEXT,
    "dlCustOrdNo" TEXT,
    "dlCustDCNo" TEXT,
    "dlFabric" TEXT,
    "dlColor" TEXT,
    "dlGreigeDia" TEXT,
    "dlFinishRolls" TEXT,
    "dlWeight" TEXT,
    "dlProcess" TEXT,
    "dlGreigeWeightLoss" TEXT,
    "deliveryId" INTEGER NOT NULL,

    CONSTRAINT "DeliveryDetail_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Delivery_dlVNo_key" ON "Delivery"("dlVNo");

-- CreateIndex
CREATE UNIQUE INDEX "DeliveryDetail_deliveryId_dlSNo_key" ON "DeliveryDetail"("deliveryId", "dlSNo");

-- AddForeignKey
ALTER TABLE "DeliveryDetail" ADD CONSTRAINT "DeliveryDetail_deliveryId_fkey" FOREIGN KEY ("deliveryId") REFERENCES "Delivery"("id") ON DELETE CASCADE ON UPDATE CASCADE;
