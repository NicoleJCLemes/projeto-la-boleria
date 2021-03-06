import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import router from "./routers/index.js";

const app = express();
app.use(express.json());
app.use(cors());
app.use(router);

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log("The server is running on port " + PORT))