import type { Request, Response } from "express";

import {
  getAllEmployees,
  getEmployeeById,
  getEmployeesByDepartment,
} from "../utils/employeeUtils.js";

export const getEmployees = (req: Request, res: Response) => {
  const employees = getAllEmployees();

  res.status(200).json({
    success: true,
    count: employees.length,
    data: employees,
  });
};

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

export const getEmployeesByDept = (
  req: Request,
  res: Response
) => {
  const department = req.params.department ;

  const employees = getEmployeesByDepartment(department);

  res.status(200).json({
    success: true,
    count: employees.length,
    data: employees,
  });
};