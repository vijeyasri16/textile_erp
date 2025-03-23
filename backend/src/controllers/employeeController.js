import {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  deleteEmployee,
} from "../models/employeeModel.js";

export const getEmployees = async (req, res) => {
  try {
    const employees = await getAllEmployees();
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: "Error fetching employees" });
  }
};

export const getEmployee = async (req, res) => {
  try {
    const employee = await getEmployeeById(req.params.id);
    if (!employee) return res.status(404).json({ error: "Employee not found" });
    res.json(employee);
  } catch (error) {
    res.status(500).json({ error: "Error fetching employee" });
  }
};

export const addEmployee = async (req, res) => {
  try {
    const { employeeId, name, password } = req.body;
    const newEmployee = await createEmployee({ employeeId, name, password });
    res.status(201).json(newEmployee);
  } catch (error) {
    res.status(500).json({ error: "Error creating employee" });
  }
};

export const updateEmployeeDetails = async (req, res) => {
  try {
    const updatedEmployee = await updateEmployee(req.params.id, req.body);
    res.json(updatedEmployee);
  } catch (error) {
    res.status(500).json({ error: "Error updating employee" });
  }
};

export const deleteEmployeeDetails = async (req, res) => {
  try {
    await deleteEmployee(req.params.id);
    res.json({ message: "Employee deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting employee" });
  }
};
