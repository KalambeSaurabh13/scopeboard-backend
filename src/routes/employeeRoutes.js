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

router.get("/department/:department", getEmployeeByDepartment);
router.get("/salary/:amount", getEmployeeByMinSalaryAmount);

router.get("/", getEmployees);
router.get("/:id", getEmployee);

router.post("/", addEmployee);
router.put("/:id", editEmployee);
router.patch("/:id", partiallyEditEmployee);
router.delete("/:id", removeEmployee);

export default router;