import express from "express";
import {
  AddPrivacyByAdmin,
  GetPrivacyByAdmin,
} from "../../Controllers/Admin/PrivacyByAdmin.js";
const router = express.Router();

router.get("/", GetPrivacyByAdmin);
router.post("/add", AddPrivacyByAdmin);

export default router;
