import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { FaExternalLinkAlt, FaGithub } from "react-icons/fa";

const Projects = () => {
  const [projects, setProjects] = useState({});

  useEffect(() => {
    const GetProjectsSection = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/portfolio/projects-section`,
        );

        setProjects(res.data.projects);
      } catch (error) {
        console.log("Get projects error: ", error);
      }
    };

    GetProjectsSection();
  }, []);

  return (
    <section
      id="projects"
      className="bg-[#0B1120] px-5 py-24 text-white sm:px-8 lg:px-16"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-14">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
            Selected Work
          </p>

          <h2 className="text-3xl font-bold sm:text-4xl">Featured Projects</h2>

          <p className="mt-4 max-w-2xl leading-7 text-slate-400">
            A selection of projects demonstrating my development skills and
            practical implementation of technologies.
          </p>
        </div>

        <div className="grid gap-7 md:grid-cols-2">
          {projects?.projects?.map((project) => (
            <article
              key={project?.title}
              className="flex flex-col rounded-xl border border-slate-800 bg-[#111827] p-7 transition-colors hover:border-blue-400/50 sm:p-8"
            >
              <div className="mb-5 flex items-center justify-between">
                <span className="rounded-md border border-blue-400/20 bg-blue-400/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-blue-300">
                  Project
                </span>

                <FaGithub className="h-6 w-6 text-slate-500" />
              </div>

              <h3 className="text-2xl font-bold text-white">
                {project?.title}
              </h3>

              <p className="mt-2 text-sm font-medium text-blue-400">
                {project?.subtitle}
              </p>

              <p className="mt-5 flex-1 text-sm leading-7 text-slate-400">
                {project?.description}
              </p>

              <div className="my-7 border-t border-slate-700 pt-6">
                <p className="mb-4 text-xs font-semibold uppercase tracking-wider text-slate-500">
                  Technologies Used
                </p>

                <div className="flex flex-wrap gap-2">
                  {project?.technologies?.map((tech) => (
                    <span
                      key={tech}
                      className="rounded-md bg-slate-800 px-3 py-1.5 text-xs font-medium text-slate-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {project?.liveDemo && (
                  <>
                    {" "}
                    <a
                      href={project?.liveDemo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg bg-blue-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-600"
                    >
                      <FaExternalLinkAlt />
                      Live Demo
                    </a>
                  </>
                )}

                {project?.sourceCode && (
                  <>
                    {" "}
                    <a
                      href={project?.sourceCode}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-lg border border-slate-600 px-4 py-2.5 text-sm font-semibold text-slate-300 transition hover:border-blue-400 hover:text-blue-400"
                    >
                      <FaGithub />
                      Source Code
                    </a>
                  </>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
