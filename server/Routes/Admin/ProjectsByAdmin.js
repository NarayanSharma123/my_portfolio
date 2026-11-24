import express from "express";
import {
  AddProjectsByAdmin,
  GetProjectsByAdmin,
} from "../../Controllers/Admin/ProjectByAdmin.js";
const router = express.Router();

router.get("/", GetProjectsByAdmin);
router.post("/add", AddProjectsByAdmin);

export default router;
