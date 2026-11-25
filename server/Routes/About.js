import express from "express";
import { GetAboutMe } from "../Controllers/About.js";
const router = express.Router();

router.get("/", GetAboutMe);

export default router;
