import express from "express";
import { AddProjects, GetProjects } from "../Controllers/Project.js";
const router = express.Router();

router.get("/", GetProjects);
router.post("/add", AddProjects);

export default router;
 