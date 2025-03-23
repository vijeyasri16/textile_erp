import prisma from "../config/db.js";


export const GoodsInwardModel = {
  // Get all goods inward records
  findAll: async () => {
    return prisma.goodsInward.findMany({
      include: {
        fabrics: true,
        processes: true
      },
      orderBy: {
        date: 'desc'
      }
    });
  },

  // Get a single goods inward record by ID
  findById: async (id) => {
    return prisma.goodsInward.findUnique({
      where: { id },
      include: {
        fabrics: true,
        processes: true
      }
    });
  },

  // Create a new goods inward record
  create: async (data) => {
    const { fabrics, processes, ...goodsInwardData } = data;
    
    // Convert string dates to Date objects
    if (goodsInwardData.date) {
      goodsInwardData.date = new Date(goodsInwardData.date);
    }
    if (goodsInwardData.dcDate) {
      goodsInwardData.dcDate = new Date(goodsInwardData.dcDate);
    }

    return prisma.goodsInward.create({
      data: {
        ...goodsInwardData,
        fabrics: {
          create: fabrics.map(({ id, ...fabric }) => fabric)
        },
        processes: {
          create: processes.map(({ id, ...process }) => process)
        }
      },
      include: {
        fabrics: true,
        processes: true
      }
    });
  },

  // Update an existing goods inward record
  update: async (id, data) => {
    const { fabrics, processes, ...goodsInwardData } = data;
    
    // Convert string dates to Date objects
    if (goodsInwardData.date) {
      goodsInwardData.date = new Date(goodsInwardData.date);
    }
    if (goodsInwardData.dcDate) {
      goodsInwardData.dcDate = new Date(goodsInwardData.dcDate);
    }

    // Transaction to handle updating the main record and related records
    return prisma.$transaction(async (tx) => {
      // Delete existing related records
      await tx.fabric.deleteMany({
        where: { goodsInwardId: id }
      });
      
      await tx.process.deleteMany({
        where: { goodsInwardId: id }
      });
      
      // Update the main record and create new related records
      return tx.goodsInward.update({
        where: { id },
        data: {
          ...goodsInwardData,
          fabrics: {
            create: fabrics.map(({ id: fabricId, ...fabric }) => fabric)
          },
          processes: {
            create: processes.map(({ id: processId, ...process }) => process)
          }
        },
        include: {
          fabrics: true,
          processes: true
        }
      });
    });
  },

  // Delete a goods inward record
  delete: async (id) => {
    return prisma.goodsInward.delete({
      where: { id }
    });
  }
};