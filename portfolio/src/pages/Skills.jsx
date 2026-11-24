import axios from "axios";
import React, { useEffect, useState } from "react";

const Skills = () => {
  const [skills, setSkills] = useState({});

  useEffect(() => {
    const GetSkillsSection = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/portfolio/skills-section`,
        );

        setSkills(res.data.skills);
      } catch (error) {
        console.log("Get skills error: ", error);
      }
    };

    GetSkillsSection();
  }, []);

  return (
    <section
      id="skills"
      className="bg-[#0F172A] px-5 py-24 text-white sm:px-8 lg:px-16"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-14">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
            Technical Knowledge
          </p>

          <h2 className="text-3xl font-bold sm:text-4xl">Technical Skills</h2>

          <p className="mt-4 max-w-2xl leading-7 text-slate-400">
            Technologies, tools, and concepts I use while developing
            applications and working on technical projects.
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {skills?.categories?.map((category) => (
            <div
              key={category?.title}
              className="rounded-xl border border-slate-700/70 bg-[#111827] p-6"
            >
              <h3 className="mb-5 border-b border-slate-700 pb-4 text-lg font-semibold text-slate-100">
                {category?.title}
              </h3>

              <div className="flex flex-wrap gap-2.5">
                {category?.skills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-md border border-slate-700 bg-slate-800/60 px-3 py-2 text-sm font-medium text-slate-300 transition-colors hover:border-blue-400/50 hover:text-blue-300"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
