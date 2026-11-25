import React from "react";
import { ArrowRightIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";

const About = () => {
  const [about, setAbout] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const GetAboutSection = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/portfolio/about-section`,
        );

        setAbout(res.data.about);
      } catch (error) {
        console.log("Get About error: ", error);
      } finally {
        setLoading(false);
      }
    };

    GetAboutSection();
  }, []);

  return (
    <section
      id="about"
      className="bg-[#0F172A] px-5 py-24 text-white sm:px-8 lg:px-16"
    >
      <div className="mx-auto grid max-w-7xl items-center gap-14 lg:grid-cols-2">
        <div>
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
            Get to know me
          </p>

          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
            About Me
          </h2>

          <div className="mt-6 space-y-5 text-base leading-8 text-slate-400">
            {about?.aboutMe?.split(/\n\s*\n/).map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <a
            href="#skills"
            className="mt-8 inline-flex items-center gap-2 font-semibold text-blue-400 transition hover:text-blue-300"
          >
            Explore My Technical Skills
            <ArrowRightIcon className="h-5 w-5" />
          </a>
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {about?.highlights?.map((item) => (
            <div
              key={item.title}
              className="rounded-xl border border-slate-700/70 bg-[#111827] p-6 transition-colors hover:border-blue-400/50"
            >
              <div className="mb-5 h-1 w-10 rounded-full bg-blue-400" />

              <h3 className="text-lg font-semibold text-slate-100">
                {item.title}
              </h3>

              <p className="mt-3 text-sm leading-7 text-slate-400">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
