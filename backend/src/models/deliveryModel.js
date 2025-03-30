import prisma from "../config/db.js";

// Create a new delivery with details
export const createDelivery = async (data) => {
  const { deliveryDetails, ...deliveryData } = data;

  // Convert date strings to Date objects
  if (deliveryData.dlDate) {
    deliveryData.dlDate = new Date(deliveryData.dlDate);
  }

  return prisma.delivery.create({
    data: {
      ...deliveryData,
      deliveryDetails: {
        create: deliveryDetails.map((detail) => ({
          dlSNo: detail.dlSNo,
          dlInwNo: detail.dlInwNo || null,
          dlCustOrdNo: detail.dlCustOrdNo || null,
          dlCustDCNo: detail.dlCustDCNo || null,
          dlFabric: detail.dlFabric || null,
          dlColor: detail.dlColor || null,
          dlGreigeDia: detail.dlGreigeDia || null,
          dlFinishRolls: detail.dlFinishRolls || null,
          dlWeight: detail.dlWeight || null,
          dlProcess: detail.dlProcess || null,
          dlGreigeWeightLoss: detail.dlGreigeWeightLoss || null,
        })),
      },
    },
    include: {
      deliveryDetails: {
        orderBy: {
          dlSNo: "asc",
        },
      },
    },
  });
};

// Get all deliveries
export const getAllDeliveries = async () => {
  return prisma.delivery.findMany({
    select: {
      id: true,
      dlVNo: true,
      dlDate: true,
      dlCustomer: true,
      dlJobNo: true,
      dlDeliveryTo: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

// Get delivery by ID
export const getDeliveryById = async (id) => {
  return prisma.delivery.findUnique({
    where: { id },
    include: {
      deliveryDetails: {
        orderBy: {
          dlSNo: "asc",
        },
      },
    },
  });
};

// Update delivery
export const updateDelivery = async (id, data) => {
  const { deliveryDetails, ...deliveryData } = data;

  // Convert date strings to Date objects
  if (deliveryData.dlDate) {
    deliveryData.dlDate = new Date(deliveryData.dlDate);
  }

  // Delete existing delivery details
  await prisma.deliveryDetail.deleteMany({
    where: { deliveryId: id },
  });

  // Update the delivery and create new details
  return prisma.delivery.update({
    where: { id },
    data: {
      ...deliveryData,
      deliveryDetails: {
        create: deliveryDetails.map((detail) => ({
          dlSNo: detail.dlSNo,
          dlInwNo: detail.dlInwNo || null,
          dlCustOrdNo: detail.dlCustOrdNo || null,
          dlCustDCNo: detail.dlCustDCNo || null,
          dlFabric: detail.dlFabric || null,
          dlColor: detail.dlColor || null,
          dlGreigeDia: detail.dlGreigeDia || null,
          dlFinishRolls: detail.dlFinishRolls || null,
          dlWeight: detail.dlWeight || null,
          dlProcess: detail.dlProcess || null,
          dlGreigeWeightLoss: detail.dlGreigeWeightLoss || null,
        })),
      },
    },
    include: {
      deliveryDetails: {
        orderBy: {
          dlSNo: "asc",
        },
      },
    },
  });
};

// Delete delivery
export const deleteDelivery = async (id) => {
  // Cascade delete will handle related delivery details
  return prisma.delivery.delete({
    where: { id },
  });
};