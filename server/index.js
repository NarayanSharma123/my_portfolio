import dotenv from "dotenv";
dotenv.config();

import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import adminAuth from "./Middleware/adminAuth.js";

// Routes Import
import HeroRoutes from "./Routes/Hero.js";
import AboutRoutes from "./Routes/About.js";
import SkillsRoutes from "./Routes/Skills.js";
import ServicesRoutes from "./Routes/Services.js";
import ProjectRoutes from "./Routes/Projects.js";
import contactRoutes from "./Routes/Contacts.js";
import privacyRoutes from "./Routes/Privacy.js";
import footerRoutes from "./Routes/Footer.js";

// Admin Routes import
import AdminRoutes from "./Routes/Admin/AdminRoutes.js";
import HeroByAdminRoutes from "./Routes/Admin/HeroByAdmin.js";
import AboutByAdminRoutes from "./Routes/Admin/AboutByAdmin.js";
import ServicesByAdminRoutes from "./Routes/Admin/ServicesByAdmin.js";
import SkillsByAdminRoutes from "./Routes/Admin/SkillsByAdmin.js";
import ProjectsByAdminRoutes from "./Routes/Admin/ProjectsByAdmin.js";
import ContactsByAdminRoutes from "./Routes/Admin/ContactsByadmin.js";
import FooterByAdminRoutes from "./Routes/Admin/FooterByAdmin.js";
import PrivacyByAdminRoutes from "./Routes/Admin/PrivacyByAdmin.js";

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
  }),
);
app.use(express.json());

// Routes
app.use("/api/portfolio/hero-section", HeroRoutes);
app.use("/api/portfolio/about-section", AboutRoutes);
app.use("/api/portfolio/services-section", ServicesRoutes);
app.use("/api/portfolio/skills-section", SkillsRoutes);
app.use("/api/portfolio/projects-section", ProjectRoutes);
app.use("/api/portfolio/contacts-section", contactRoutes);
app.use("/api/portfolio/privacy-section", privacyRoutes);
app.use("/api/portfolio/footer-section", footerRoutes);

// Admin Routes
app.use("/api/portfolio/admin", AdminRoutes);

app.use("/api/portfolio/admin/hero", adminAuth, HeroByAdminRoutes);
app.use("/api/portfolio/admin/about", adminAuth, AboutByAdminRoutes);
app.use("/api/portfolio/admin/services", adminAuth, ServicesByAdminRoutes);
app.use("/api/portfolio/admin/skills", adminAuth, SkillsByAdminRoutes);
app.use("/api/portfolio/admin/projects", adminAuth, ProjectsByAdminRoutes);
app.use("/api/portfolio/admin/contacts", adminAuth, ContactsByAdminRoutes);
app.use("/api/portfolio/admin/footer", adminAuth, FooterByAdminRoutes);
app.use("/api/portfolio/admin/privacy", adminAuth, PrivacyByAdminRoutes);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send(`Portfolio app running on port ${PORT}`);
});

mongoose
  .connect(process.env.MONGO_DB)
  .then(() => {
    console.log("MongoDB connected successfully.");
    app.listen(PORT, () => {
      console.log(`Portfolio app running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log("MongoDB connect error: ", error);
  });
