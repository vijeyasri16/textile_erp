import express from "express";
import {
  getMachines,
  getMachine,
  addMachine,
  updateMachineDetails,
  deleteMachineDetails,
} from "../controllers/machineController.js";

const router = express.Router();

router.get("/", getMachines);
router.get("/:id", getMachine);
router.post("/", addMachine);
router.put("/:id", updateMachineDetails);
router.delete("/:id", deleteMachineDetails);

export default router;
