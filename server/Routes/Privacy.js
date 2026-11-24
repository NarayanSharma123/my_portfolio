import express from "express";
import { AddPrivacy, GetPrivacy } from "../Controllers/Privacy.js";
const router = express.Router();

router.get("/", GetPrivacy);
router.post("/add", AddPrivacy);

export default router;
