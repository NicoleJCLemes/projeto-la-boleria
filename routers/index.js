import { Router } from "express";
import ordersRouter from "./ordersRouter.js";

const router = Router();

router.use(ordersRouter);

export default router;