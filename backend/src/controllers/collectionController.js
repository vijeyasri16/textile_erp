import { CollectionModel } from "../models/collectionModel.js"

export const CollectionController = {
  // Get all collections
  getAllCollections: async (req, res, next) => {
    try {
      const collections = await CollectionModel.getAllCollections()
      res.status(200).json(collections)
    } catch (error) {
      next(error)
    }
  },

  // Get a single collection by ID
  getCollection: async (req, res, next) => {
    try {
      const { id } = req.params
      const idNum = Number.parseInt(id)

      if (isNaN(idNum)) {
        return res.status(400).json({ message: "Invalid ID format" })
      }

      const collection = await CollectionModel.getCollection(idNum)

      if (!collection) {
        return res.status(404).json({ message: "Collection not found" })
      }

      // Ensure collectionItems exists for frontend compatibility
      if (!collection.collectionItems) {
        collection.collectionItems = collection.collectionDetails || []
      }

      res.status(200).json(collection)
    } catch (error) {
      console.error("Error in getCollection controller:", error)
      next(error)
    }
  },

  // Create a new collection
  createCollection: async (req, res, next) => {
    try {
      const collectionData = req.body

      // Validate required fields
      if (!collectionData.cVNo || !collectionData.cDate || !collectionData.cCustomer || !collectionData.cPaymentMode) {
        return res.status(400).json({
          message: "V.No, Date, Customer, and Payment Mode are required fields",
        })
      }

      // Validate date format
      if (isNaN(Date.parse(collectionData.cDate))) {
        return res.status(400).json({
          message: "Invalid date format",
        })
      }

      // Validate payment mode specific fields
      switch (collectionData.cPaymentMode) {
        case "cash":
          if (!collectionData.cCashAmount || isNaN(Number.parseFloat(collectionData.cCashAmount))) {
            return res.status(400).json({
              message: "Valid Cash Amount is required for cash payment mode",
            })
          }
          break
        case "cheque":
          if (
            !collectionData.cChequeNo ||
            !collectionData.cChequeIssueDate ||
            !collectionData.cChequeAmount ||
            isNaN(Number.parseFloat(collectionData.cChequeAmount))
          ) {
            return res.status(400).json({
              message: "Cheque No, Issue Date, and valid Amount are required for cheque payment mode",
            })
          }
          if (isNaN(Date.parse(collectionData.cChequeIssueDate))) {
            return res.status(400).json({
              message: "Invalid Cheque Issue Date format",
            })
          }
          break
        case "neft":
          if (
            !collectionData.cNEFTTransactionId ||
            !collectionData.cNEFTTransferDate ||
            !collectionData.cNEFTAmount ||
            isNaN(Number.parseFloat(collectionData.cNEFTAmount))
          ) {
            return res.status(400).json({
              message: "Transaction ID, Transfer Date, and valid Amount are required for NEFT payment mode",
            })
          }
          if (isNaN(Date.parse(collectionData.cNEFTTransferDate))) {
            return res.status(400).json({
              message: "Invalid NEFT Transfer Date format",
            })
          }
          break
        case "dd":
          if (
            !collectionData.cDDNo ||
            !collectionData.cDDIssueDate ||
            !collectionData.cDDAmount ||
            isNaN(Number.parseFloat(collectionData.cDDAmount))
          ) {
            return res.status(400).json({
              message: "DD No, Issue Date, and valid Amount are required for DD payment mode",
            })
          }
          if (isNaN(Date.parse(collectionData.cDDIssueDate))) {
            return res.status(400).json({
              message: "Invalid DD Issue Date format",
            })
          }
          break
        default:
          return res.status(400).json({
            message: "Invalid payment mode",
          })
      }

      // Validate collection items
      if (!collectionData.collectionItems || collectionData.collectionItems.length === 0) {
        return res.status(400).json({
          message: "At least one collection item is required",
        })
      }

      // Validate numeric fields in collection items
      for (const item of collectionData.collectionItems) {
        if (!item.cBillNo) {
          return res.status(400).json({
            message: "Bill No is required for all collection items",
          })
        }

        if (!item.cBillAmount || isNaN(Number.parseFloat(item.cBillAmount))) {
          return res.status(400).json({
            message: "Valid Bill Amount is required for all collection items",
          })
        }

        if (!item.cCurAmount || isNaN(Number.parseFloat(item.cCurAmount))) {
          return res.status(400).json({
            message: "Valid Current Amount is required for all collection items",
          })
        }
      }

      // Validate Un Adjust Amount if provided
      if (collectionData.cUnAdjustAmt && isNaN(Number.parseFloat(collectionData.cUnAdjustAmt))) {
        return res.status(400).json({
          message: "Un Adjust Amount must be a valid number",
        })
      }

      const newCollection = await CollectionModel.createCollection(collectionData)
      res.status(201).json(newCollection)
    } catch (error) {
      // Check for unique constraint violation
      if (error.code === "P2002") {
        return res.status(409).json({
          message: "A collection with this V.No already exists",
        })
      }
      next(error)
    }
  },

  // Update an existing collection
  updateCollection: async (req, res, next) => {
    try {
      const { id } = req.params
      const collectionData = req.body
      const idNum = Number.parseInt(id)

      if (isNaN(idNum)) {
        return res.status(400).json({ message: "Invalid ID format" })
      }

      // Validate required fields
      if (!collectionData.cVNo || !collectionData.cDate || !collectionData.cCustomer || !collectionData.cPaymentMode) {
        return res.status(400).json({
          message: "V.No, Date, Customer, and Payment Mode are required fields",
        })
      }

      // Validate date format
      if (isNaN(Date.parse(collectionData.cDate))) {
        return res.status(400).json({
          message: "Invalid date format",
        })
      }

      // Validate payment mode specific fields (similar to create validation)
      switch (collectionData.cPaymentMode) {
        case "cash":
          if (!collectionData.cCashAmount || isNaN(Number.parseFloat(collectionData.cCashAmount))) {
            return res.status(400).json({
              message: "Valid Cash Amount is required for cash payment mode",
            })
          }
          break
        case "cheque":
          if (
            !collectionData.cChequeNo ||
            !collectionData.cChequeIssueDate ||
            !collectionData.cChequeAmount ||
            isNaN(Number.parseFloat(collectionData.cChequeAmount))
          ) {
            return res.status(400).json({
              message: "Cheque No, Issue Date, and valid Amount are required for cheque payment mode",
            })
          }
          if (isNaN(Date.parse(collectionData.cChequeIssueDate))) {
            return res.status(400).json({
              message: "Invalid Cheque Issue Date format",
            })
          }
          break
        case "neft":
          if (
            !collectionData.cNEFTTransactionId ||
            !collectionData.cNEFTTransferDate ||
            !collectionData.cNEFTAmount ||
            isNaN(Number.parseFloat(collectionData.cNEFTAmount))
          ) {
            return res.status(400).json({
              message: "Transaction ID, Transfer Date, and valid Amount are required for NEFT payment mode",
            })
          }
          if (isNaN(Date.parse(collectionData.cNEFTTransferDate))) {
            return res.status(400).json({
              message: "Invalid NEFT Transfer Date format",
            })
          }
          break
        case "dd":
          if (
            !collectionData.cDDNo ||
            !collectionData.cDDIssueDate ||
            !collectionData.cDDAmount ||
            isNaN(Number.parseFloat(collectionData.cDDAmount))
          ) {
            return res.status(400).json({
              message: "DD No, Issue Date, and valid Amount are required for DD payment mode",
            })
          }
          if (isNaN(Date.parse(collectionData.cDDIssueDate))) {
            return res.status(400).json({
              message: "Invalid DD Issue Date format",
            })
          }
          break
        default:
          return res.status(400).json({
            message: "Invalid payment mode",
          })
      }

      // Validate collection items
      if (!collectionData.collectionItems || collectionData.collectionItems.length === 0) {
        return res.status(400).json({
          message: "At least one collection item is required",
        })
      }

      // Validate numeric fields in collection items
      for (const item of collectionData.collectionItems) {
        if (!item.cBillNo) {
          return res.status(400).json({
            message: "Bill No is required for all collection items",
          })
        }

        if (!item.cBillAmount || isNaN(Number.parseFloat(item.cBillAmount))) {
          return res.status(400).json({
            message: "Valid Bill Amount is required for all collection items",
          })
        }

        if (!item.cCurAmount || isNaN(Number.parseFloat(item.cCurAmount))) {
          return res.status(400).json({
            message: "Valid Current Amount is required for all collection items",
          })
        }
      }

      // Validate Un Adjust Amount if provided
      if (collectionData.cUnAdjustAmt && isNaN(Number.parseFloat(collectionData.cUnAdjustAmt))) {
        return res.status(400).json({
          message: "Un Adjust Amount must be a valid number",
        })
      }

      // Check if collection exists
      const existingCollection = await CollectionModel.getCollection(idNum)
      if (!existingCollection) {
        return res.status(404).json({ message: "Collection not found" })
      }

      const updatedCollection = await CollectionModel.updateCollection(idNum, collectionData)
      res.status(200).json(updatedCollection)
    } catch (error) {
      // Check for unique constraint violation
      if (error.code === "P2002") {
        return res.status(409).json({
          message: "A collection with this V.No already exists",
        })
      }
      next(error)
    }
  },

  // Delete a collection
  deleteCollection: async (req, res, next) => {
    try {
      const { id } = req.params
      const idNum = Number.parseInt(id)

      if (isNaN(idNum)) {
        return res.status(400).json({ message: "Invalid ID format" })
      }

      // Check if collection exists
      const existingCollection = await CollectionModel.getCollection(idNum)
      if (!existingCollection) {
        return res.status(404).json({ message: "Collection not found" })
      }

      await CollectionModel.deleteCollection(idNum)
      res.status(200).json({ message: "Collection deleted successfully" })
    } catch (error) {
      next(error)
    }
  },

  // Get bill details for a specific bill number
  getBillDetails: async (req, res, next) => {
    try {
      const { billNo } = req.query

      if (!billNo) {
        return res.status(400).json({
          message: "Bill No is required",
        })
      }

      const billDetails = await CollectionModel.getBillDetails(billNo)

      if (!billDetails) {
        return res.status(404).json({ message: "Bill not found" })
      }

      res.status(200).json(billDetails)
    } catch (error) {
      next(error)
    }
  },
}

