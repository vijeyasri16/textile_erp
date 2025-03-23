import express from "express";
import {
  getCustomers,
  getCustomer,
  addCustomer,
  updateCustomerDetails,
  deleteCustomerDetails,
} from "../controllers/customerController.js";

const router = express.Router();

router.get("/", getCustomers);
router.get("/:id", getCustomer);
router.post("/", addCustomer);
router.put("/:id", updateCustomerDetails);
router.delete("/:id", deleteCustomerDetails);

export default router;
