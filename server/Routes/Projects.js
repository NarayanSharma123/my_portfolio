import express from "express";
import { GetProjects } from "../Controllers/Project.js";
const router = express.Router();

router.get("/", GetProjects);

export default router;
