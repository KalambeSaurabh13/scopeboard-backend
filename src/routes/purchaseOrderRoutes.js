import express from "express";

import {
  createPurchaseOrder
} from "../controllers/purchaseOrderController.js";
import {
  authenticateToken
} from "../middleware/authMiddleware.js";

const router = express.Router();
router.use(authenticateToken);

router.post("/", createPurchaseOrder);

export default router;