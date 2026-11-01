import type { Request, Response } from "express";

import {
  getAllEmployees,
  getEmployeeById,
  createEmployee,
  updateEmployee,
  patchEmployee,
  deleteEmployee,
} from "../utils/employeeUtils.js";

const isValidEmployee = (body: any): boolean => {
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
export const getEmployees = (req: Request, res: Response) => {
  const employees = getAllEmployees();

  res.status(200).json({
    success: true,
    count: employees.length,
    data: employees,
  });
};

// GET employee by ID
export const getEmployee = (req: Request, res: Response) => {
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
export const addEmployee = (req: Request, res: Response) => {
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
export const editEmployee = (req: Request, res: Response) => {
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
export const partiallyEditEmployee = (
  req: Request,
  res: Response
) => {
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
      (typeof body.department !== "string" || !body.department.trim())) ||
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
export const removeEmployee = (req: Request, res: Response) => {
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