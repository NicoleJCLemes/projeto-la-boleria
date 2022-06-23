import Joi from "joi";

const cakeSchema = Joi.object({
    name: Joi.string().min(2).required(),
    price: Joi.number().positive().required(),
    description: Joi.string().allow(''),
    image: Joi.string().required()
});

const imageSchema = Joi.object({
    image: Joi.string().pattern(/((https?:\/\/)|(ftp:\/\/)|(^))([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+([a-zA-Z]{2,9})(:\d{1,4})?([-\w\/#~:.?+=&%@~]*)/)
});

export { cakeSchema, imageSchema }