import { orderSchema } from "../schemas/orderSchema.js";
import db from "../config/db.js";

export async function postOrderValidation(req, res, next) {
    const body = req.body;

    const validation = orderSchema.validate(body, {abortEarly: false});
    if(validation.error) {
        return res.status(400).send({
            error: validation.error.details.map((err) => err.message)
        });
    };

    const existClient = await db.query(`SELECT * FROM clients WHERE id = $1`, [body.clientId]);
    const existCake = await db.query(`SELECT * FROM cakes WHERE id = $1`, [body.cakeId]);

    if(existClient.rows.length === 0 || existCake.rows.length === 0) {
        return res.sendStatus(404);
    };

    next();
}