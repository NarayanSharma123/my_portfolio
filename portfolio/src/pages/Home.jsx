import React, { useEffect, useState } from "react";
import { ArrowDownTrayIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import axios from "axios";
import MyResume from "../assets/my_Resume.pdf";
import { FiFile, FiFileText } from "react-icons/fi";

const Home = () => {
  const [hero, setHero] = useState({});

  useEffect(() => {
    const GetHeroSection = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/portfolio/hero-section`,
        );

        setHero(res.data.hero);
      } catch (error) {
        console.log("Get Hero error: ", error);
      }
    };

    GetHeroSection();
  }, []);

  return (
    <section
      id="home"
      className="flex min-h-screen items-center bg-[#0B1120] px-5 pb-16 pt-28 text-white sm:px-8 lg:px-16"
    >
      <div className="mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-2 lg:gap-20">
        <div className="order-2 lg:order-1">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-blue-400/20 bg-blue-400/5 px-4 py-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400" />
            <span className="text-sm font-medium text-blue-300">
              {hero?.availabilityText}
            </span>
          </div>

          <p className="mb-3 text-lg font-medium text-slate-400">Hello, I'm</p>

          <h1 className="text-4xl font-bold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
            {hero?.firstName}
            <span className="mt-1 block text-blue-400"> {hero?.lastName}</span>
          </h1>

          <h2 className="mt-6 text-xl font-semibold text-slate-200 sm:text-2xl">
            {hero?.designation}
          </h2>

          <p className="mt-5 max-w-xl text-base leading-8 text-slate-400 sm:text-lg break-all">
            {hero?.description}
          </p>

          <div className="mt-9 flex flex-wrap gap-4">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 rounded-lg bg-blue-500 px-6 py-3 font-semibold text-white transition hover:bg-blue-600"
            >
              Explore Projects
              <ArrowRightIcon className="h-5 w-5" />
            </a>

            {hero?.resume && (
              <a
                href={hero?.resume}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-slate-600 px-6 py-3 font-semibold text-slate-200 transition hover:border-blue-400 hover:bg-blue-400/10 hover:text-blue-300"
              >
                <FiFileText className="h-5 w-5" />
                View Resume
              </a>
            )}
          </div>

          <div className="mt-12 flex flex-wrap gap-8 border-t border-slate-800 pt-7">
            {hero?.heroStats?.map((stat, index) => (
              <div key={index}>
                <p className="text-sm text-slate-500">{stat?.label}</p>
                <p className="mt-1 font-semibold text-slate-200">
                  {stat?.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="order-1 flex justify-center lg:order-2 lg:justify-end">
          <div className="relative">
            <div className="absolute -inset-4 rounded-2xl border border-blue-400/20" />

            <img
              src={hero?.profileImage}
              alt={`${hero?.firstName} ${hero?.lastName} - ${hero?.designation}`}
              className="relative h-72 w-72 rounded-2xl border border-slate-700 object-cover shadow-2xl sm:h-96 sm:w-96"
            />

            <div className="absolute -bottom-5 -left-5 rounded-xl border border-slate-700 bg-[#111827] px-5 py-4 shadow-xl sm:-left-10">
              <p className="text-sm text-slate-400">Building with</p>
              <p className="mt-1 font-semibold text-blue-400">
                Passion & Purpose
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Home;
