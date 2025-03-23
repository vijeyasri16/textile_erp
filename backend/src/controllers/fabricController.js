import {
    getAllFabrics,
    getFabricById,
    createFabric,
    updateFabric,
    deleteFabric,
  } from "../models/fabricModel.js";
  
  export const getFabrics = async (req, res) => {
    try {
      const fabrics = await getAllFabrics();
      res.json(fabrics);
    } catch (error) {
      res.status(500).json({ error: "Error fetching fabrics" });
    }
  };
  
  export const getFabric = async (req, res) => {
    try {
      const fabric = await getFabricById(req.params.id);
      if (!fabric) return res.status(404).json({ error: "Fabric not found" });
      res.json(fabric);
    } catch (error) {
      res.status(500).json({ error: "Error fetching fabric" });
    }
  };
  
  export const addFabric = async (req, res) => {
    try {
      const { name, composition } = req.body;
      const newFabric = await createFabric({ name, composition });
      res.status(201).json(newFabric);
    } catch (error) {
      res.status(500).json({ error: "Error creating fabric" });
    }
  };
  
  export const updateFabricDetails = async (req, res) => {
    try {
      const updatedFabric = await updateFabric(req.params.id, req.body);
      res.json(updatedFabric);
    } catch (error) {
      res.status(500).json({ error: "Error updating fabric" });
    }
  };
  
  export const deleteFabricDetails = async (req, res) => {
    try {
      await deleteFabric(req.params.id);
      res.json({ message: "Fabric deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Error deleting fabric" });
    }
  };
  