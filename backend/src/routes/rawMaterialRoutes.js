import express from "express";
import {
    getRawMaterials,
    getRawMaterial,
    addRawMaterial,
    updateRawMaterialDetails,
    deleteRawMaterialDetails,
} from "../controllers/rawMaterialController.js";

const router = express.Router();

router.get("/", getRawMaterials);
router.get("/:id", getRawMaterial);
router.post("/", addRawMaterial);
router.put("/:id", updateRawMaterialDetails);
router.delete("/:id", deleteRawMaterialDetails);

export default router;
