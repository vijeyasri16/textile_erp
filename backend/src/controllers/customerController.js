import {
    getAllCustomers,
    getCustomerById,
    createCustomer,
    updateCustomer,
    deleteCustomer,
  } from "../models/customerModel.js";
  
  export const getCustomers = async (req, res) => {
    try {
      const customers = await getAllCustomers();
      res.json(customers);
    } catch (error) {
      res.status(500).json({ error: "Error fetching customers" });
    }
  };
  
  export const getCustomer = async (req, res) => {
    try {
      const customer = await getCustomerById(req.params.id);
      if (!customer) return res.status(404).json({ error: "Customer not found" });
      res.json(customer);
    } catch (error) {
      res.status(500).json({ error: "Error fetching customer" });
    }
  };
  
  export const addCustomer = async (req, res) => {
    try {
      const { name, phone, deliveryAddress } = req.body;
      const newCustomer = await createCustomer({ name, phone, deliveryAddress });
      res.status(201).json(newCustomer);
    } catch (error) {
      res.status(500).json({ error: "Error creating customer" });
    }
  };
  
  export const updateCustomerDetails = async (req, res) => {
    try {
      const updatedCustomer = await updateCustomer(req.params.id, req.body);
      res.json(updatedCustomer);
    } catch (error) {
      res.status(500).json({ error: "Error updating customer" });
    }
  };
  
  export const deleteCustomerDetails = async (req, res) => {
    try {
      await deleteCustomer(req.params.id);
      res.json({ message: "Customer deleted successfully" });
    } catch (error) {
      res.status(500).json({ error: "Error deleting customer" });
    }
  };
  