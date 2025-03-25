import express from "express"
import * as goodsInwardsController from "../controllers/goodsInwardsController.js"

const router = express.Router()

// Create a new goods inwards record
router.post("/goodsInwards", goodsInwardsController.createGoodsInwards)

// Get all goods inwards records
router.get("/goodsInwards", goodsInwardsController.getAllGoodsInwards)

// Get a single goods inwards record by ID
router.get("/goodsInwards/:id", goodsInwardsController.getGoodsInwardsById)

// Update a goods inwards record
router.put("/goodsInwards/:id", goodsInwardsController.updateGoodsInwards)

// Delete a goods inwards record
router.delete("/goodsInwards/:id", goodsInwardsController.deleteGoodsInwards)

export default router

