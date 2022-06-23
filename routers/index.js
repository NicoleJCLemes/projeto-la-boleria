import { Router } from "express";
import ordersRouter from "./ordersRouter.js";
import cakesRouter from "./cakesRouter.js";
import clientsRouter from "./clientsRouter.js";

const router = Router();

router.use(ordersRouter);
router.use(cakesRouter);
router.use(clientsRouter);

export default router;