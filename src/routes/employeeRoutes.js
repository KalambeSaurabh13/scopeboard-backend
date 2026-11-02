
import { Router } from "express";

import {
  getEmployees,
  getEmployee,
  addEmployee,
  editEmployee,
  partiallyEditEmployee,
  getEmployeeByDepartment,
  removeEmployee,
  getEmployeeByMinSalaryAmount,
} from "../controllers/employeeController.js";

const router = Router();

// GET employees by department
router.get("/department/:department", getEmployeeByDepartment);

// GET employees by minimum salary
router.get("/salary/:amount", getEmployeeByMinSalaryAmount);

// GET all employees
router.get("/", getEmployees);

// GET employee by ID
router.get("/:id", getEmployee);

// POST create employee
router.post("/", addEmployee);

// PUT update complete employee
router.put("/:id", editEmployee);

// PATCH update selected employee fields
router.patch("/:id", partiallyEditEmployee);

// DELETE employee
router.delete("/:id", removeEmployee);

export default router;
