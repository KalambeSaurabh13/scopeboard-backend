import pool from "../config/db.js";
import { createPurchaseOrder, createPurchaseOrderItem} from "../repositories/purchaseOrderRepository.js";

export const createPurchaseOrderWithItems = async(data) =>{
    const client = await pool.connect();

    try{
        await client.query('BEGIN');

        const totalAmount = data.items.reduce((total, item ) => total + (item.quantity * item.unitPrice), 0);
        const purchaseOrder = await createPurchaseOrder(client, data.vendorName, totalAmount);

        const createdItems = [];

    for (const item of data.items) {
      const createdItem = await createPurchaseOrderItem(
        client,
        purchaseOrder.id,
        item
      );

      createdItems.push(createdItem);
    }

    // Save all changes
    await client.query("COMMIT");

    return {
      ...purchaseOrder,
      items: createdItems
    };

  } catch (error) {
  try {
    await client.query("ROLLBACK");
  } catch (rollbackError) {
    console.error("Rollback failed:", rollbackError);
  }

  throw error;
} finally {
  client.release();
}
}