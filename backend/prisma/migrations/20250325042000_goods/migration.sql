-- CreateTable
CREATE TABLE "RawMaterial" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "quantity" DOUBLE PRECISION NOT NULL,
    "unitOfMeasure" TEXT NOT NULL,

    CONSTRAINT "RawMaterial_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GoodsInwards" (
    "id" TEXT NOT NULL,
    "gInwNo" TEXT NOT NULL,
    "gDate" TIMESTAMP(3) NOT NULL,
    "gCustomer" TEXT NOT NULL,
    "gCategory" TEXT NOT NULL,
    "gType" TEXT NOT NULL,
    "gLabApproved" BOOLEAN NOT NULL DEFAULT false,
    "gCustDCNo" TEXT,
    "gCustDCDate" TIMESTAMP(3),
    "gCustOrdNo" TEXT,
    "gVehNo" TEXT,
    "gStyleRefNo" TEXT,
    "gGreigeMarkingID" TEXT,
    "gMarketingBy" TEXT,
    "gPreparedBy" TEXT,
    "gCustOrdIncharge" TEXT,
    "gOldDONo" TEXT,
    "gMajorFabric" TEXT,
    "gLabNo" TEXT,
    "gNarration" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "GoodsInwards_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GoodsInwardsFabric" (
    "id" TEXT NOT NULL,
    "gSNo" INTEGER NOT NULL,
    "gFabric" TEXT NOT NULL,
    "gColor" TEXT,
    "gGreigeGSM" TEXT,
    "gGreigeDIA" TEXT,
    "gFinishRolls" TEXT,
    "gWeight" TEXT,
    "gMachine" TEXT,
    "goodsInwardsId" TEXT NOT NULL,

    CONSTRAINT "GoodsInwardsFabric_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GoodsInwardsProcess" (
    "id" TEXT NOT NULL,
    "gSNo" INTEGER NOT NULL,
    "gProcess" TEXT NOT NULL,
    "goodsInwardsId" TEXT NOT NULL,

    CONSTRAINT "GoodsInwardsProcess_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "GoodsInwards_gInwNo_key" ON "GoodsInwards"("gInwNo");

-- CreateIndex
CREATE UNIQUE INDEX "GoodsInwardsFabric_goodsInwardsId_gSNo_key" ON "GoodsInwardsFabric"("goodsInwardsId", "gSNo");

-- CreateIndex
CREATE UNIQUE INDEX "GoodsInwardsProcess_goodsInwardsId_gSNo_key" ON "GoodsInwardsProcess"("goodsInwardsId", "gSNo");

-- AddForeignKey
ALTER TABLE "GoodsInwardsFabric" ADD CONSTRAINT "GoodsInwardsFabric_goodsInwardsId_fkey" FOREIGN KEY ("goodsInwardsId") REFERENCES "GoodsInwards"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GoodsInwardsProcess" ADD CONSTRAINT "GoodsInwardsProcess_goodsInwardsId_fkey" FOREIGN KEY ("goodsInwardsId") REFERENCES "GoodsInwards"("id") ON DELETE CASCADE ON UPDATE CASCADE;
