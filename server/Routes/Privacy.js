import express from "express";
import { GetPrivacy } from "../Controllers/Privacy.js";
const router = express.Router();

router.get("/", GetPrivacy);

export default router;
