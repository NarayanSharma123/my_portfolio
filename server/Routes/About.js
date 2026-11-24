import express from "express";
import { AddAboutMe, GetAboutMe } from "../Controllers/About.js";
const router = express.Router();

router.get("/", GetAboutMe);
router.post("/add", AddAboutMe);

export default router;
