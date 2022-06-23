import { Router } from "express";
import { getOrders, getOrdersById, postOrder } from "../controllers/ordersController.js";
import { postOrderValidation } from "../middlewares/ordersValidation.js";

const ordersRouter = Router();

ordersRouter.get("/orders", getOrders);
ordersRouter.get("/orders/:id", getOrdersById);
ordersRouter.post("/order", postOrderValidation, postOrder);

export default ordersRouter;