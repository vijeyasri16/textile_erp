import express from 'express'
import { CollectionController } from '../controllers/collectionController.js'

const router = express.Router()

// Get all collections
router.get('/collection', CollectionController.getAllCollections)

// Get bill details for a specific bill number
router.get('/getBillDetails', CollectionController.getBillDetails)

// Get a single collection by ID
router.get('/collection/:id', CollectionController.getCollection)

// Create a new collection
router.post('/collection', CollectionController.createCollection)

// Update an existing collection
router.put('/collection/:id', CollectionController.updateCollection)

// Delete a collection
router.delete('/collection/:id', CollectionController.deleteCollection)

export default router