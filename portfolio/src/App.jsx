import React from "react";
import { Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";

// Public Pages
import Navbar from "./pages/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import Skills from "./pages/Skills";
import Projects from "./pages/Projects";
import Contacts from "./pages/Contacts";
import Policy from "./pages/Policy";
import Footer from "./pages/Footer";

// Admin Pages
import AdminLogin from "./layouts/Admin/AdminLogin";
import ProtectedRoute from "./layouts/Admin/ProtectedRoute";
import Admin from "./layouts/Admin/Admin";
import AdminAbout from "./layouts/Admin/Componants/AdminAbout";
import AdminContacts from "./layouts/Admin/Componants/AdminContacts";
import AdminFooter from "./layouts/Admin/Componants/AdminFooter";
import AdminProjects from "./layouts/Admin/Componants/AdminProjects";
import AdminServices from "./layouts/Admin/Componants/AdminServices";
import AdminSkills from "./layouts/Admin/Componants/AdminSkills";
import AdminHome from "./layouts/Admin/Componants/AdminHome";
import AdminPrivacy from "./layouts/Admin/Componants/AdminPrivacy";
import Toast from "./pages/Toast";

const App = () => {
  const token = localStorage.getItem("token");

  return (
    <>
      <Toast />

      <Routes>
        {/* Public Portfolio */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Home />
              <About />
              <Services />
              <Skills />
              <Projects />
              <Contacts />
              <Policy />
              <Footer />
            </>
          }
        />

        {/* Admin Panel */}
        {/* <Route
          path="/admin/login"
          element={token ? <Navigate to="/admin" replace /> : <AdminLogin />}
        /> */}
        <Route path="/admin/login" element={<AdminLogin />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<Admin />}>
            {/* <Route index element={<AdminDashboard />} /> */}
            <Route index element={<AdminHome />} />
            <Route path="about" element={<AdminAbout />} />
            <Route path="services" element={<AdminServices />} />
            <Route path="skills" element={<AdminSkills />} />
            <Route path="projects" element={<AdminProjects />} />
            <Route path="contact" element={<AdminContacts />} />
            <Route path="footer" element={<AdminFooter />} />
            <Route path="privacy" element={<AdminPrivacy />} />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
