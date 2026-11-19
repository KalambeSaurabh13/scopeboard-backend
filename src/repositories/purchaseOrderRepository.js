export const createPurchaseOrder = async( client, vendorName, totalAmount) =>{

    const query = `
     INSERT INTO purchase_orders (vendor_name, total_amount)
     VALUES ($1, $2)    
     RETURNING *;
    `;
        
    const result = await client.query(query, [vendorName, totalAmount]);
    return result.rows[0];


}

export const createPurchaseOrderItem = async (client, purchaseOrderId, item) => {

    const query = `
    INSERT INTO purchase_order_items(purchase_order_id, product_name, quantity, unit_price)
    VALUES($1, $2, $3, $4)
    RETURNING *;
    `;

    const result = await client.query(query, [purchaseOrderId, item.productName, item.quantity, item.unitPrice]);
    return result.rows[0];

}