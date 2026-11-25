import express from "express";
import { GetServices } from "../Controllers/Services.js";
const router = express.Router();

router.get("/", GetServices);

export default router;
