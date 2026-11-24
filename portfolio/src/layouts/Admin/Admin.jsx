import React, { useState } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import {
  FiGrid,
  FiUser,
  FiBriefcase,
  FiCode,
  FiFolder,
  FiMail,
  FiLogOut,
  FiMenu,
  FiX,
  FiHome,
  FiLayers,
  FiShield,
} from "react-icons/fi";

const Admin = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const navLinks = [
    // { name: "Dashboard", path: "/admin", icon: FiGrid },
    { name: "Home", path: "/admin", icon: FiHome },
    { name: "About", path: "/admin/about", icon: FiUser },
    { name: "Services", path: "/admin/services", icon: FiBriefcase },
    { name: "Skills", path: "/admin/skills", icon: FiCode },
    { name: "Projects", path: "/admin/projects", icon: FiFolder },
    { name: "Contact", path: "/admin/contact", icon: FiMail },
    { name: "Footer", path: "/admin/footer", icon: FiLayers },
    { name: "Privacy", path: "/admin/privacy", icon: FiShield },
  ];

  const isActive = (path) => {
    if (path === "/admin") {
      return location.pathname === "/admin";
    }

    return (
      location.pathname === path || location.pathname.startsWith(`${path}/`)
    );
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/admin/login", { replace: true });
  };

  return (
    <div className="min-h-screen w-full overflow-x-hidden bg-[#0B1120] text-white">
      {/* NAVBAR */}
      <header className="sticky top-0 z-50 border-b border-slate-700/60 bg-[#111827]/95 backdrop-blur-md">
        <div className="mx-auto flex min-h-16 max-w-[1600px] items-center justify-between gap-3 px-3 py-3 sm:px-6 lg:px-8 xl:px-10">
          {/* LOGO */}
          <Link
            to="/admin"
            onClick={() => setMenuOpen(false)}
            className="flex shrink-0 items-center gap-2 text-lg font-bold tracking-tight sm:text-xl"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#60A5FA]/10 text-[#60A5FA]">
              <FiGrid size={19} />
            </span>

            <span className="whitespace-nowrap">
              Admin<span className="text-[#60A5FA]">Panel</span>
            </span>
          </Link>

          {/* DESKTOP NAVIGATION */}
          <nav className="hidden items-center gap-0.5 xl:flex 2xl:gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.path);

              return (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`flex items-center gap-1.5 whitespace-nowrap rounded-lg px-2 py-2 text-xs font-medium transition-all duration-200 2xl:px-3 2xl:text-sm ${
                    active
                      ? "bg-[#60A5FA]/10 text-[#60A5FA]"
                      : "text-slate-400 hover:bg-slate-700/40 hover:text-[#60A5FA]"
                  }`}
                >
                  <Icon size={16} />
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* RIGHT ACTIONS */}
          <div className="flex shrink-0 items-center gap-2">
            <Link
              to="/"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden items-center gap-2 rounded-lg border border-slate-700 px-3 py-2 text-sm text-slate-300 transition hover:border-[#60A5FA] hover:text-[#60A5FA] sm:flex"
            >
              <FiHome size={16} />
              <span>Portfolio</span>
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="hidden items-center cursor-pointer gap-2 rounded-lg bg-red-500/10 px-3 py-2 text-sm font-medium text-red-400 transition hover:bg-red-500/20 sm:flex"
            >
              <FiLogOut size={16} />
              Logout
            </button>

            {/* MOBILE / TABLET MENU BUTTON */}
            <button
              type="button"
              onClick={() => setMenuOpen(!menuOpen)}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-slate-700 cursor-pointer text-slate-300 transition hover:border-[#60A5FA] hover:text-[#60A5FA] xl:hidden"
              aria-label="Toggle navigation"
              aria-expanded={menuOpen}
            >
              {menuOpen ? <FiX size={21} /> : <FiMenu size={21} />}
            </button>
          </div>
        </div>

        {/* MOBILE / TABLET NAVIGATION */}
        {menuOpen && (
          <div className="border-t border-slate-700/60 bg-[#111827] px-3 py-4 sm:px-6 xl:hidden">
            <nav className="grid grid-cols-2 gap-2 sm:grid-cols-3 md:grid-cols-3">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const active = isActive(link.path);

                return (
                  <Link
                    key={link.path}
                    to={link.path}
                    onClick={() => setMenuOpen(false)}
                    className={`flex min-w-0 items-center gap-2 rounded-lg border px-3 py-3 text-sm font-medium transition-all cursor-pointer duration-200 ${
                      active
                        ? "border-[#60A5FA] bg-[#60A5FA]/10 text-[#60A5FA]"
                        : "border-slate-700/60 bg-[#0B1120] text-slate-300 hover:border-[#60A5FA]/60 hover:bg-[#60A5FA]/5 hover:text-[#60A5FA]"
                    }`}
                  >
                    <Icon size={17} className="shrink-0" />
                    <span className="truncate">{link.name}</span>
                  </Link>
                );
              })}
            </nav>

            {/* MOBILE ACTIONS */}
            <div className="mt-3 grid grid-cols-2 gap-2">
              <Link
                to="/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMenuOpen(false)}
                className="flex items-center justify-center gap-2 rounded-lg border border-slate-700 py-3 text-sm text-slate-300 transition cursor-pointer hover:border-[#60A5FA] hover:text-[#60A5FA]"
              >
                <FiHome size={16} />
                Portfolio
              </Link>

              <button
                type="button"
                onClick={handleLogout}
                className="flex items-center justify-center gap-2 rounded-lg bg-red-500/10 py-3 text-sm text-red-400 transition cursor-pointer hover:bg-red-500/20"
              >
                <FiLogOut size={16} />
                Logout
              </button>
            </div>
          </div>
        )}
      </header>

      {/* MAIN CONTENT */}
      <main className="mx-auto min-h-[calc(100vh-64px)] w-full max-w-[1600px] px-3 py-6 sm:px-6 sm:py-8 lg:px-8 xl:px-10">
        <div className="mb-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default Admin;
