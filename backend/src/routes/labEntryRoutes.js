import express from "express"
import { LabEntryController } from "../controllers/labEntryController.js"

const router = express.Router()

// GET all lab entries
router.get("/getAllLabEntries", LabEntryController.getAllLabEntries)

// GET a single lab entry by ID
router.get("/getLabEntry/:id", LabEntryController.getLabEntry)

// POST create a new lab entry
router.post("/labEntry", LabEntryController.createLabEntry)

// PUT update an existing lab entry
router.put("/updateLabEntry/:id", LabEntryController.updateLabEntry)

// DELETE a lab entry
router.delete("/deleteLabEntry/:id", LabEntryController.deleteLabEntry)

export default router

