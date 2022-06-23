import { cakeSchema, imageSchema } from "../schemas/cakeSchema.js";
import db from "../config/db.js";

export async function postCakeValidation(req, res, next) {
    const body = req.body;

    const validation = cakeSchema.validate(body, { abortEarly: false });
    if(validation.error) {
        return res.status(400).send({
            error: validation.error.details.map((err) => err.message)
        });
    };

    const exists = await db.query(`SELECT * FROM cakes WHERE name = $1`, [body.name]);
    if(exists.rows.length !== 0) {
        return res.sendStatus(409);
    };

    next();
};

export function imageValidation(req, res, next) {
    const {image} = req.body;

    const validation = imageSchema.validate({image}, { abortEarly: false });
    if(validation.error) {
        return res.status(422).send(validation.error.details[0].message);
    };

    next();
};