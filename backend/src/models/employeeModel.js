import prisma from "../config/db.js";

export const getAllEmployees = async () => {
  return await prisma.employee.findMany();
};

export const getEmployeeById = async (id) => {
  return await prisma.employee.findUnique({ where: { id: Number(id) } });
};

export const createEmployee = async (data) => {
  return await prisma.employee.create({ data });
};

export const updateEmployee = async (id, data) => {
  return await prisma.employee.update({
    where: { id: Number(id) },
    data,
  });
};

export const deleteEmployee = async (id) => {
  return await prisma.employee.delete({ where: { id: Number(id) } });
};
