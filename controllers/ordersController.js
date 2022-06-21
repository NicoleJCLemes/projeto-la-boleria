import db from "../config/db.js"

export async function getOrders(req, res) {
    
    try {

        const orders = await db.query("SELECT * FROM orders");
        res.status(200).send(orders.rows)
        
    } catch (error) {
        
        console.log(error);
        res.sendStatus(500);
        
    }
}