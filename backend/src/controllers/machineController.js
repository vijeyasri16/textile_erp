import {
    getAllMachines,
    getMachineById,
    createMachine,
    updateMachine,
    deleteMachine,
  } from "../models/machineModel.js";
  
  export const getMachines = async (req, res) => {
    try {
      const machines = await getAllMachines();
      res.json(machines);
    } catch (error) {
      res.status(500).json({ error: "Error fetching machines" });
    }
  };
  
  export const getMachine = async (req, res) => {
    try {
      const machine = await getMachineById(req.params.id);
      if (!machine) return res.status(404).json({ error: "Machine not found" });
      res.json(machine);
    } catch (error) {
      res.status(500).json({ error: "Error fetching machine" });
    }
  };
  
  export const addMachine = async (req, res) => {
    try {
      const { name, processLinked } = req.body;
      const newMachine = await createMachine({ name, processLinked });
      res.status(201).json(newMachine);
    } catch (error) {
      res.status(500).json({ error: "Error creating machine" });
    }
  };
  
  export const updateMachineDetails = async (req, res) => {
    try {
      const updatedMachine = await updateMachine(req.params.id, req.body);
      res.json(updatedMachine);
    } catch (error) {
      res.status(500).json({ error: "Error updating machine" });
    }
  };
  
  export const deleteMachineDetails = async (req, res) => {
    try {
      await deleteMachine(req.params.id);
      res.json({ message: "Machine deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Error deleting machine" });
    }
  };
  