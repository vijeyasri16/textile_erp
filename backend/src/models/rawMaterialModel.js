import prisma from "../config/db.js";

export const getAllRawMaterials = async () => {
    return await prisma.rawMaterial.findMany();
};

export const getRawMaterialById = async (id) => {
    return await prisma.rawMaterial.findUnique({ where: { id: Number(id) } });
};

export const createRawMaterial = async (data) => {
    return await prisma.rawMaterial.create({ data });
};

export const updateRawMaterial = async (id, data) => {
    return await prisma.rawMaterial.update({
        where: { id: Number(id) },
        data,
    });
};

export const deleteRawMaterial = async (id) => {
    return await prisma.rawMaterial.delete({ where: { id: Number(id) } });
};
