import express from "express";
import { GetHeroData } from "../Controllers/Hero.js";
const router = express.Router();

router.get("/", GetHeroData);

export default router;
