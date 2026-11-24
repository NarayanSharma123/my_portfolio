import express from "express";
import { AddContact, GetContact } from "../Controllers/Contact.js";
const router = express.Router();

router.get("/", GetContact);
router.post("/add", AddContact);

export default router;
