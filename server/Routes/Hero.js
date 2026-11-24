import express from "express";
import { AddHeroData, GetHeroData } from "../Controllers/Hero.js";
const router = express.Router();

router.get("/", GetHeroData);
router.post("/add", AddHeroData);

export default router;
