import { Router } from "express";

import {
  getEmployees,
  getEmployee,
  getEmployeesByDept,
} from "../controllers/employeeController.js";

const router = Router();

// Get employees by department
router.get("/department/:department", getEmployeesByDept);

// Get all employees
router.get("/", getEmployees);

// Get employee by ID
router.get("/:id", getEmployee);

export default router;