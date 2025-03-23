import express from "express";
import {
  getEmployees,
  getEmployee,
  addEmployee,
  updateEmployeeDetails,
  deleteEmployeeDetails,
} from "../controllers/employeeController.js";

const router = express.Router();

router.get("/", getEmployees);
router.get("/:id", getEmployee);
router.post("/", addEmployee);
router.put("/:id", updateEmployeeDetails);
router.delete("/:id", deleteEmployeeDetails);

export default router;
