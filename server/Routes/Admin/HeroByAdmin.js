import express from "express";
import {
  AddHeroByAdmin,
  GetHeroByAdmin,
} from "../../Controllers/Admin/HeroByAdmin.js";
import upload from "../../Middleware/upload.js";
const router = express.Router();

router.get("/", GetHeroByAdmin);
router.post(
  "/add",
  upload.fields([
    { name: "profileImage", maxCount: 1 },
    { name: "resume", maxCount: 1 },
  ]),
  AddHeroByAdmin,
);

export default router;
