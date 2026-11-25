import express from "express";
import { GetContact } from "../Controllers/Contact.js";
const router = express.Router();

router.get("/", GetContact);

export default router;
