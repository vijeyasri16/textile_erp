import prisma from "../config/db.js"

export const CollectionModel = {
  // Get all collections
  getAllCollections: async () => {
    return await prisma.collection.findMany({
      orderBy: {
        cDate: "desc",
      },
    })
  },

  // Get a single collection by ID
  getCollection: async (id) => {
    try {
      const collection = await prisma.collection.findUnique({
        where: { id: Number(id) }, // Ensure id is converted to a number
        include: {
          collectionDetails: {
            orderBy: {
              cSNo: "asc",
            },
          },
        },
      })

      // If collection exists but has no details, provide an empty array
      if (collection && !collection.collectionDetails) {
        collection.collectionDetails = []
      }

      // Map collectionDetails to collectionItems for frontend compatibility
      if (collection) {
        collection.collectionItems = collection.collectionDetails || []
      }

      return collection
    } catch (error) {
      console.error("Error in getCollection:", error)
      throw error
    }
  },

  // Create a new collection
  createCollection: async (collectionData) => {
    const { collectionItems, ...collectionMainData } = collectionData

    // Calculate total amount from collection items
    const totalAmount = collectionItems.reduce((sum, item) => {
      return sum + (Number.parseFloat(item.cCurAmount) || 0)
    }, 0)

    // Prepare data with proper types
    const preparedData = {
      cVNo: collectionMainData.cVNo,
      cDate: new Date(collectionMainData.cDate),
      cReference: collectionMainData.cReference || null,
      cCustomer: collectionMainData.cCustomer,
      cPaymentMode: collectionMainData.cPaymentMode,
      cTotalAmount: totalAmount,
      cUnAdjustAmt: collectionMainData.cUnAdjustAmt ? Number.parseFloat(collectionMainData.cUnAdjustAmt) : 0,
      cNarration: collectionMainData.cNarration || null,
    }

    // Add payment mode specific fields with proper types
    switch (collectionMainData.cPaymentMode) {
      case "cash":
        preparedData.cCashAmount = Number.parseFloat(collectionMainData.cCashAmount) || 0
        break
      case "cheque":
        preparedData.cChequeNo = collectionMainData.cChequeNo
        preparedData.cChequeIssueDate = collectionMainData.cChequeIssueDate
          ? new Date(collectionMainData.cChequeIssueDate)
          : null
        preparedData.cChequeBankDetails = collectionMainData.cChequeBankDetails || null
        preparedData.cChequeAmount = Number.parseFloat(collectionMainData.cChequeAmount) || 0
        break
      case "neft":
        preparedData.cNEFTTransactionId = collectionMainData.cNEFTTransactionId
        preparedData.cNEFTTransferDate = collectionMainData.cNEFTTransferDate
          ? new Date(collectionMainData.cNEFTTransferDate)
          : null
        preparedData.cNEFTBankDetails = collectionMainData.cNEFTBankDetails || null
        preparedData.cNEFTAmount = Number.parseFloat(collectionMainData.cNEFTAmount) || 0
        break
      case "dd":
        preparedData.cDDNo = collectionMainData.cDDNo
        preparedData.cDDIssueDate = collectionMainData.cDDIssueDate ? new Date(collectionMainData.cDDIssueDate) : null
        preparedData.cDDBankDetails = collectionMainData.cDDBankDetails || null
        preparedData.cDDAmount = Number.parseFloat(collectionMainData.cDDAmount) || 0
        break
    }

    // Create collection with nested details
    return await prisma.collection.create({
      data: {
        ...preparedData,
        collectionDetails: {
          create: collectionItems.map((item) => ({
            cSNo: Number.parseInt(item.cSNo),
            cBillNo: item.cBillNo,
            cBillAmount: Number.parseFloat(item.cBillAmount) || 0,
            cPrevCollected: Number.parseFloat(item.cPrevCollected) || 0,
            cPrevBalance: Number.parseFloat(item.cPrevBalance) || 0,
            cCurAmount: Number.parseFloat(item.cCurAmount) || 0,
            cCurBalance: Number.parseFloat(item.cCurBalance) || 0,
          })),
        },
      },
      include: {
        collectionDetails: true,
      },
    })
  },

  // Update an existing collection
  updateCollection: async (id, collectionData) => {
    const { collectionItems, ...collectionMainData } = collectionData

    // Calculate total amount from collection items
    const totalAmount = collectionItems.reduce((sum, item) => {
      return sum + (Number.parseFloat(item.cCurAmount) || 0)
    }, 0)

    // Prepare data with proper types
    const preparedData = {
      cVNo: collectionMainData.cVNo,
      cDate: new Date(collectionMainData.cDate),
      cReference: collectionMainData.cReference || null,
      cCustomer: collectionMainData.cCustomer,
      cPaymentMode: collectionMainData.cPaymentMode,
      cTotalAmount: totalAmount,
      cUnAdjustAmt: collectionMainData.cUnAdjustAmt ? Number.parseFloat(collectionMainData.cUnAdjustAmt) : 0,
      cNarration: collectionMainData.cNarration || null,
    }

    // Add payment mode specific fields with proper types
    switch (collectionMainData.cPaymentMode) {
      case "cash":
        preparedData.cCashAmount = Number.parseFloat(collectionMainData.cCashAmount) || 0
        // Clear other payment fields
        preparedData.cChequeNo = null
        preparedData.cChequeIssueDate = null
        preparedData.cChequeBankDetails = null
        preparedData.cChequeAmount = null
        preparedData.cNEFTTransactionId = null
        preparedData.cNEFTTransferDate = null
        preparedData.cNEFTBankDetails = null
        preparedData.cNEFTAmount = null
        preparedData.cDDNo = null
        preparedData.cDDIssueDate = null
        preparedData.cDDBankDetails = null
        preparedData.cDDAmount = null
        break
      case "cheque":
        preparedData.cChequeNo = collectionMainData.cChequeNo
        preparedData.cChequeIssueDate = collectionMainData.cChequeIssueDate
          ? new Date(collectionMainData.cChequeIssueDate)
          : null
        preparedData.cChequeBankDetails = collectionMainData.cChequeBankDetails || null
        preparedData.cChequeAmount = Number.parseFloat(collectionMainData.cChequeAmount) || 0
        // Clear other payment fields
        preparedData.cCashAmount = null
        preparedData.cNEFTTransactionId = null
        preparedData.cNEFTTransferDate = null
        preparedData.cNEFTBankDetails = null
        preparedData.cNEFTAmount = null
        preparedData.cDDNo = null
        preparedData.cDDIssueDate = null
        preparedData.cDDBankDetails = null
        preparedData.cDDAmount = null
        break
      case "neft":
        preparedData.cNEFTTransactionId = collectionMainData.cNEFTTransactionId
        preparedData.cNEFTTransferDate = collectionMainData.cNEFTTransferDate
          ? new Date(collectionMainData.cNEFTTransferDate)
          : null
        preparedData.cNEFTBankDetails = collectionMainData.cNEFTBankDetails || null
        preparedData.cNEFTAmount = Number.parseFloat(collectionMainData.cNEFTAmount) || 0
        // Clear other payment fields
        preparedData.cCashAmount = null
        preparedData.cChequeNo = null
        preparedData.cChequeIssueDate = null
        preparedData.cChequeBankDetails = null
        preparedData.cChequeAmount = null
        preparedData.cDDNo = null
        preparedData.cDDIssueDate = null
        preparedData.cDDBankDetails = null
        preparedData.cDDAmount = null
        break
      case "dd":
        preparedData.cDDNo = collectionMainData.cDDNo
        preparedData.cDDIssueDate = collectionMainData.cDDIssueDate ? new Date(collectionMainData.cDDIssueDate) : null
        preparedData.cDDBankDetails = collectionMainData.cDDBankDetails || null
        preparedData.cDDAmount = Number.parseFloat(collectionMainData.cDDAmount) || 0
        // Clear other payment fields
        preparedData.cCashAmount = null
        preparedData.cChequeNo = null
        preparedData.cChequeIssueDate = null
        preparedData.cChequeBankDetails = null
        preparedData.cChequeAmount = null
        preparedData.cNEFTTransactionId = null
        preparedData.cNEFTTransferDate = null
        preparedData.cNEFTBankDetails = null
        preparedData.cNEFTAmount = null
        break
    }

    // Transaction to update collection and details
    return await prisma.$transaction(async (tx) => {
      // Delete existing collection details
      await tx.collectionDetail.deleteMany({
        where: { collectionId: id },
      })

      // Update collection
      const updatedCollection = await tx.collection.update({
        where: { id },
        data: {
          ...preparedData,
          collectionDetails: {
            create: collectionItems.map((item) => ({
              cSNo: Number.parseInt(item.cSNo),
              cBillNo: item.cBillNo,
              cBillAmount: Number.parseFloat(item.cBillAmount) || 0,
              cPrevCollected: Number.parseFloat(item.cPrevCollected) || 0,
              cPrevBalance: Number.parseFloat(item.cPrevBalance) || 0,
              cCurAmount: Number.parseFloat(item.cCurAmount) || 0,
              cCurBalance: Number.parseFloat(item.cCurBalance) || 0,
            })),
          },
        },
        include: {
          collectionDetails: {
            orderBy: {
              cSNo: "asc",
            },
          },
        },
      })

      return updatedCollection
    })
  },

  // Delete a collection
  deleteCollection: async (id) => {
    return await prisma.collection.delete({
      where: { id },
    })
  },

  // Get bill details for a specific bill number
  getBillDetails: async (billNo) => {
    // Find the latest collection detail for this bill
    const latestCollectionDetail = await prisma.collectionDetail.findFirst({
      where: {
        cBillNo: billNo,
      },
      orderBy: {
        updatedAt: "desc",
      },
    })

    if (!latestCollectionDetail) {
      return null
    }

    // Calculate total collected amount for this bill
    const totalCollected = await prisma.collectionDetail.aggregate({
      where: {
        cBillNo: billNo,
      },
      _sum: {
        cCurAmount: true,
      },
    })

    return {
      billAmount: latestCollectionDetail.cBillAmount,
      prevCollected: totalCollected._sum.cCurAmount || 0,
      prevBalance: latestCollectionDetail.cBillAmount - (totalCollected._sum.cCurAmount || 0),
    }
  },
}

