import axios from "axios";
import React, { useEffect, useState } from "react";
import { FaGithub, FaLinkedin, FaYoutube, FaWhatsapp } from "react-icons/fa";
import iconMap from "../utils/iconMap";

const Footer = () => {
  const [footer, setFooter] = useState({});

  useEffect(() => {
    const GetFooterSection = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/portfolio/footer-section`,
        );

        setFooter(res.data.footer);
        console.log("footer: ", res.data.footer);
      } catch (error) {
        console.log("Get footer error: ", error);
      }
    };

    GetFooterSection();
  }, []);

  return (
    <footer className="border-t border-slate-800 bg-[#0B1120] px-5 py-8 text-slate-400 sm:px-8 lg:px-16">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 sm:flex-row">
        <div className="text-center sm:text-left">
          <a href="#home" className="text-xl font-bold text-white">
            Portfolio<span className="text-blue-400">.</span>
          </a>

          <p className="mt-2 text-xs text-slate-500">
            © {new Date().getFullYear()} Narayan Bhojak. All rights reserved.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {footer?.socialLinks
            ?.filter((social) => social?.url.trim())
            ?.map((social) => {
              const Icon = iconMap[social?.icon];

              return (
                <a
                  key={social?.title}
                  href={social?.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social?.title}
                  title={social?.title}
                   className="rounded-lg border border-slate-800 p-3 text-slate-400 transition-colors hover:border-blue-400/50 hover:bg-blue-400/10 hover:text-blue-400"
                >
                  {Icon && <Icon className="h-5 w-5" />}
                </a>
              );
            })}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
