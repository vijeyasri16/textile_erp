import express from "express";
import {
  getSuppliers,
  getSupplier,
  addSupplier,
  updateSupplierDetails,
  deleteSupplierDetails,
} from "../controllers/supplierController.js";

const router = express.Router();

router.get("/", getSuppliers);
router.get("/:id", getSupplier);
router.post("/", addSupplier);
router.put("/:id", updateSupplierDetails);
router.delete("/:id", deleteSupplierDetails);

export default router;
