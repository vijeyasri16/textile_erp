import { LabEntryModel } from "../models/labEntryModel.js"

export const LabEntryController = {
  // Get all lab entries
  getAllLabEntries: async (req, res, next) => {
    try {
      const labEntries = await LabEntryModel.getAllLabEntries()
      res.status(200).json(labEntries)
    } catch (error) {
      next(error)
    }
  },

  // Get a single lab entry by ID
  getLabEntry: async (req, res, next) => {
    try {
      const { id } = req.params
      const idNum = Number.parseInt(id)
      const labEntry = await LabEntryModel.getLabEntry(idNum)

      if (!labEntry) {
        return res.status(404).json({ message: "Lab entry not found" })
      }

      res.status(200).json(labEntry)
    } catch (error) {
      next(error)
    }
  },

  // Create a new lab entry
  createLabEntry: async (req, res, next) => {
    try {
      const labEntryData = req.body

      // Validate required fields
      if (!labEntryData.lLabNo || !labEntryData.lDate || !labEntryData.lCustomer) {
        return res.status(400).json({
          message: "Lab No, Date, and Customer are required fields",
        })
      }

      const newLabEntry = await LabEntryModel.createLabEntry(labEntryData)
      res.status(201).json(newLabEntry)
    } catch (error) {
      // Check for unique constraint violation
      if (error.code === "P2002") {
        return res.status(409).json({
          message: "A lab entry with this Lab No already exists",
        })
      }
      next(error)
    }
  },

  // Update an existing lab entry
  updateLabEntry: async (req, res, next) => {
    try {
      const { id } = req.params
      const labEntryData = req.body
      const idNum = Number.parseInt(id)

      // Validate required fields
      if (!labEntryData.lLabNo || !labEntryData.lDate || !labEntryData.lCustomer) {
        return res.status(400).json({
          message: "Lab No, Date, and Customer are required fields",
        })
      }

      // Check if lab entry exists
      const existingLabEntry = await LabEntryModel.getLabEntry(idNum)
      if (!existingLabEntry) {
        return res.status(404).json({ message: "Lab entry not found" })
      }

      const updatedLabEntry = await LabEntryModel.updateLabEntry(idNum, labEntryData)
      res.status(200).json(updatedLabEntry)
    } catch (error) {
      // Check for unique constraint violation
      if (error.code === "P2002") {
        return res.status(409).json({
          message: "A lab entry with this Lab No already exists",
        })
      }
      next(error)
    }
  },

  // Delete a lab entry
  deleteLabEntry: async (req, res, next) => {
    try {
      const { id } = req.params
      const idNum = Number.parseInt(id)

      // Check if lab entry exists
      const existingLabEntry = await LabEntryModel.getLabEntry(idNum)
      if (!existingLabEntry) {
        return res.status(404).json({ message: "Lab entry not found" })
      }

      await LabEntryModel.deleteLabEntry(idNum)
      res.status(200).json({ message: "Lab entry deleted successfully" })
    } catch (error) {
      next(error)
    }
  },
}

