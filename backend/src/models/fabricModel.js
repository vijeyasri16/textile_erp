import prisma from "../config/db.js";

export const getAllFabrics = async () => {
  return await prisma.fabric.findMany();
};

export const getFabricById = async (id) => {
  return await prisma.fabric.findUnique({ where: { id: Number(id) } });
};

export const createFabric = async (data) => {
  return await prisma.fabric.create({ data });
};

export const updateFabric = async (id, data) => {
  return await prisma.fabric.update({
    where: { id: Number(id) },
    data,
  });
};

export const deleteFabric = async (id) => {
  return await prisma.fabric.delete({ where: { id: Number(id) } });
};
