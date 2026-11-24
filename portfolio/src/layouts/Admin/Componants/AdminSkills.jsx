import React, { useEffect, useState } from "react";
import {
  FiCode,
  FiLayers,
  FiPlus,
  FiTrash2,
  FiSave,
  FiX,
} from "react-icons/fi";
import PageLoader from "../../../pages/PageLoader";
import Loader from "../../../pages/Loader";
import axios from "axios";
import { showToast } from "../../../pages/Toast";

const AdminSkills = () => {
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    categories: [
      {
        title: "",
        skills: [""],
      },
    ],
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    const GetSkillsByAdmin = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/portfolio/admin/skills`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setFormData({
          categories: res.data.skills.categories || [
            { title: "", skills: [""] },
          ],
        });

        showToast("Successfully fetched Skills section.", "success");
      } catch (error) {
        showToast(
          "Something went wrong, Can't fetched Skills section.",
          "error",
        );
      } finally {
        setLoading(false);
      }
    };

    GetSkillsByAdmin();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/portfolio/admin/skills/add`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      showToast("Successfully add Skills section.", "success");
    } catch (error) {
      showToast("Something went wrong, Can't add Skills section.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // CATEGORY TITLE CHANGE
  const handleCategoryChange = (index, value) => {
    const updatedCategories = [...formData.categories];

    updatedCategories[index] = {
      ...updatedCategories[index],
      title: value,
    };

    setFormData((prev) => ({
      ...prev,
      categories: updatedCategories,
    }));
  };

  // SKILL INPUT CHANGE
  const handleSkillChange = (categoryIndex, skillIndex, value) => {
    const updatedCategories = [...formData.categories];

    const updatedSkills = [...updatedCategories[categoryIndex].skills];

    updatedSkills[skillIndex] = value;

    updatedCategories[categoryIndex] = {
      ...updatedCategories[categoryIndex],
      skills: updatedSkills,
    };

    setFormData((prev) => ({
      ...prev,
      categories: updatedCategories,
    }));
  };

  // ADD CATEGORY
  const addCategory = () => {
    setFormData((prev) => ({
      ...prev,
      categories: [
        ...prev.categories,
        {
          title: "",
          skills: [""],
        },
      ],
    }));
  };

  // REMOVE CATEGORY
  const removeCategory = (index) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.filter((_, i) => i !== index),
    }));
  };

  // ADD SKILL
  const addSkill = (categoryIndex) => {
    const updatedCategories = [...formData.categories];

    updatedCategories[categoryIndex] = {
      ...updatedCategories[categoryIndex],
      skills: [...updatedCategories[categoryIndex].skills, ""],
    };

    setFormData((prev) => ({
      ...prev,
      categories: updatedCategories,
    }));
  };

  // REMOVE SKILL
  const removeSkill = (categoryIndex, skillIndex) => {
    const updatedCategories = [...formData.categories];

    updatedCategories[categoryIndex] = {
      ...updatedCategories[categoryIndex],
      skills: updatedCategories[categoryIndex].skills.filter(
        (_, i) => i !== skillIndex,
      ),
    };

    setFormData((prev) => ({
      ...prev,
      categories: updatedCategories,
    }));
  };

  if (loading) return <PageLoader />;

  const inputClass =
    "w-full rounded-lg border border-slate-700 bg-[#0B1120] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-[#60A5FA] focus:ring-2 focus:ring-[#60A5FA]/10";

  const labelClass = "mb-2 block text-sm font-medium text-slate-300";

  return (
    <div className="w-full space-y-6">
      {/* PAGE HEADER */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <div className="mb-2 flex items-center gap-2 text-[#60A5FA]">
            <FiCode size={20} />
            <span className="text-sm font-medium">Portfolio Management</span>
          </div>

          <h1 className="text-2xl font-bold text-white sm:text-3xl">
            Skills Section
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Organize and manage your technical skills by categories.
          </p>
        </div>

        <span className="flex w-fit items-center gap-2 rounded-full border border-[#60A5FA]/20 bg-[#60A5FA]/10 px-4 py-2 text-sm font-medium text-[#60A5FA]">
          <FiCode size={15} />
          Skills Management
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* SKILL CATEGORIES */}
        <section className="rounded-xl border border-slate-700/70 bg-[#111827] p-4 sm:p-6">
          <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <span className="rounded-lg bg-[#60A5FA]/10 p-2.5 text-[#60A5FA]">
                <FiLayers size={19} />
              </span>

              <div>
                <h2 className="font-semibold text-white">Skill Categories</h2>

                <p className="text-xs text-slate-400">
                  Create categories and add skills inside them.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={addCategory}
              className="flex w-fit cursor-pointer items-center gap-2 rounded-lg bg-[#60A5FA]/10 px-4 py-2.5 text-sm font-medium text-[#60A5FA] transition hover:bg-[#60A5FA]/20"
            >
              <FiPlus size={17} />
              Add Category
            </button>
          </div>

          {/* CATEGORY LIST */}
          <div className="space-y-5">
            {formData.categories.map((category, categoryIndex) => (
              <div
                key={categoryIndex}
                className="rounded-lg border border-slate-700/60 bg-[#0B1120] p-4 sm:p-5"
              >
                {/* CATEGORY HEADER */}
                <div className="mb-5 flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-300">
                    Category {categoryIndex + 1}
                  </span>

                  <button
                    type="button"
                    onClick={() => removeCategory(categoryIndex)}
                    disabled={formData.categories.length === 1}
                    className="cursor-pointer rounded-lg p-2 text-red-400 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-30"
                    aria-label={`Remove category ${categoryIndex + 1}`}
                    title={
                      formData.categories.length === 1
                        ? "At least one category is required"
                        : "Remove category"
                    }
                  >
                    <FiTrash2 size={17} />
                  </button>
                </div>

                {/* CATEGORY TITLE */}
                <div className="mb-5">
                  <label className={labelClass}>Category Title *</label>

                  <input
                    type="text"
                    value={category.title}
                    onChange={(e) =>
                      handleCategoryChange(categoryIndex, e.target.value)
                    }
                    placeholder="e.g. Frontend Development"
                    className={inputClass}
                    required
                  />
                </div>

                {/* SKILLS */}
                <div className="rounded-lg border border-slate-700/50 bg-[#111827] p-3 sm:p-4">
                  <div className="mb-4 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
                    <h3 className="text-sm font-semibold text-slate-300">
                      Skills
                    </h3>

                    <button
                      type="button"
                      onClick={() => addSkill(categoryIndex)}
                      className="flex w-fit cursor-pointer items-center gap-2 rounded-lg bg-[#60A5FA]/10 px-3 py-2 text-xs font-medium text-[#60A5FA] transition hover:bg-[#60A5FA]/20"
                    >
                      <FiPlus size={15} />
                      Add Skill
                    </button>
                  </div>

                  <div className="space-y-3">
                    {category.skills.map((skill, skillIndex) => (
                      <div key={skillIndex} className="flex items-center gap-2">
                        <div className="flex-1">
                          <input
                            type="text"
                            value={skill}
                            onChange={(e) =>
                              handleSkillChange(
                                categoryIndex,
                                skillIndex,
                                e.target.value,
                              )
                            }
                            placeholder={`Skill ${skillIndex + 1} (e.g. React)`}
                            className={inputClass}
                            required
                          />
                        </div>

                        <button
                          type="button"
                          onClick={() => removeSkill(categoryIndex, skillIndex)}
                          disabled={category.skills.length === 1}
                          className="shrink-0 cursor-pointer rounded-lg border border-slate-700 p-3 text-red-400 transition hover:border-red-500/40 hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-30"
                          aria-label={`Remove skill ${skillIndex + 1}`}
                        >
                          <FiX size={17} />
                        </button>
                      </div>
                    ))}
                  </div>

                  <p className="mt-3 text-xs text-slate-500">
                    Total Skills: {category.skills.length}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-500">
            <span>Total Categories: {formData.categories.length}</span>
            <span>
              Total Skills:{" "}
              {formData.categories.reduce(
                (total, category) => total + category.skills.length,
                0,
              )}
            </span>
          </div>
        </section>

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
                Save Skills
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminSkills;
