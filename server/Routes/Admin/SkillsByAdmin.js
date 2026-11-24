import express from "express";
import {
  AddSkillsByAdmin,
  GetSkillsByAdmin,
} from "../../Controllers/Admin/SkillsByAdmin.js";
const router = express.Router();

router.get("/", GetSkillsByAdmin);
router.post("/add", AddSkillsByAdmin);

export default router;
