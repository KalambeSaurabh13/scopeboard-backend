import { Router } from "express";

import {
  getEmployees,
  getEmployee,
  addEmployee,
  editEmployee,
  partiallyEditEmployee,
  removeEmployee,
} from "../controllers/employeeController.js";

const router = Router();

router.get("/", getEmployees);
router.get("/:id", getEmployee);

router.post("/", addEmployee);

router.put("/:id", editEmployee);
router.patch("/:id", partiallyEditEmployee);

router.delete("/:id", removeEmployee);

export default router;