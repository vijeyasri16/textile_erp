import * as dyeingPlanningModel from "../models/dyeingPlanningModel.js"

// Get all dyeing plannings
export const getAllDyeingPlannings = async (req, res) => {
  try {
    const dyeingPlannings = await dyeingPlanningModel.getAllDyeingPlannings()
    res.status(200).json(dyeingPlannings)
  } catch (error) {
    console.error("Controller error getting all dyeing plannings:", error)
    res.status(500).json({ message: "Failed to get dyeing plannings", error: error.message })
  }
}

// Get a single dyeing planning by ID
export const getDyeingPlanningById = async (req, res) => {
  try {
    const { id } = req.params
    const dyeingPlanning = await dyeingPlanningModel.getDyeingPlanningById(id)

    if (!dyeingPlanning) {
      return res.status(404).json({ message: `Dyeing planning with ID ${id} not found` })
    }

    res.status(200).json(dyeingPlanning)
  } catch (error) {
    console.error(`Controller error getting dyeing planning with ID ${req.params.id}:`, error)
    res.status(500).json({ message: "Failed to get dyeing planning", error: error.message })
  }
}

// Create a new dyeing planning
export const createDyeingPlanning = async (req, res) => {
  try {
    const newDyeingPlanning = await dyeingPlanningModel.createDyeingPlanning(req.body)
    res.status(201).json(newDyeingPlanning)
  } catch (error) {
    console.error("Controller error creating dyeing planning:", error)
    res.status(500).json({ message: "Failed to create dyeing planning", error: error.message })
  }
}

// Update an existing dyeing planning
export const updateDyeingPlanning = async (req, res) => {
  try {
    const { id } = req.params
    const updatedDyeingPlanning = await dyeingPlanningModel.updateDyeingPlanning(id, req.body)

    if (!updatedDyeingPlanning) {
      return res.status(404).json({ message: `Dyeing planning with ID ${id} not found` })
    }

    res.status(200).json(updatedDyeingPlanning)
  } catch (error) {
    console.error(`Controller error updating dyeing planning with ID ${req.params.id}:`, error)
    res.status(500).json({ message: "Failed to update dyeing planning", error: error.message })
  }
}

// Delete a dyeing planning
export const deleteDyeingPlanning = async (req, res) => {
  try {
    const { id } = req.params
    await dyeingPlanningModel.deleteDyeingPlanning(id)
    res.status(200).json({ message: `Dyeing planning with ID ${id} deleted successfully` })
  } catch (error) {
    console.error(`Controller error deleting dyeing planning with ID ${req.params.id}:`, error)
    res.status(500).json({ message: "Failed to delete dyeing planning", error: error.message })
  }
}

