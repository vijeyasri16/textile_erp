import * as goodsInwardsModel from "../models/goodsInwardsModel.js"

// Create a new goods inwards record
export const createGoodsInwards = async (req, res) => {
  try {
    const data = req.body
    const goodsInwards = await goodsInwardsModel.createGoodsInwards(data)
    res.status(201).json(goodsInwards)
  } catch (error) {
    console.error("Error creating goods inwards:", error)
    res.status(500).json({ message: "Failed to create goods inwards record", error: error.message })
  }
}

// Get all goods inwards records
export const getAllGoodsInwards = async (req, res) => {
  try {
    const goodsInwardsList = await goodsInwardsModel.getAllGoodsInwards()
    res.status(200).json(goodsInwardsList)
  } catch (error) {
    console.error("Error fetching goods inwards records:", error)
    res.status(500).json({ message: "Failed to fetch goods inwards records", error: error.message })
  }
}

// Get a single goods inwards record by ID
export const getGoodsInwardsById = async (req, res) => {
  try {
    const { id } = req.params
    const goodsInwards = await goodsInwardsModel.getGoodsInwardsById(id)

    if (!goodsInwards) {
      return res.status(404).json({ message: "Goods inwards record not found" })
    }

    res.status(200).json(goodsInwards)
  } catch (error) {
    console.error("Error fetching goods inwards record:", error)
    res.status(500).json({ message: "Failed to fetch goods inwards record", error: error.message })
  }
}

// Update a goods inwards record
export const updateGoodsInwards = async (req, res) => {
  try {
    const { id } = req.params
    const data = req.body

    // Check if record exists
    const existingRecord = await goodsInwardsModel.getGoodsInwardsById(id)
    if (!existingRecord) {
      return res.status(404).json({ message: "Goods inwards record not found" })
    }

    const updatedGoodsInwards = await goodsInwardsModel.updateGoodsInwards(id, data)
    res.status(200).json(updatedGoodsInwards)
  } catch (error) {
    console.error("Error updating goods inwards record:", error)
    res.status(500).json({ message: "Failed to update goods inwards record", error: error.message })
  }
}

// Delete a goods inwards record
export const deleteGoodsInwards = async (req, res) => {
  try {
    const { id } = req.params

    // Check if record exists
    const existingRecord = await goodsInwardsModel.getGoodsInwardsById(id)
    if (!existingRecord) {
      return res.status(404).json({ message: "Goods inwards record not found" })
    }

    await goodsInwardsModel.deleteGoodsInwards(id)
    res.status(200).json({ message: "Goods inwards record deleted successfully" })
  } catch (error) {
    console.error("Error deleting goods inwards record:", error)
    res.status(500).json({ message: "Failed to delete goods inwards record", error: error.message })
  }
}

