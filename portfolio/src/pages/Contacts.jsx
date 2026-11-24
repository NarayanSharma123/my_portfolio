import React from "react";
import { FaGithub, FaLinkedin, FaWhatsapp, FaYoutube } from "react-icons/fa";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import iconMap from "../utils/iconMap";
import { FiArrowUpRight, FiBriefcase } from "react-icons/fi";

const Contacts = () => {
  const [contacts, setContacts] = useState({});

  useEffect(() => {
    const GetContactsSection = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/portfolio/contacts-section`,
        );

        setContacts(res.data.contacts);
      } catch (error) {
        console.log("Get contacts error: ", error);
      }
    };

    GetContactsSection();
  }, []);

  const OpportunityIcon = iconMap[contacts?.opportunity?.icon] || FiBriefcase;

  return (
    <section
      id="contact"
      className="bg-[#0F172A] px-5 py-24 text-white sm:px-8 lg:px-16"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
            Contact
          </p>

          <h2 className="text-3xl font-bold sm:text-4xl">Let's Connect</h2>

          <p className="mt-5 text-base leading-8 text-slate-400">
            I'm open to internship opportunities, professional connections, and
            meaningful collaborations. Feel free to reach out through any of the
            platforms below.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-5 sm:grid-cols-2">
          {contacts?.contacts?.map((item) => {
            const Icon = iconMap[item.icon];

            return (
              <a
                key={item?.title}
                href={item?.url}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-5 rounded-xl border border-slate-700/70 bg-[#111827] p-6 transition-colors hover:border-blue-400/60"
              >
                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg bg-blue-400/10 text-blue-400 transition-colors group-hover:bg-blue-400/20">
                  {Icon && <Icon className="h-7 w-7" />}
                </div>

                <div className="min-w-0 flex-1">
                  <h3 className="text-lg font-semibold text-white">
                    {item?.title}
                  </h3>

                  <p className="mt-1 text-sm text-slate-400">
                    {item?.description}
                  </p>

                  <p className="mt-3 text-sm font-medium text-blue-400">
                    {item?.linkText}
                  </p>
                </div>

                <FiArrowUpRight className="h-5 w-5 shrink-0 text-slate-500 transition-colors group-hover:text-blue-400" />
              </a>
            );
          })}
        </div>

        <div className="mx-auto mt-12 max-w-5xl rounded-xl border border-blue-400/20 bg-blue-400/5 p-7 text-center sm:p-9">
          <OpportunityIcon className="mx-auto h-8 w-8 text-blue-400" />

          <h3 className="mt-4 text-xl font-semibold text-white">
            {contacts?.opportunity?.heading}
          </h3>

          <p className="mx-auto mt-3 max-w-xl text-sm leading-7 text-slate-400">
            {contacts?.opportunity?.description}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contacts;
