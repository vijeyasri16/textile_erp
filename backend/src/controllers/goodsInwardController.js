import { GoodsInwardModel } from '../models/goodsInward.model.js';

export const GoodsInwardController = {
  // Get all goods inward records
  getAllGoodsInwards: async (req, res) => {
    try {
      const goodsInwards = await GoodsInwardModel.findAll();
      res.status(200).json(goodsInwards);
    } catch (error) {
      console.error('Error fetching goods inwards:', error);
      res.status(500).json({ message: 'Failed to fetch goods inwards', error: error.message });
    }
  },

  // Get a single goods inward record by ID
  getGoodsInwardById: async (req, res) => {
    try {
      const { id } = req.params;
      const goodsInward = await GoodsInwardModel.findById(id);
      
      if (!goodsInward) {
        return res.status(404).json({ message: 'Goods inward record not found' });
      }
      
      res.status(200).json(goodsInward);
    } catch (error) {
      console.error('Error fetching goods inward:', error);
      res.status(500).json({ message: 'Failed to fetch goods inward', error: error.message });
    }
  },

  // Create a new goods inward record
  createGoodsInward: async (req, res) => {
    try {
      const goodsInwardData = req.body;
      const newGoodsInward = await GoodsInwardModel.create(goodsInwardData);
      res.status(201).json(newGoodsInward);
    } catch (error) {
      console.error('Error creating goods inward:', error);
      res.status(500).json({ message: 'Failed to create goods inward', error: error.message });
    }
  },

  // Update an existing goods inward record
  updateGoodsInward: async (req, res) => {
    try {
      const { id } = req.params;
      const goodsInwardData = req.body;
      
      // Check if record exists
      const existingGoodsInward = await GoodsInwardModel.findById(id);
      if (!existingGoodsInward) {
        return res.status(404).json({ message: 'Goods inward record not found' });
      }
      
      const updatedGoodsInward = await GoodsInwardModel.update(id, goodsInwardData);
      res.status(200).json(updatedGoodsInward);
    } catch (error) {
      console.error('Error updating goods inward:', error);
      res.status(500).json({ message: 'Failed to update goods inward', error: error.message });
    }
  },

  // Delete a goods inward record
  deleteGoodsInward: async (req, res) => {
    try {
      const { id } = req.params;
      
      // Check if record exists
      const existingGoodsInward = await GoodsInwardModel.findById(id);
      if (!existingGoodsInward) {
        return res.status(404).json({ message: 'Goods inward record not found' });
      }
      
      await GoodsInwardModel.delete(id);
      res.status(200).json({ message: 'Goods inward record deleted successfully' });
    } catch (error) {
      console.error('Error deleting goods inward:', error);
      res.status(500).json({ message: 'Failed to delete goods inward', error: error.message });
    }
  }
};