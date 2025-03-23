import {
    getAllRawMaterials,
    getRawMaterialById,
    createRawMaterial,
    updateRawMaterial,
    deleteRawMaterial,
} from "../models/rawMaterialModel.js";

export const getRawMaterials = async (req, res) => {
    try {
        const rawMaterials = await getAllRawMaterials();
        res.json(rawMaterials);
    } catch (error) {
        res.status(500).json({ error: "Error fetching raw materials" });
    }
};

export const getRawMaterial = async (req, res) => {
    try {
        const rawMaterial = await getRawMaterialById(req.params.id);
        if (!rawMaterial) return res.status(404).json({ error: "Raw Material not found" });
        res.json(rawMaterial);
    } catch (error) {
        res.status(500).json({ error: "Error fetching raw material" });
    }
};

export const addRawMaterial = async (req, res) => {
    try {
        const { name, quantity, unitOfMeasure } = req.body;
        const newRawMaterial = await createRawMaterial({ name, quantity, unitOfMeasure });
        res.status(201).json(newRawMaterial);
    } catch (error) {
        res.status(500).json({ error: "Error creating raw material" });
    }
};

export const updateRawMaterialDetails = async (req, res) => {
    try {
        const updatedRawMaterial = await updateRawMaterial(req.params.id, req.body);
        res.json(updatedRawMaterial);
    } catch (error) {
        res.status(500).json({ error: "Error updating raw material" });
    }
};

export const deleteRawMaterialDetails = async (req, res) => {
    try {
        await deleteRawMaterial(req.params.id);
        res.json({ message: "Raw Material deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Error deleting raw material" });
    }
};