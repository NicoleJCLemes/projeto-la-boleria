import { Router } from "express";
import { postClient, getOrderByClient } from "../controllers/clientsController.js";
import { postClientValidation } from "../middlewares/clientsValidation.js";

const clientsRouter = Router();

clientsRouter.post("/clients", postClientValidation, postClient);
clientsRouter.get("/clients/:id/orders", getOrderByClient);

export default clientsRouter