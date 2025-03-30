// finishingRoutes.js
import express from 'express'
import { FinishingEntryController } from '../controllers/finishingController.js'

const router = express.Router()

// Get all finishing entries
router.get('/getAllFinishingEntries', FinishingEntryController.getAllFinishingEntries)

// Get a single finishing entry by ID
router.get('/getFinishingEntry/:id', FinishingEntryController.getFinishingEntry)

// Create a new finishing entry
router.post('/finishingEntry', FinishingEntryController.createFinishingEntry)

// Update an existing finishing entry
router.put('/updateFinishingEntry/:id', FinishingEntryController.updateFinishingEntry)

// Delete a finishing entry
router.delete('/deleteFinishingEntry/:id', FinishingEntryController.deleteFinishingEntry)

export default router