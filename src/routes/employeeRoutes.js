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
import authorizeRoles from "../middleware/authorizeRoles.js";
import {
  authenticateToken
} from "../middleware/authMiddleware.js";
import validateEmployee from "../middleware/validateEmployee.js";
const router = Router();

// All routes require authentication
router.use(authenticateToken);

/**
 * @swagger
 * /api/employees:
 *   get:
 *     summary: Get all employees
 *     description: Retrieve all employees. Accessible by Admin and Manager.
 *     tags:
 *       - Employees
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Employees retrieved successfully
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Permission denied
 */
router.get("/", authorizeRoles("ADMIN", "MANAGER"), getEmployees);

// ADMIN and MANAGER can view an employee record
/**
 * @swagger
 * /api/employees/{id}:
 *   get:
 *     summary: Get employee by ID
 *     description: Retrieve a specific employee using employee ID.
 *     tags:
 *       - Employees
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Employee ID
 *     responses:
 *       200:
 *         description: Employee retrieved successfully
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Permission denied
 *       404:
 *         description: Employee not found
 */
router.get("/:id", authorizeRoles("ADMIN", "MANAGER"), getEmployee);

// Only ADMIN can create employees
/**
 * @swagger
 * /api/employees:
 *   post:
 *     summary: Create a new employee
 *     description: Create an employee. Only Admin can access this endpoint.
 *     tags:
 *       - Employees
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - department
 *               - salary
 *             properties:
 *               name:
 *                 type: string
 *                 example: Rahul Sharma
 *               department:
 *                 type: string
 *                 example: IT
 *               salary:
 *                 type: number
 *                 example: 50000
 *     responses:
 *       201:
 *         description: Employee created successfully
 *       400:
 *         description: Invalid employee data
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Admin permission required
 */
router.post("/", authorizeRoles("ADMIN"), validateEmployee, addEmployee);

// ADMIN and MANAGER can update employees
/**
 * @swagger
 * /api/employees/{id}:
 *   put:
 *     summary: Update employee
 *     description: Update the complete employee record. Accessible by Admin and Manager.
 *     tags:
 *       - Employees
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Employee ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Rahul Sharma
 *               department:
 *                 type: string
 *                 example: Finance
 *               salary:
 *                 type: number
 *                 example: 60000
 *     responses:
 *       200:
 *         description: Employee updated successfully
 *       400:
 *         description: Invalid employee data
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Permission denied
 *       404:
 *         description: Employee not found
 */
router.put("/:id", authorizeRoles("ADMIN", "MANAGER"), editEmployee);

// Only ADMIN can delete employees
/**
 * @swagger
 * /api/employees/{id}:
 *   delete:
 *     summary: Delete employee
 *     description: Delete an employee. Only Admin can access this endpoint.
 *     tags:
 *       - Employees
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Employee ID
 *     responses:
 *       200:
 *         description: Employee deleted successfully
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Admin permission required
 *       404:
 *         description: Employee not found
 */
router.delete("/:id", authorizeRoles("ADMIN"), removeEmployee);
/**
 * @swagger
 * /api/employees/department/{department}:
 *   get:
 *     summary: Get employees by department
 *     description: Retrieve employees belonging to a specific department.
 *     tags:
 *       - Employees
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: department
 *         required: true
 *         schema:
 *           type: string
 *         example: IT
 *         description: Department name
 *     responses:
 *       200:
 *         description: Employees retrieved successfully
 *       401:
 *         description: Authentication required
 *       404:
 *         description: No employees found
 */
router.get("/department/:department", getEmployeeByDepartment);



/**
 * @swagger
 * /api/employees/salary/{amount}:
 *   get:
 *     summary: Get employees by minimum salary
 *     description: Retrieve employees whose salary is greater than or equal to the specified amount.
 *     tags:
 *       - Employees
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: amount
 *         required: true
 *         schema:
 *           type: number
 *         example: 50000
 *         description: Minimum salary amount
 *     responses:
 *       200:
 *         description: Employees retrieved successfully
 *       400:
 *         description: Invalid salary amount
 *       401:
 *         description: Authentication required
 *       404:
 *         description: No employees found
 */
router.get("/salary/:amount", getEmployeeByMinSalaryAmount);



/**
 * @swagger
 * /api/employees/{id}:
 *   patch:
 *     summary: Partially update employee
 *     description: Update selected employee fields without replacing the entire record.
 *     tags:
 *       - Employees
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Employee ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Rahul Sharma
 *               department:
 *                 type: string
 *                 example: HR
 *               salary:
 *                 type: number
 *                 example: 55000
 *     responses:
 *       200:
 *         description: Employee partially updated successfully
 *       400:
 *         description: Invalid employee data
 *       401:
 *         description: Authentication required
 *       404:
 *         description: Employee not found
 */

router.patch("/:id", partiallyEditEmployee);


export default router;