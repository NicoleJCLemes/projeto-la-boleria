import { Router } from "express";
import { postCake } from "../controllers/cakesController.js";
import { postCakeValidation, imageValidation } from "../middlewares/cakesValidation.js";

const cakesRouter = Router();

cakesRouter.post("/cakes", imageValidation, postCakeValidation, postCake);

export default cakesRouter