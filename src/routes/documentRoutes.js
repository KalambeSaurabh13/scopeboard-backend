
import { Router } from "express";
import upload from "../config/multer.js";
import { authenticateToken } from "../middleware/authMiddleware.js";
import authorizeRoles from "../middleware/authorizeRoles.js";

import {
    uploadDocument,
    getDocument
} from "../controllers/documentController.js";

const router = Router();

router.use(authenticateToken);

// Upload document

/**
 * @swagger
 * /api/documents/upload:
 *   post:
 *     summary: Upload a document
 *     tags:
 *       - Documents
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - document
 *             properties:
 *               document:
 *                 type: string
 *                 format: binary
 *     responses:
 *       201:
 *         description: Document uploaded successfully
 *       400:
 *         description: Invalid file or missing file
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Permission denied
 */

router.post(
    "/upload",
    authorizeRoles("ADMIN", "MANAGER"),
    upload.single("document"),
    uploadDocument
);

// Get document metadata

/**
 * @swagger
 * /api/documents/{id}:
 *   get:
 *     summary: Get document metadata
 *     tags:
 *       - Documents
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Document metadata retrieved
 *       401:
 *         description: Authentication required
 *       403:
 *         description: Permission denied
 *       404:
 *         description: Document not found
 */

router.get(
    "/:id",
    authorizeRoles("ADMIN", "MANAGER"),
    getDocument
);

export default router;
