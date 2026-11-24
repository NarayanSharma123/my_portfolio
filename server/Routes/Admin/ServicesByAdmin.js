import express from "express";
import {
  AddServicesByAdmin,
  GetServicesByAdmin,
} from "../../Controllers/Admin/ServicesByAdmin.js";
const router = express.Router();

router.get("/", GetServicesByAdmin);
router.post("/add", AddServicesByAdmin);

export default router;
