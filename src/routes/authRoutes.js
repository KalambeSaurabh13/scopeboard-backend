import express from "express";

import {
  register,
  login,
  getCurrentUser
} from "../controllers/authController.js";

import {
  authenticateToken
} from "../middleware/authMiddleware.js";
import { loginLimiter } from "../middleware/rateLimitMiddleware.js";


const router = express.Router();

router.post("/register", register);
/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Login user
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: admin@test.com
 *               password:
 *                 type: string
 *                 example: YourPassword123
 *     responses:
 *       200:
 *         description: Login successful. Returns user information and JWT.
 *       401:
 *         description: Invalid credentials
 */

router.post("/login", loginLimiter, login);

// Protected route
router.get("/me", authenticateToken, getCurrentUser);

export default router;