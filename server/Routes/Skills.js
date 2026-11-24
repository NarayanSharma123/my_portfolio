import express from "express";
import { AddSkills, GetSkills } from "../Controllers/Skills.js";
const router = express.Router();

router.get("/", GetSkills);
router.post("/add", AddSkills);

export default router;
