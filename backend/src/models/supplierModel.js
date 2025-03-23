import prisma from "../config/db.js";

export const getAllSuppliers = async () => {
  return await prisma.supplier.findMany();
};

export const getSupplierById = async (id) => {
  return await prisma.supplier.findUnique({ where: { id: Number(id) } });
};

export const createSupplier = async (data) => {
  return await prisma.supplier.create({ data });
};

export const updateSupplier = async (id, data) => {
  return await prisma.supplier.update({
    where: { id: Number(id) },
    data,
  });
};

export const deleteSupplier = async (id) => {
  return await prisma.supplier.delete({ where: { id: Number(id) } });
};
