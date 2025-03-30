import prisma from "../config/db.js";

// Get all dyeing plannings
export const getAllDyeingPlannings = async () => {
  try {
    return await prisma.dyeingPlanning.findMany({
      select: {
        id: true,
        dlJobNo: true,
        dlDate: true,
        dlFabric: true,
        dlColour: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })
  } catch (error) {
    console.error("Error getting all dyeing plannings:", error)
    throw error
  }
}

// Get a single dyeing planning by ID
export const getDyeingPlanningById = async (id) => {
  try {
    return await prisma.dyeingPlanning.findUnique({
      where: { id: Number(id) },
      include: {
        stageDetails: {
          orderBy: {
            dlSNo: "asc",
          },
        },
        itemDetails: {
          orderBy: {
            dlSNo: "asc",
          },
        },
      },
    })
  } catch (error) {
    console.error(`Error getting dyeing planning with ID ${id}:`, error)
    throw error
  }
}

// Create a new dyeing planning
export const createDyeingPlanning = async (data) => {
  try {
    const { stageDetails, itemDetails, ...dyeingPlanningData } = data

    return await prisma.dyeingPlanning.create({
      data: {
        ...dyeingPlanningData,
        stageDetails: {
          create: stageDetails.map((stage) => ({
            dlSNo: stage.dlSNo,
            dlStage: stage.dlStage,
            dlMLR: stage.dlMLR,
            dlTLiquor: stage.dlTLiquor,
          })),
        },
        itemDetails: {
          create: itemDetails.map((item) => ({
            dlSNo: item.dlSNo,
            dlStage: item.dlStage,
            dlItemName: item.dlItemName,
            dlValue: item.dlValue,
            dlGPLPercentage: item.dlGPLPercentage,
            dlWeight: item.dlWeight,
          })),
        },
      },
      include: {
        stageDetails: true,
        itemDetails: true,
      },
    })
  } catch (error) {
    console.error("Error creating dyeing planning:", error)
    throw error
  }
}

// Update an existing dyeing planning
export const updateDyeingPlanning = async (id, data) => {
  try {
    const { stageDetails, itemDetails, ...dyeingPlanningData } = data

    // First, delete existing related records to avoid duplicates
    await prisma.dyeingPlanningStage.deleteMany({
      where: { dyeingPlanningId: Number(id) },
    })

    await prisma.dyeingPlanningItem.deleteMany({
      where: { dyeingPlanningId: Number(id) },
    })

    // Then update the main record and create new related records
    return await prisma.dyeingPlanning.update({
      where: { id: Number(id) },
      data: {
        ...dyeingPlanningData,
        stageDetails: {
          create: stageDetails.map((stage) => ({
            dlSNo: stage.dlSNo,
            dlStage: stage.dlStage,
            dlMLR: stage.dlMLR,
            dlTLiquor: stage.dlTLiquor,
          })),
        },
        itemDetails: {
          create: itemDetails.map((item) => ({
            dlSNo: item.dlSNo,
            dlStage: item.dlStage,
            dlItemName: item.dlItemName,
            dlValue: item.dlValue,
            dlGPLPercentage: item.dlGPLPercentage,
            dlWeight: item.dlWeight,
          })),
        },
      },
      include: {
        stageDetails: true,
        itemDetails: true,
      },
    })
  } catch (error) {
    console.error(`Error updating dyeing planning with ID ${id}:`, error)
    throw error
  }
}

// Delete a dyeing planning
export const deleteDyeingPlanning = async (id) => {
  try {
    // Cascade delete will handle the related records
    return await prisma.dyeingPlanning.delete({
      where: { id: Number(id) },
    })
  } catch (error) {
    console.error(`Error deleting dyeing planning with ID ${id}:`, error)
    throw error
  }
}

