// finishingModel.js
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()

export const FinishingEntryModel = {
  // Get all finishing entries
  getAllFinishingEntries: async () => {
    try {
      return await prisma.finishingEntry.findMany({
        orderBy: {
          id: 'desc'
        }
      })
    } catch (error) {
      console.error("Error in getAllFinishingEntries:", error)
      throw error
    }
  },

  // Get a single finishing entry by ID with its production details
  getFinishingEntry: async (id) => {
    try {
      return await prisma.finishingEntry.findUnique({
        where: { id },
        include: {
          productionDetails: {
            orderBy: {
              fSNo: 'asc'
            }
          }
        }
      })
    } catch (error) {
      console.error(`Error in getFinishingEntry for id ${id}:`, error)
      throw error
    }
  },

  // Create a new finishing entry with production details
  createFinishingEntry: async (finishingData) => {
    const { productionDetails, ...finishingEntryData } = finishingData

    try {
      return await prisma.$transaction(async (tx) => {
        // Create the finishing entry
        const newFinishingEntry = await tx.finishingEntry.create({
          data: finishingEntryData
        })

        // Create the production details
        if (productionDetails && productionDetails.length > 0) {
          for (const detail of productionDetails) {
            await tx.productionDetail.create({
              data: {
                ...detail,
                finishingEntryId: newFinishingEntry.id
              }
            })
          }
        }

        // Return the created finishing entry with its production details
        return await tx.finishingEntry.findUnique({
          where: { id: newFinishingEntry.id },
          include: {
            productionDetails: {
              orderBy: {
                fSNo: 'asc'
              }
            }
          }
        })
      })
    } catch (error) {
      console.error("Error in createFinishingEntry:", error)
      throw error
    }
  },

  // Update an existing finishing entry with production details
  updateFinishingEntry: async (id, finishingData) => {
    const { productionDetails, ...finishingEntryData } = finishingData

    try {
      return await prisma.$transaction(async (tx) => {
        // Update the finishing entry
        await tx.finishingEntry.update({
          where: { id },
          data: finishingEntryData
        })

        // Delete existing production details
        await tx.productionDetail.deleteMany({
          where: { finishingEntryId: id }
        })

        // Create new production details
        if (productionDetails && productionDetails.length > 0) {
          for (const detail of productionDetails) {
            await tx.productionDetail.create({
              data: {
                fSNo: detail.fSNo,
                fProdType: detail.fProdType,
                fProcess: detail.fProcess,
                fWeight: detail.fWeight,
                fRemarks: detail.fRemarks,
                finishingEntryId: id
              }
            })
          }
        }

        // Return the updated finishing entry with its production details
        return await tx.finishingEntry.findUnique({
          where: { id },
          include: {
            productionDetails: {
              orderBy: {
                fSNo: 'asc'
              }
            }
          }
        })
      })
    } catch (error) {
      console.error(`Error in updateFinishingEntry for id ${id}:`, error)
      throw error
    }
  },

  // Delete a finishing entry (cascade will delete production details)
  deleteFinishingEntry: async (id) => {
    try {
      return await prisma.finishingEntry.delete({
        where: { id }
      })
    } catch (error) {
      console.error(`Error in deleteFinishingEntry for id ${id}:`, error)
      throw error
    }
  }
}