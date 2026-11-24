import express from "express";
import {
  AddFooterByAdmin,
  GetFooterByAdmin,
} from "../../Controllers/Admin/FooterByAdmin.js";
const router = express.Router();

router.get("/", GetFooterByAdmin);
router.post("/add", AddFooterByAdmin);

export default router;
