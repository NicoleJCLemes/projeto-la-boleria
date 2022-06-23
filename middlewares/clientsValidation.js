import { clientSchema } from "../schemas/clientSchema.js";

export async function postClientValidation(req, res, next) {
    const body = req.body;

    const validation = clientSchema.validate(body, {abortEarly: false});
    if(validation.error) {
        return res.status(400).send({
            error: validation.error.details.map((err) => err.message)
        });
    };

    next();
}