import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  FiFolder,
  FiPlus,
  FiTrash2,
  FiCode,
  FiExternalLink,
  FiGithub,
  FiSave,
} from "react-icons/fi";
import PageLoader from "../../../pages/PageLoader";
import Loader from "../../../pages/Loader";
import { showToast } from "../../../pages/Toast";

const AdminProjects = () => {
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    projects: [
      {
        title: "",
        subtitle: "",
        description: "",
        technologies: [""],
        liveDemo: "",
        sourceCode: "",
      },
    ],
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    const GetProjectsByAdmin = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/portfolio/admin/projects`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setFormData(
          res.data.projects || [
            {
              title: "",
              subtitle: "",
              description: "",
              technologies: [""],
              liveDemo: "",
              sourceCode: "",
            },
          ],
        );

        showToast("Successfully fetched Projects section.", "success");
      } catch (error) {
        showToast(
          "Something went wrong, Can't fetched projects section.",
          "error",
        );
      } finally {
        setLoading(false);
      }
    };

    GetProjectsByAdmin();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/portfolio/admin/projects/add`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      showToast("Successfully added projects.", "success");
    } catch (error) {
      showToast("Something went wrong, Can't add projects.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Project Input
  const handleProjectChange = (index, field, value) => {
    const updatedProjects = [...formData.projects];

    updatedProjects[index][field] = value;

    setFormData({
      ...formData,
      projects: updatedProjects,
    });
  };

  // Add Project
  const addProject = () => {
    setFormData({
      ...formData,
      projects: [
        ...formData.projects,
        {
          title: "",
          subtitle: "",
          description: "",
          technologies: [""],
          liveDemo: "",
          sourceCode: "",
        },
      ],
    });
  };

  // Remove Project
  const removeProject = (index) => {
    setFormData({
      ...formData,
      projects: formData.projects.filter((_, i) => i !== index),
    });
  };

  // Handle Technology Change
  const handleTechnologyChange = (projectIndex, techIndex, value) => {
    const updatedProjects = [...formData.projects];

    updatedProjects[projectIndex].technologies[techIndex] = value;

    setFormData({
      ...formData,
      projects: updatedProjects,
    });
  };

  // Add Technology
  const addTechnology = (projectIndex) => {
    const updatedProjects = [...formData.projects];

    updatedProjects[projectIndex].technologies.push("");

    setFormData({
      ...formData,
      projects: updatedProjects,
    });
  };

  // Remove Technology
  const removeTechnology = (projectIndex, techIndex) => {
    const updatedProjects = [...formData.projects];

    updatedProjects[projectIndex].technologies = updatedProjects[
      projectIndex
    ].technologies.filter((_, i) => i !== techIndex);

    setFormData({
      ...formData,
      projects: updatedProjects,
    });
  };

  if (loading) return <PageLoader />;

  const inputClass =
    "w-full rounded-lg border border-slate-700 bg-[#0B1120] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-[#60A5FA]";

  const labelClass = "mb-2 block text-sm font-medium text-slate-300";

  return (
    <div className="w-full text-white">
      {/* Header */}
      <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="mb-2 flex items-center gap-2 text-[#60A5FA]">
            <FiFolder size={20} />
            <span className="text-sm font-medium">Portfolio Management</span>
          </div>

          <h1 className="text-2xl font-bold sm:text-3xl">Manage Projects</h1>

          <p className="mt-2 text-sm text-slate-400">
            Add and manage your portfolio projects.
          </p>
        </div>

        <button
          type="button"
          onClick={addProject}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#60A5FA] px-5 py-3 text-sm font-semibold text-[#0B1120] transition hover:bg-blue-400"
        >
          <FiPlus size={18} />
          Add Project
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {formData?.projects?.map((project, projectIndex) => (
          <div
            key={projectIndex}
            className="rounded-xl border border-slate-700/70 bg-[#111827] p-5 sm:p-7"
          >
            {/* Project Header */}
            <div className="mb-6 flex items-center justify-between border-b border-slate-700/70 pb-4">
              <div className="flex items-center gap-3">
                <div className="rounded-lg bg-[#60A5FA]/10 p-2.5 text-[#60A5FA]">
                  <FiFolder size={20} />
                </div>

                <div>
                  <h2 className="font-semibold">Project {projectIndex + 1}</h2>
                  <p className="text-xs text-slate-400">
                    Project details and information
                  </p>
                </div>
              </div>

              {formData.projects.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeProject(projectIndex)}
                  className="rounded-lg p-2 text-red-400 transition hover:bg-red-500/10"
                  title="Remove Project"
                >
                  <FiTrash2 size={18} />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {/* Title */}
              <div>
                <label className={labelClass}>Project Title</label>
                <input
                  type="text"
                  required
                  value={project.title}
                  onChange={(e) =>
                    handleProjectChange(projectIndex, "title", e.target.value)
                  }
                  placeholder="Enter project title"
                  className={inputClass}
                />
              </div>

              {/* Subtitle */}
              <div>
                <label className={labelClass}>Project Subtitle</label>
                <input
                  type="text"
                  required
                  value={project.subtitle}
                  onChange={(e) =>
                    handleProjectChange(
                      projectIndex,
                      "subtitle",
                      e.target.value,
                    )
                  }
                  placeholder="Enter project subtitle"
                  className={inputClass}
                />
              </div>

              {/* Description */}
              <div className="md:col-span-2">
                <label className={labelClass}>Project Description</label>
                <textarea
                  required
                  rows={4}
                  value={project.description}
                  onChange={(e) =>
                    handleProjectChange(
                      projectIndex,
                      "description",
                      e.target.value,
                    )
                  }
                  placeholder="Describe your project..."
                  className={`${inputClass} resize-none`}
                />
              </div>

              {/* Technologies */}
              <div className="md:col-span-2">
                <div className="mb-3 flex items-center justify-between">
                  <label className="flex items-center gap-2 text-sm font-medium text-slate-300">
                    <FiCode className="text-[#60A5FA]" />
                    Technologies
                  </label>

                  <button
                    type="button"
                    onClick={() => addTechnology(projectIndex)}
                    className="inline-flex items-center gap-1 text-sm font-medium text-[#60A5FA] hover:text-blue-400"
                  >
                    <FiPlus size={16} />
                    Add Technology
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {project?.technologies?.map((tech, techIndex) => (
                    <div key={techIndex} className="flex items-center gap-2">
                      <input
                        type="text"
                        required
                        value={tech}
                        onChange={(e) =>
                          handleTechnologyChange(
                            projectIndex,
                            techIndex,
                            e.target.value,
                          )
                        }
                        placeholder="e.g. React.js"
                        className={inputClass}
                      />

                      {project.technologies.length > 1 && (
                        <button
                          type="button"
                          onClick={() =>
                            removeTechnology(projectIndex, techIndex)
                          }
                          className="shrink-0 rounded-lg p-3 text-red-400 hover:bg-red-500/10"
                          title="Remove Technology"
                        >
                          <FiTrash2 size={17} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Live Demo */}
              <div>
                <label className={labelClass}>
                  <span className="flex items-center gap-2">
                    <FiExternalLink className="text-[#60A5FA]" />
                    Live Demo URL
                  </span>
                </label>

                <input
                  type="url"
                  required
                  value={project.liveDemo}
                  onChange={(e) =>
                    handleProjectChange(
                      projectIndex,
                      "liveDemo",
                      e.target.value,
                    )
                  }
                  placeholder="https://example.com"
                  className={inputClass}
                />
              </div>

              {/* Source Code */}
              <div>
                <label className={labelClass}>
                  <span className="flex items-center gap-2">
                    <FiGithub className="text-[#60A5FA]" />
                    Source Code URL
                  </span>
                </label>

                <input
                  type="url"
                  required
                  value={project.sourceCode}
                  onChange={(e) =>
                    handleProjectChange(
                      projectIndex,
                      "sourceCode",
                      e.target.value,
                    )
                  }
                  placeholder="https://github.com/username/project"
                  className={inputClass}
                />
              </div>
            </div>
          </div>
        ))}

        {/* SUBMIT BUTTON */}
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-lg bg-[#60A5FA] px-6 py-3 font-semibold text-[#0B1120] transition hover:bg-blue-500 disabled:cursor-not-allowed disabled:opacity-70 sm:w-auto"
          >
            {isSubmitting ? (
              <>
                <Loader />
                Saving...
              </>
            ) : (
              <>
                <FiSave size={18} />
                Save Projects
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminProjects;
