import express from "express";
import { AddServices, GetServices } from "../Controllers/Services.js";
const router = express.Router();

router.get("/", GetServices);
router.post("/add", AddServices);

export default router;
