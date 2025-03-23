import prisma from "../config/db.js";

export const getAllCustomers = async () => {
  return await prisma.customer.findMany();
};

export const getCustomerById = async (id) => {
  return await prisma.customer.findUnique({ where: { id: Number(id) } });
};

export const createCustomer = async (data) => {
  return await prisma.customer.create({ data });
};

export const updateCustomer = async (id, data) => {
  return await prisma.customer.update({
    where: { id: Number(id) },
    data,
  });
};

export const deleteCustomer = async (id) => {
  return await prisma.customer.delete({ where: { id: Number(id) } });
};
