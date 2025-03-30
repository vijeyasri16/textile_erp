import express from "express"
import * as dyeingPlanningController from "../controllers/dyeingPlanningController.js"

const router = express.Router()

// Get all dyeing plannings
router.get("/dyeingPlannings", dyeingPlanningController.getAllDyeingPlannings)

// Get a single dyeing planning by ID
router.get("/dyeingPlanning/:id", dyeingPlanningController.getDyeingPlanningById)

// Create a new dyeing planning
router.post("/dyeingPlanning", dyeingPlanningController.createDyeingPlanning)

// Update an existing dyeing planning
router.put("/dyeingPlanning/:id", dyeingPlanningController.updateDyeingPlanning)

// Delete a dyeing planning
router.delete("/dyeingPlanning/:id", dyeingPlanningController.deleteDyeingPlanning)

export default router

