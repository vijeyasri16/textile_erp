import express from "express";
import * as deliveryController from "../controllers/deliveryController.js";

const router = express.Router();

// Create a new delivery entry
router.post("/delivery", deliveryController.createDeliveryEntry);

// Get all deliveries
router.get("/delivery", deliveryController.getAllDeliveries);

// Get delivery by ID
router.get("/delivery:id", deliveryController.getDeliveryById);

// Update delivery
router.put("/delivery:id", deliveryController.updateDelivery);

// Delete delivery
router.delete("/delivery:id", deliveryController.deleteDelivery);

export default router;