import express from "express"
import * as goodsInwardsController from "../controllers/goodsInwardsController.js"

const router = express.Router()

// Create a new goods inwards record
router.post("/goodsinwards", goodsInwardsController.createGoodsInwards)

// Get all goods inwards records
router.get("/goodsinwards", goodsInwardsController.getAllGoodsInwards)

// Get a single goods inwards record by ID
router.get("/goodsinwards/:id", goodsInwardsController.getGoodsInwardsById)

// Update a goods inwards record
router.put("/goodsinwards/:id", goodsInwardsController.updateGoodsInwards)

// Delete a goods inwards record
router.delete("/goodsinwards/:id", goodsInwardsController.deleteGoodsInwards)

export default router

