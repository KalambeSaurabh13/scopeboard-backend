import {
  createPurchaseOrderWithItems
} from "../services/purchaseOrderService.js";

export const createPurchaseOrder = async (req, res) => {
  const purchaseOrder = await createPurchaseOrderWithItems(req.body);

  res.status(201).json({
    success: true,
    message: "Purchase order created successfully",
    data: purchaseOrder
  });
};