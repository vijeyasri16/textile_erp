import prisma from "../config/db.js";

export const LabEntryModel = {
  // Get all lab entries
  getAllLabEntries: async () => {
    try {
      return await prisma.labEntry.findMany({
        orderBy: {
          lDate: "desc",
        },
      })
    } catch (error) {
      console.error("Error in getAllLabEntries:", error)
      throw error
    }
  },

  // Get a single lab entry by ID with its details
  getLabEntry: async (id) => {
    try {
      return await prisma.labEntry.findUnique({
        where: { id: Number.parseInt(id) },
        include: {
          labDetails: {
            orderBy: {
              lSNo: "asc",
            },
          },
        },
      })
    } catch (error) {
      console.error("Error in getLabEntry:", error)
      throw error
    }
  },

  // Create a new lab entry with details
  createLabEntry: async (labEntryData) => {
    const { labDetails, ...labEntryInfo } = labEntryData

    try {
      // Convert date string to Date object
      if (typeof labEntryInfo.lDate === "string") {
        labEntryInfo.lDate = new Date(labEntryInfo.lDate)
      }

      return await prisma.$transaction(async (tx) => {
        // Create the lab entry
        const newLabEntry = await tx.labEntry.create({
          data: {
            ...labEntryInfo,
            labDetails: {
              create: labDetails.map((detail) => ({
                lSNo: detail.lSNo,
                lColour: detail.lColour,
                lPantoneNo: detail.lPantoneNo,
                lJobNo: detail.lJobNo,
                lFabricLight: detail.lFabricLight,
                lFastness: detail.lFastness,
                lApprovalBy: detail.lApprovalBy,
                lRemarks: detail.lRemarks,
              })),
            },
          },
          include: {
            labDetails: true,
          },
        })

        return newLabEntry
      })
    } catch (error) {
      console.error("Error in createLabEntry:", error)
      throw error
    }
  },

  // Update an existing lab entry and its details
  updateLabEntry: async (id, labEntryData) => {
    const { labDetails, ...labEntryInfo } = labEntryData

    try {
      // Convert date string to Date object
      if (typeof labEntryInfo.lDate === "string") {
        labEntryInfo.lDate = new Date(labEntryInfo.lDate)
      }

      return await prisma.$transaction(async (tx) => {
        // First, delete all existing lab details for this entry
        await tx.labDetailItem.deleteMany({
          where: { labEntryId: Number.parseInt(id) },
        })

        // Update the lab entry
        const updatedLabEntry = await tx.labEntry.update({
          where: { id: Number.parseInt(id) },
          data: {
            ...labEntryInfo,
            labDetails: {
              create: labDetails.map((detail) => ({
                lSNo: detail.lSNo,
                lColour: detail.lColour,
                lPantoneNo: detail.lPantoneNo,
                lJobNo: detail.lJobNo,
                lFabricLight: detail.lFabricLight,
                lFastness: detail.lFastness,
                lApprovalBy: detail.lApprovalBy,
                lRemarks: detail.lRemarks,
              })),
            },
          },
          include: {
            labDetails: {
              orderBy: {
                lSNo: "asc",
              },
            },
          },
        })

        return updatedLabEntry
      })
    } catch (error) {
      console.error("Error in updateLabEntry:", error)
      throw error
    }
  },

  // Delete a lab entry (and its details via cascade)
  deleteLabEntry: async (id) => {
    try {
      return await prisma.labEntry.delete({
        where: { id: Number.parseInt(id) },
      })
    } catch (error) {
      console.error("Error in deleteLabEntry:", error)
      throw error
    }
  },
}

