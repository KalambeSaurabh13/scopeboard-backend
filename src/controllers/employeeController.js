
import {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  patchEmployee,
  deleteEmployee,
  getEmployeesByDepartment,
  getEmployeesByMinSalaryAmount,
} from "../utils/employeeUtils.js";

// Validate employee details
const isValidEmployee = (body) => {
  return (
    typeof body.name === "string" &&
    body.name.trim().length > 0 &&
    typeof body.department === "string" &&
    body.department.trim().length > 0 &&
    typeof body.salary === "number" &&
    Number.isFinite(body.salary) &&
    body.salary >= 0
  );
};

// GET all employees
export const getEmployees = (req, res) => {
  const employees = getAllEmployees();

  res.status(200).json({
    success: true,
    count: employees.length,
    data: employees,
  });
};

// GET employee by ID
export const getEmployee = (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    res.status(400).json({
      success: false,
      message: "Invalid employee ID",
    });
    return;
  }

  const employee = getEmployeeById(id);

  if (!employee) {
    res.status(404).json({
      success: false,
      message: "Employee not found",
    });
    return;
  }

  res.status(200).json({
    success: true,
    data: employee,
  });
};

// POST create employee
export const addEmployee = (req, res) => {
  if (!isValidEmployee(req.body)) {
    res.status(400).json({
      success: false,
      message: "Please provide valid employee details",
    });
    return;
  }

  const employee = createEmployee(req.body);

  res.status(201).json({
    success: true,
    message: "Employee created successfully",
    data: employee,
  });
};

// PUT update complete employee
export const editEmployee = (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    res.status(400).json({
      success: false,
      message: "Invalid employee ID",
    });
    return;
  }

  if (!isValidEmployee(req.body)) {
    res.status(400).json({
      success: false,
      message: "Please provide complete valid employee details",
    });
    return;
  }

  const employee = updateEmployee(id, req.body);

  if (!employee) {
    res.status(404).json({
      success: false,
      message: "Employee not found",
    });
    return;
  }

  res.status(200).json({
    success: true,
    message: "Employee updated successfully",
    data: employee,
  });
};

// PATCH update selected employee fields
export const partiallyEditEmployee = (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    res.status(400).json({
      success: false,
      message: "Invalid employee ID",
    });
    return;
  }

  const body = req.body;

  const allowedFields = ["name", "department", "salary"];

  if (
    !body ||
    typeof body !== "object" ||
    Array.isArray(body) ||
    Object.keys(body).length === 0 ||
    Object.keys(body).some((key) => !allowedFields.includes(key))
  ) {
    res.status(400).json({
      success: false,
      message: "Provide at least one valid employee field",
    });
    return;
  }

  if (
    ("name" in body &&
      (typeof body.name !== "string" || !body.name.trim())) ||
    ("department" in body &&
      (typeof body.department !== "string" ||
        !body.department.trim())) ||
    ("salary" in body &&
      (typeof body.salary !== "number" ||
        !Number.isFinite(body.salary) ||
        body.salary < 0))
  ) {
    res.status(400).json({
      success: false,
      message: "Invalid employee field value",
    });
    return;
  }

  const employee = patchEmployee(id, body);

  if (!employee) {
    res.status(404).json({
      success: false,
      message: "Employee not found",
    });
    return;
  }

  res.status(200).json({
    success: true,
    message: "Employee partially updated successfully",
    data: employee,
  });
};

// DELETE employee
export const removeEmployee = (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id <= 0) {
    res.status(400).json({
      success: false,
      message: "Invalid employee ID",
    });
    return;
  }

  const deleted = deleteEmployee(id);

  if (!deleted) {
    res.status(404).json({
      success: false,
      message: "Employee not found",
    });
    return;
  }

  res.status(200).json({
    success: true,
    message: "Employee deleted successfully",
  });
};

// GET employees by department
export const getEmployeeByDepartment = (req, res) => {
  const department = req.params.department;

  console.log("Department:", department);

  if (!department) {
    res.status(400).json({
      success: false,
      message: "Department parameter is required",
    });
    return;
  }

  const employees = getEmployeesByDepartment(department);

  res.status(200).json({
    success: true,
    message: "Employees retrieved successfully",
    data: employees,
  });
};

// GET employees by minimum salary
export const getEmployeeByMinSalaryAmount = (req, res) => {
  const salaryAmount = Number(req.params.salaryAmount);

  if (!Number.isFinite(salaryAmount) || salaryAmount < 0) {
    res.status(400).json({
      success: false,
      message: "Invalid salary amount",
    });
    return;
  }

  const employees = getEmployeesByMinSalaryAmount(salaryAmount);

  res.status(200).json({
    success: true,
    message: "Employees retrieved successfully",
    data: employees,
  });
};
