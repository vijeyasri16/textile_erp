import prisma from "../config/db.js";

export const getAllMachines = async () => {
  return await prisma.machine.findMany();
};

export const getMachineById = async (id) => {
  return await prisma.machine.findUnique({ where: { id: Number(id) } });
};

export const createMachine = async (data) => {
  return await prisma.machine.create({ data });
};

export const updateMachine = async (id, data) => {
  return await prisma.machine.update({
    where: { id: Number(id) },
    data,
  });
};

export const deleteMachine = async (id) => {
  return await prisma.machine.delete({ where: { id: Number(id) } });
};
