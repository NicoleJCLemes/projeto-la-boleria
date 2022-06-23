import Joi from "joi";

const orderSchema = Joi.object({
    clientId: Joi.number().min(1).required(),
    cakeId: Joi.number().min(1).required(),
    quantity: Joi.number().integer().positive().less(5).required(),
    totalPrice: Joi.number().positive().required()
});

export { orderSchema }