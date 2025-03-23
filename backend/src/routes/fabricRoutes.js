import express from "express";
import {
  getFabrics,
  getFabric,
  addFabric,
  updateFabricDetails,
  deleteFabricDetails,
} from "../controllers/fabricController.js";

const router = express.Router();

router.get("/", getFabrics);
router.get("/:id", getFabric);
router.post("/", addFabric);
router.put("/:id", updateFabricDetails);
router.delete("/:id", deleteFabricDetails);

export default router;

