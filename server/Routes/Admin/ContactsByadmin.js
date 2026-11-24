import express from "express";
import {
  AddContactByAdmin,
  GetContactByAdmin,
} from "../../Controllers/Admin/ContactsByAdmin.js";
const router = express.Router();

router.get("/", GetContactByAdmin);
router.post("/add", AddContactByAdmin);

export default router;
