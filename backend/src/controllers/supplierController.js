import {
  getAllSuppliers,
  getSupplierById,
  createSupplier,
  updateSupplier,
  deleteSupplier,
} from "../models/supplierModel.js";

export const getSuppliers = async (req, res) => {
  try {
    const suppliers = await getAllSuppliers();
    res.json(suppliers);
  } catch (error) {
    res.status(500).json({ error: "Error fetching suppliers" });
  }
};

export const getSupplier = async (req, res) => {
  try {
    const supplier = await getSupplierById(req.params.id);
    if (!supplier) return res.status(404).json({ error: "Supplier not found" });
    res.json(supplier);
  } catch (error) {
    res.status(500).json({ error: "Error fetching supplier" });
  }
};

export const addSupplier = async (req, res) => {
  try {
    const { name, phone, supplierAddress } = req.body;
    const newSupplier = await createSupplier({ name, phone, supplierAddress });
    res.status(201).json(newSupplier);
  } catch (error) {
    res.status(500).json({ error: "Error creating supplier" });
  }
};

export const updateSupplierDetails = async (req, res) => {
  try {
    const updatedSupplier = await updateSupplier(req.params.id, req.body);
    res.json(updatedSupplier);
  } catch (error) {
    res.status(500).json({ error: "Error updating supplier" });
  }
};

export const deleteSupplierDetails = async (req, res) => {
  try {
    await deleteSupplier(req.params.id);
    res.json({ message: "Supplier deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting supplier" });
  }
};
