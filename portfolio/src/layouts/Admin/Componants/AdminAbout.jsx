import axios from "axios";
import React, { useEffect, useState } from "react";
import {
  FiUser,
  FiFileText,
  FiPlus,
  FiTrash2,
  FiSave,
  FiLayers,
} from "react-icons/fi";
import PageLoader from "../../../pages/PageLoader";
import Loader from "../../../pages/Loader";
import { showToast } from "../../../pages/Toast";

const AdminAbout = () => {
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    aboutMe: "",
    highlights: [
      {
        title: "",
        description: "",
      },
    ],
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    const GetAboutByAdmin = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/portfolio/admin/about`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setFormData({
          aboutMe: res.data.about.aboutMe || "",
          highlights: res.data.about.highlights || [
            { title: "", description: "" },
          ],
        });

        showToast("Successfully, fetched about section.", "success");
      } catch (error) {
        showToast(
          "Something went wrong, Can't fetched about section.",
          "error",
        );
      } finally {
        setLoading(false);
      }
    };

    GetAboutByAdmin();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/portfolio/admin/about/add`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      showToast("Successfully, added about section", "success");
    } catch (error) {
      showToast("Error while adding about section", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // INPUT CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // HIGHLIGHT INPUT CHANGE
  const handleHighlightChange = (index, field, value) => {
    const updatedHighlights = [...formData.highlights];

    updatedHighlights[index] = {
      ...updatedHighlights[index],
      [field]: value,
    };

    setFormData((prev) => ({
      ...prev,
      highlights: updatedHighlights,
    }));
  };

  // ADD HIGHLIGHT
  const addHighlight = () => {
    setFormData((prev) => ({
      ...prev,
      highlights: [
        ...prev.highlights,
        {
          title: "",
          description: "",
        },
      ],
    }));
  };

  // REMOVE HIGHLIGHT
  const removeHighlight = (index) => {
    setFormData((prev) => ({
      ...prev,
      highlights: prev.highlights.filter((_, i) => i !== index),
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
            <FiUser size={20} />
            <span className="text-sm font-medium">Portfolio Management</span>
          </div>

          <h1 className="text-2xl font-bold text-white sm:text-3xl">
            About Section
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Manage your personal introduction and professional highlights.
          </p>
        </div>

        <span className="flex w-fit items-center gap-2 rounded-full border border-[#60A5FA]/20 bg-[#60A5FA]/10 px-4 py-2 text-sm font-medium text-[#60A5FA]">
          <FiUser size={15} />
          About Management
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* ABOUT ME */}
        <section className="rounded-xl border border-slate-700/70 bg-[#111827] p-4 sm:p-6">
          <div className="mb-5 flex items-center gap-3">
            <span className="rounded-lg bg-[#60A5FA]/10 p-2.5 text-[#60A5FA]">
              <FiFileText size={19} />
            </span>

            <div>
              <h2 className="font-semibold text-white">About Me</h2>

              <p className="text-xs text-slate-400">
                Write your personal and professional introduction.
              </p>
            </div>
          </div>

          <div>
            <label className={labelClass}>About Description *</label>

            <textarea
              name="aboutMe"
              value={formData.aboutMe}
              onChange={handleChange}
              placeholder="Write something about yourself, your journey, skills and interests..."
              rows={7}
              className={`${inputClass} resize-y`}
              required
            />

            <div className="mt-2 flex justify-end">
              <span className="text-xs text-slate-500">
                {formData.aboutMe.length} characters
              </span>
            </div>
          </div>
        </section>

        {/* HIGHLIGHTS */}
        <section className="rounded-xl border border-slate-700/70 bg-[#111827] p-4 sm:p-6">
          <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <span className="rounded-lg bg-[#60A5FA]/10 p-2.5 text-[#60A5FA]">
                <FiLayers size={19} />
              </span>

              <div>
                <h2 className="font-semibold text-white">
                  Professional Highlights
                </h2>

                <p className="text-xs text-slate-400">
                  Add your achievements, strengths and key highlights.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={addHighlight}
              className="flex w-fit cursor-pointer items-center gap-2 rounded-lg bg-[#60A5FA]/10 px-4 py-2.5 text-sm font-medium text-[#60A5FA] transition hover:bg-[#60A5FA]/20"
            >
              <FiPlus size={17} />
              Add Highlight
            </button>
          </div>

          <div className="space-y-4">
            {formData.highlights.map((highlight, index) => (
              <div
                key={index}
                className="rounded-lg border border-slate-700/60 bg-[#0B1120] p-4 sm:p-5"
              >
                {/* HIGHLIGHT HEADER */}
                <div className="mb-5 flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-300">
                    Highlight {index + 1}
                  </span>

                  <button
                    type="button"
                    onClick={() => removeHighlight(index)}
                    disabled={formData.highlights.length === 1}
                    className="rounded-lg p-2 text-red-400 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-30"
                    aria-label={`Remove highlight ${index + 1}`}
                    title={
                      formData.highlights.length === 1
                        ? "At least one highlight is required"
                        : "Remove highlight"
                    }
                  >
                    <FiTrash2 size={17} />
                  </button>
                </div>

                <div className="space-y-4">
                  {/* TITLE */}
                  <div>
                    <label className={labelClass}>Highlight Title *</label>

                    <input
                      type="text"
                      value={highlight.title}
                      onChange={(e) =>
                        handleHighlightChange(index, "title", e.target.value)
                      }
                      placeholder="e.g. Full Stack Development"
                      className={inputClass}
                      required
                    />
                  </div>

                  {/* DESCRIPTION */}
                  <div>
                    <label className={labelClass}>
                      Highlight Description *
                    </label>

                    <textarea
                      value={highlight.description}
                      onChange={(e) =>
                        handleHighlightChange(
                          index,
                          "description",
                          e.target.value,
                        )
                      }
                      placeholder="Describe this highlight..."
                      rows={3}
                      className={`${inputClass} resize-y`}
                      required
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>

          <p className="mt-4 text-xs text-slate-500">
            Total Highlights: {formData.highlights.length}
          </p>
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
                Save About Section
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminAbout;
