import express from "express";
import {
  AddAboutByAdmin,
  GetAboutByAdmin,
} from "../../Controllers/Admin/AboutByAdmin.js";
const router = express.Router();

router.get("/", GetAboutByAdmin);
router.post("/add", AddAboutByAdmin);

export default router;
