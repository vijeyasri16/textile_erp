import express from 'express';
import { GoodsInwardController } from '../controllers/goodsInward.controller.js';

const router = express.Router();

// GET all goods inward records
router.get('/goodsinward', GoodsInwardController.getAllGoodsInwards);

// GET a single goods inward record by ID
router.get('/goodsinward/:id', GoodsInwardController.getGoodsInwardById);

// POST create a new goods inward record
router.post('/goodsinward', GoodsInwardController.createGoodsInward);

// PUT update an existing goods inward record
router.put('/goodsinward/:id', GoodsInwardController.updateGoodsInward);

// DELETE a goods inward record
router.delete('/goodsinward/:id', GoodsInwardController.deleteGoodsInward);

export default router;