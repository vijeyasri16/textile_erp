import prisma from "../config/db.js";

// Create a new goods inwards record
export const createGoodsInwards = async (data) => {
  const { fabrics, processes, ...goodsInwardsData } = data

  // Convert date strings to Date objects
  if (goodsInwardsData.gDate) {
    goodsInwardsData.gDate = new Date(goodsInwardsData.gDate)
  }
  if (goodsInwardsData.gCustDCDate) {
    goodsInwardsData.gCustDCDate = goodsInwardsData.gCustDCDate ? new Date(goodsInwardsData.gCustDCDate) : null
  }

  return prisma.goodsInwards.create({
    data: {
      ...goodsInwardsData,
      fabrics: {
        create: fabrics.map((fabric) => ({
          gSNo: fabric.gSNo,
          gFabric: fabric.gFabric,
          gColor: fabric.gColor || null,
          gGreigeGSM: fabric.gGreigeGSM || null,
          gGreigeDIA: fabric.gGreigeDIA || null,
          gFinishRolls: fabric.gFinishRolls || null,
          gWeight: fabric.gWeight || null,
          gMachine: fabric.gMachine || null,
        })),
      },
      processes: {
        create: processes.map((process) => ({
          gSNo: process.gSNo,
          gProcess: process.gProcess,
        })),
      },
    },
    include: {
      fabrics: true,
      processes: true,
    },
  })
}

// Get all goods inwards records
export const getAllGoodsInwards = async () => {
  return prisma.goodsInwards.findMany({
    include: {
      fabrics: {
        orderBy: {
          gSNo: "asc",
        },
      },
      processes: {
        orderBy: {
          gSNo: "asc",
        },
      },
    },
    orderBy: {
      gDate: "desc",
    },
  })
}

// Get a single goods inwards record by ID
export const getGoodsInwardsById = async (id) => {
  return prisma.goodsInwards.findUnique({
    where: { id },
    include: {
      fabrics: {
        orderBy: {
          gSNo: "asc",
        },
      },
      processes: {
        orderBy: {
          gSNo: "asc",
        },
      },
    },
  })
}

// Update a goods inwards record
export const updateGoodsInwards = async (id, data) => {
  const { fabrics, processes, ...goodsInwardsData } = data

  // Convert date strings to Date objects
  if (goodsInwardsData.gDate) {
    goodsInwardsData.gDate = new Date(goodsInwardsData.gDate)
  }
  if (goodsInwardsData.gCustDCDate) {
    goodsInwardsData.gCustDCDate = goodsInwardsData.gCustDCDate ? new Date(goodsInwardsData.gCustDCDate) : null
  }

  // Delete existing fabrics and processes
  await prisma.goodsInwardsFabric.deleteMany({
    where: { goodsInwardsId: id },
  })

  await prisma.goodsInwardsProcess.deleteMany({
    where: { goodsInwardsId: id },
  })

  // Update the goods inwards record with new data
  return prisma.goodsInwards.update({
    where: { id },
    data: {
      ...goodsInwardsData,
      fabrics: {
        create: fabrics.map((fabric) => ({
          gSNo: fabric.gSNo,
          gFabric: fabric.gFabric,
          gColor: fabric.gColor || null,
          gGreigeGSM: fabric.gGreigeGSM || null,
          gGreigeDIA: fabric.gGreigeDIA || null,
          gFinishRolls: fabric.gFinishRolls || null,
          gWeight: fabric.gWeight || null,
          gMachine: fabric.gMachine || null,
        })),
      },
      processes: {
        create: processes.map((process) => ({
          gSNo: process.gSNo,
          gProcess: process.gProcess,
        })),
      },
    },
    include: {
      fabrics: {
        orderBy: {
          gSNo: "asc",
        },
      },
      processes: {
        orderBy: {
          gSNo: "asc",
        },
      },
    },
  })
}

// Delete a goods inwards record
export const deleteGoodsInwards = async (id) => {
  // Cascade delete will handle related fabrics and processes
  return prisma.goodsInwards.delete({
    where: { id },
  })
}

