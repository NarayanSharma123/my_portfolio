import express from "express";
import { GetSkills } from "../Controllers/Skills.js";
const router = express.Router();

router.get("/", GetSkills);

export default router;
