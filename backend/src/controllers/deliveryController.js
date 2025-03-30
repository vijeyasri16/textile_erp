import * as deliveryModel from "../models/deliveryModel.js";

// Create a new delivery
export const createDelivery = async (req, res) => {
  try {
    const data = req.body;
    
    // Validate required fields
    if (!data.dlVNo || !data.dlDate || !data.dlCustomer) {
      return res.status(400).json({ 
        message: 'Required fields missing: V. No, Date, and Customer are required' 
      });
    }
    
    // Ensure deliveryDetails is an array
    if (!Array.isArray(data.deliveryDetails) || data.deliveryDetails.length === 0) {
      return res.status(400).json({ 
        message: 'At least one delivery detail is required' 
      });
    }
    
    const delivery = await deliveryModel.createDelivery(data);
    
    res.status(201).json(delivery);
  } catch (error) {
    console.error('Error creating delivery:', error);
    res.status(500).json({
      message: 'Failed to create delivery',
      error: error.message
    });
  }
};

// Get all deliveries
export const getAllDeliveries = async (req, res) => {
  try {
    const deliveries = await deliveryModel.getAllDeliveries();
    
    res.status(200).json(deliveries);
  } catch (error) {
    console.error('Error fetching deliveries:', error);
    res.status(500).json({
      message: 'Failed to fetch deliveries',
      error: error.message
    });
  }
};

// Get delivery by ID
export const getDeliveryById = async (req, res) => {
  try {
    const { id } = req.params;
    
    const delivery = await deliveryModel.getDeliveryById(id);
    
    if (!delivery) {
      return res.status(404).json({
        message: `Delivery with ID ${id} not found`
      });
    }
    
    res.status(200).json(delivery);
  } catch (error) {
    console.error(`Error fetching delivery with ID ${req.params.id}:`, error);
    res.status(500).json({
      message: 'Failed to fetch delivery',
      error: error.message
    });
  }
};

// Update delivery
export const updateDelivery = async (req, res) => {
  try {
    const { id } = req.params;
    const data = req.body;
    
    // Validate required fields
    if (!data.dlVNo || !data.dlDate || !data.dlCustomer) {
      return res.status(400).json({ 
        message: 'Required fields missing: V. No, Date, and Customer are required' 
      });
    }
    
    // Check if delivery exists
    const existingDelivery = await deliveryModel.getDeliveryById(id);
    if (!existingDelivery) {
      return res.status(404).json({
        message: `Delivery with ID ${id} not found`
      });
    }
    
    const updatedDelivery = await deliveryModel.updateDelivery(id, data);
    
    res.status(200).json(updatedDelivery);
  } catch (error) {
    console.error(`Error updating delivery with ID ${req.params.id}:`, error);
    res.status(500).json({
      message: 'Failed to update delivery',
      error: error.message
    });
  }
};

// Delete delivery
export const deleteDelivery = async (req, res) => {
  try {
    const { id } = req.params;
    
    // Check if delivery exists
    const existingDelivery = await deliveryModel.getDeliveryById(id);
    if (!existingDelivery) {
      return res.status(404).json({
        message: `Delivery with ID ${id} not found`
      });
    }
    
    await deliveryModel.deleteDelivery(id);
    
    res.status(200).json({
      message: 'Delivery deleted successfully'
    });
  } catch (error) {
    console.error(`Error deleting delivery with ID ${req.params.id}:`, error);
    res.status(500).json({
      message: 'Failed to delete delivery',
      error: error.message
    });
  }
};

// Create a new delivery entry
export const createDeliveryEntry = async (req, res) => {
  try {
    const data = req.body;
    
    // Validate required fields
    if (!data.dlVNo || !data.dlDate || !data.dlCustomer) {
      return res.status(400).json({ 
        message: 'Required fields missing: V. No, Date, and Customer are required' 
      });
    }
    
    // Ensure deliveryDetails is an array
    if (!Array.isArray(data.deliveryDetails) || data.deliveryDetails.length === 0) {
      return res.status(400).json({ 
        message: 'At least one delivery detail is required' 
      });
    }
    
    const delivery = await deliveryModel.createDelivery(data);
    
    res.status(201).json(delivery);
  } catch (error) {
    console.error('Error creating delivery entry:', error);
    res.status(500).json({
      message: 'Failed to create delivery entry',
      error: error.message
    });
  }
};