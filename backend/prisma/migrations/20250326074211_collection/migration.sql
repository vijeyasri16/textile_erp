-- CreateTable
CREATE TABLE "Collection" (
    "id" SERIAL NOT NULL,
    "cVNo" TEXT NOT NULL,
    "cDate" TIMESTAMP(3) NOT NULL,
    "cReference" TEXT,
    "cCustomer" TEXT NOT NULL,
    "cPaymentMode" TEXT NOT NULL,
    "cCashAmount" DOUBLE PRECISION,
    "cChequeNo" TEXT,
    "cChequeIssueDate" TIMESTAMP(3),
    "cChequeBankDetails" TEXT,
    "cChequeAmount" DOUBLE PRECISION,
    "cNEFTTransactionId" TEXT,
    "cNEFTTransferDate" TIMESTAMP(3),
    "cNEFTBankDetails" TEXT,
    "cNEFTAmount" DOUBLE PRECISION,
    "cDDNo" TEXT,
    "cDDIssueDate" TIMESTAMP(3),
    "cDDBankDetails" TEXT,
    "cDDAmount" DOUBLE PRECISION,
    "cUnAdjustAmt" DOUBLE PRECISION,
    "cNarration" TEXT,
    "cTotalAmount" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Collection_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CollectionItem" (
    "id" SERIAL NOT NULL,
    "cSNo" INTEGER NOT NULL,
    "cBillNo" TEXT NOT NULL,
    "cBillAmount" DOUBLE PRECISION NOT NULL,
    "cPrevCollected" DOUBLE PRECISION NOT NULL,
    "cPrevBalance" DOUBLE PRECISION NOT NULL,
    "cCurAmount" DOUBLE PRECISION NOT NULL,
    "cCurBalance" DOUBLE PRECISION NOT NULL,
    "collectionId" INTEGER NOT NULL,

    CONSTRAINT "CollectionItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Bill" (
    "id" SERIAL NOT NULL,
    "billNo" TEXT NOT NULL,
    "billAmount" DOUBLE PRECISION NOT NULL,
    "prevCollected" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "prevBalance" DOUBLE PRECISION NOT NULL DEFAULT 0,
    "customer" TEXT NOT NULL,
    "billDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Bill_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Collection_cVNo_key" ON "Collection"("cVNo");

-- CreateIndex
CREATE UNIQUE INDEX "CollectionItem_collectionId_cSNo_key" ON "CollectionItem"("collectionId", "cSNo");

-- CreateIndex
CREATE UNIQUE INDEX "Bill_billNo_key" ON "Bill"("billNo");

-- AddForeignKey
ALTER TABLE "CollectionItem" ADD CONSTRAINT "CollectionItem_collectionId_fkey" FOREIGN KEY ("collectionId") REFERENCES "Collection"("id") ON DELETE CASCADE ON UPDATE CASCADE;
