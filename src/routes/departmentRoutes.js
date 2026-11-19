import { Router } from "express";

import {
    getDepartments
} from "../controllers/departmentController.js";

import {
    authenticateToken
} from "../middleware/authMiddleware.js";

const router = Router();

router.get("/", authenticateToken, getDepartments);

export default router;