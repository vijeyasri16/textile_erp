// finishingController.js
import { FinishingEntryModel } from "../models/finishingModel.js"

export const FinishingEntryController = {
  // Get all finishing entries
  getAllFinishingEntries: async (req, res, next) => {
    try {
      const finishingEntries = await FinishingEntryModel.getAllFinishingEntries()
      res.status(200).json(finishingEntries)
    } catch (error) {
      console.error("Error in getAllFinishingEntries controller:", error)
      res.status(500).json({ message: "Failed to fetch finishing entries", error: error.message })
    }
  },

  // Get a single finishing entry by ID
  getFinishingEntry: async (req, res, next) => {
    try {
      const { id } = req.params
      
      if (!id) {
        return res.status(400).json({ message: "ID parameter is required" })
      }
      
      const idNum = Number.parseInt(id)
      
      if (isNaN(idNum)) {
        return res.status(400).json({ message: "Invalid ID format" })
      }
      
      const finishingEntry = await FinishingEntryModel.getFinishingEntry(idNum)

      if (!finishingEntry) {
        return res.status(404).json({ message: "Finishing entry not found" })
      }

      res.status(200).json(finishingEntry)
    } catch (error) {
      console.error(`Error in getFinishingEntry controller for id ${req.params.id}:`, error)
      res.status(500).json({ message: "Failed to fetch finishing entry", error: error.message })
    }
  },

  // Create a new finishing entry
  createFinishingEntry: async (req, res, next) => {
    try {
      const finishingData = req.body

      // Validate required fields
      if (!finishingData.fMachine || !finishingData.fDate || !finishingData.fShift) {
        return res.status(400).json({
          message: "Machine, Date, and Shift are required fields",
        })
      }

      const newFinishingEntry = await FinishingEntryModel.createFinishingEntry(finishingData)
      res.status(201).json(newFinishingEntry)
    } catch (error) {
      console.error("Error in createFinishingEntry controller:", error)
      res.status(500).json({ message: "Failed to create finishing entry", error: error.message })
    }
  },

  // Update an existing finishing entry
  updateFinishingEntry: async (req, res, next) => {
    try {
      const { id } = req.params
      
      if (!id) {
        return res.status(400).json({ message: "ID parameter is required" })
      }
      
      const idNum = Number.parseInt(id)
      
      if (isNaN(idNum)) {
        return res.status(400).json({ message: "Invalid ID format" })
      }
      
      const finishingData = req.body

      // Validate required fields
      if (!finishingData.fMachine || !finishingData.fDate || !finishingData.fShift) {
        return res.status(400).json({
          message: "Machine, Date, and Shift are required fields",
        })
      }

      // Check if finishing entry exists
      const existingFinishingEntry = await FinishingEntryModel.getFinishingEntry(idNum)
      if (!existingFinishingEntry) {
        return res.status(404).json({ message: "Finishing entry not found" })
      }

      const updatedFinishingEntry = await FinishingEntryModel.updateFinishingEntry(idNum, finishingData)
      res.status(200).json(updatedFinishingEntry)
    } catch (error) {
      console.error(`Error in updateFinishingEntry controller for id ${req.params.id}:`, error)
      res.status(500).json({ message: "Failed to update finishing entry", error: error.message })
    }
  },

  // Delete a finishing entry
  deleteFinishingEntry: async (req, res, next) => {
    try {
      const { id } = req.params
      
      if (!id) {
        return res.status(400).json({ message: "ID parameter is required" })
      }
      
      const idNum = Number.parseInt(id)
      
      if (isNaN(idNum)) {
        return res.status(400).json({ message: "Invalid ID format" })
      }

      // Check if finishing entry exists
      const existingFinishingEntry = await FinishingEntryModel.getFinishingEntry(idNum)
      if (!existingFinishingEntry) {
        return res.status(404).json({ message: "Finishing entry not found" })
      }

      await FinishingEntryModel.deleteFinishingEntry(idNum)
      res.status(200).json({ message: "Finishing entry deleted successfully" })
    } catch (error) {
      console.error(`Error in deleteFinishingEntry controller for id ${req.params.id}:`, error)
      res.status(500).json({ message: "Failed to delete finishing entry", error: error.message })
    }
  }
}