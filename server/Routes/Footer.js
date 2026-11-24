import express from "express";
import { AddFooter, GetFooter } from "../Controllers/Footer.js";
const router = express.Router();

router.get("/", GetFooter);
router.post("/add", AddFooter);

export default router;
