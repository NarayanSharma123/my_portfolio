import express from "express";
import { GetFooter } from "../Controllers/Footer.js";
const router = express.Router();

router.get("/", GetFooter);

export default router;
