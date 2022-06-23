import Joi from "joi";

const clientSchema = Joi.object({
    name: Joi.string().min(1).required(),
    address: Joi.string().min(1).required(),
    phone: Joi.string().pattern(/^[0-9]{10,11}$/).required()
});

export { clientSchema }