import React, { useEffect, useState } from "react";
import {
  FiHome,
  FiUser,
  FiBriefcase,
  FiImage,
  FiFileText,
  FiPlus,
  FiTrash2,
  FiSave,
  FiEye,
  FiExternalLink,
} from "react-icons/fi";
import axios from "axios";
import Loader from "../../../pages/Loader";
import PageLoader from "../../../pages/PageLoader";
import { showToast } from "../../../pages/Toast";

const AdminHome = () => {
  const [formData, setFormData] = useState({
    availabilityText: "",
    firstName: "",
    lastName: "",
    designation: "",
    description: "",
    heroStats: [{ label: "", value: "" }],
  });

  const [profileImage, setProfileImage] = useState(null);
  const [resume, setResume] = useState(null);

  const [imagePreview, setImagePreview] = useState("");
  const [existingResume, setExistingResume] = useState("");

  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const token = localStorage.getItem("token");

  useEffect(() => {
    const GetHeroByAdmin = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/portfolio/admin/hero`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        const hero = res.data.hero;

        if (hero) {
          setFormData({
            availabilityText: hero.availabilityText || "",
            firstName: hero.firstName || "",
            lastName: hero.lastName || "",
            designation: hero.designation || "",
            description: hero.description || "",
            heroStats: hero.heroStats?.length
              ? hero.heroStats
              : [{ label: "", value: "" }],
          });

          setImagePreview(hero.profileImage || "");
          setExistingResume(hero.resume || "");
        }

        showToast("Successfully fetched hero section.", "success");
      } catch (error) {
        showToast(
          error.response?.data?.message ||
            "Something went wrong, can't fetch hero section.",
          "error",
        );
      } finally {
        setLoading(false);
      }
    };

    GetHeroByAdmin();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (!["image/png", "image/jpeg", "image/webp"].includes(file.type)) {
      showToast("Please select a PNG, JPG or WEBP image.", "error");
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showToast("Image size must be less than 5 MB.", "error");
      e.target.value = "";
      return;
    }

    setProfileImage(file);
    setImagePreview(URL.createObjectURL(file));
  };

  const handleResumeChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (file.type !== "application/pdf") {
      showToast("Please select a PDF file.", "error");
      e.target.value = "";
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      showToast("Resume size must be less than 5 MB.", "error");
      e.target.value = "";
      return;
    }

    setResume(file);
  };

  const handleStatsChange = (index, field, value) => {
    const updatedStats = [...formData.heroStats];

    updatedStats[index] = {
      ...updatedStats[index],
      [field]: value,
    };

    setFormData((prev) => ({
      ...prev,
      heroStats: updatedStats,
    }));
  };

  const addStat = () => {
    setFormData((prev) => ({
      ...prev,
      heroStats: [...prev.heroStats, { label: "", value: "" }],
    }));
  };

  const removeStat = (index) => {
    setFormData((prev) => ({
      ...prev,
      heroStats: prev.heroStats.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imagePreview) {
      showToast("Please select a profile image.", "error");
      return;
    }

    setIsSubmitting(true);

    try {
      const data = new FormData();

      data.append("availabilityText", formData.availabilityText);
      data.append("firstName", formData.firstName);
      data.append("lastName", formData.lastName);
      data.append("designation", formData.designation);
      data.append("description", formData.description);
      data.append("heroStats", JSON.stringify(formData.heroStats));

      if (profileImage) {
        data.append("profileImage", profileImage);
      }

      if (resume) {
        data.append("resume", resume);
      }

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/portfolio/admin/hero/add`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      const hero = res.data.hero;

      setImagePreview(hero.profileImage || "");
      setExistingResume(hero.resume || "");

      setProfileImage(null);
      setResume(null);

      showToast("Successfully saved Hero section.", "success");
    } catch (error) {
      showToast(
        error.response?.data?.message ||
          "Something went wrong, can't save Hero section.",
        "error",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) return <PageLoader />;

  const inputClass =
    "w-full rounded-lg border border-slate-700 bg-[#0B1120] px-4 py-3 text-sm text-white outline-none transition placeholder:text-slate-500 focus:border-[#60A5FA] focus:ring-2 focus:ring-[#60A5FA]/10";

  const labelClass = "mb-2 block text-sm font-medium text-slate-300";

  return (
    <div className="w-full space-y-6">
      {/* PAGE HEADER */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div>
          <div className="mb-2 flex items-center gap-2 text-[#60A5FA]">
            <FiHome size={20} />
            <span className="text-sm font-medium">Portfolio Management</span>
          </div>

          <h1 className="text-2xl font-bold text-white sm:text-3xl">
            Home / Hero Section
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Manage your portfolio's home page content and profile details.
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* AVAILABILITY BADGE */}
        <section className="rounded-xl border border-slate-700/70 bg-[#111827] p-4 sm:p-6">
          <div className="mb-5 flex items-center gap-3">
            <span className="rounded-lg bg-[#60A5FA]/10 p-2.5 text-[#60A5FA]">
              <FiBriefcase size={19} />
            </span>

            <div>
              <h2 className="font-semibold text-white">Availability Badge</h2>
              <p className="text-xs text-slate-400">
                Text displayed above your hero introduction.
              </p>
            </div>
          </div>

          <label className={labelClass}>Availability Text</label>
          <input
            type="text"
            name="availabilityText"
            value={formData.availabilityText}
            onChange={handleChange}
            placeholder="Open to Internship Opportunities"
            className={inputClass}
          />
        </section>

        {/* PERSONAL DETAILS */}
        <section className="rounded-xl border border-slate-700/70 bg-[#111827] p-4 sm:p-6">
          <div className="mb-5 flex items-center gap-3">
            <span className="rounded-lg bg-[#60A5FA]/10 p-2.5 text-[#60A5FA]">
              <FiUser size={19} />
            </span>

            <div>
              <h2 className="font-semibold text-white">Personal Details</h2>
              <p className="text-xs text-slate-400">
                Enter your first and last name.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label className={labelClass}>First Name *</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter first name"
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className={labelClass}>Last Name *</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter last name"
                className={inputClass}
                required
              />
            </div>
          </div>
        </section>

        {/* PROFESSIONAL DETAILS */}
        <section className="rounded-xl border border-slate-700/70 bg-[#111827] p-4 sm:p-6">
          <div className="mb-5 flex items-center gap-3">
            <span className="rounded-lg bg-[#60A5FA]/10 p-2.5 text-[#60A5FA]">
              <FiFileText size={19} />
            </span>

            <div>
              <h2 className="font-semibold text-white">Professional Details</h2>
              <p className="text-xs text-slate-400">
                Your designation and hero introduction.
              </p>
            </div>
          </div>

          <div className="space-y-5">
            <div>
              <label className={labelClass}>Designation *</label>
              <input
                type="text"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                placeholder="AI/ML & Software Developer"
                className={inputClass}
                required
              />
            </div>

            <div>
              <label className={labelClass}>Description *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Write your professional introduction..."
                rows={5}
                className={`${inputClass} resize-y`}
                required
              />
            </div>
          </div>
        </section>

        {/* PROFILE IMAGE & RESUME */}
        <section className="rounded-xl border border-slate-700/70 bg-[#111827] p-4 sm:p-6">
          <div className="mb-5 flex items-center gap-3">
            <span className="rounded-lg bg-[#60A5FA]/10 p-2.5 text-[#60A5FA]">
              <FiImage size={19} />
            </span>

            <div>
              <h2 className="font-semibold text-white">Media & Resume</h2>
              <p className="text-xs text-slate-400">
                Upload your profile image and resume PDF.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {/* PROFILE IMAGE */}
            <div>
              <label className={labelClass}>Profile Image</label>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
                {imagePreview && (
                  <img
                    src={imagePreview}
                    alt="Profile Preview"
                    className="h-28 w-28 rounded-xl border border-slate-700 object-cover"
                  />
                )}

                <div className="flex-1">
                  <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-700 bg-[#0B1120] px-4 py-6 text-center transition hover:border-[#60A5FA]">
                    <FiImage size={25} className="mb-2 text-[#60A5FA]" />

                    <span className="text-sm font-medium text-slate-300">
                      Choose Profile Image
                    </span>

                    <span className="mt-1 text-xs text-slate-500">
                      PNG, JPG, JPEG or WEBP · Maximum 5 MB
                    </span>

                    <input
                      type="file"
                      accept="image/png,image/jpeg,image/webp"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>

                  {profileImage && (
                    <p className="mt-2 break-all text-xs text-emerald-400">
                      Selected: {profileImage.name}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* RESUME PDF */}
            <div>
              <label className={labelClass}>Resume PDF</label>

              <label className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-slate-700 bg-[#0B1120] px-4 py-6 text-center transition hover:border-[#60A5FA]">
                <FiFileText size={25} className="mb-2 text-[#60A5FA]" />

                <span className="text-sm font-medium text-slate-300">
                  Choose Resume PDF
                </span>

                <span className="mt-1 text-xs text-slate-500">
                  PDF files only · Maximum 5 MB
                </span>

                <input
                  type="file"
                  accept="application/pdf"
                  onChange={handleResumeChange}
                  className="hidden"
                />
              </label>

              {resume ? (
                <div className="mt-3 flex flex-wrap items-center justify-between gap-3 rounded-lg border border-slate-700 bg-[#0B1120] p-3">
                  <div className="flex min-w-0 items-center gap-2">
                    <FiFileText className="shrink-0 text-[#60A5FA]" />
                    <span className="break-all text-sm text-slate-300">
                      {resume.name}
                    </span>
                  </div>

                  <span className="text-xs text-emerald-400">
                    New file selected
                  </span>
                </div>
              ) : existingResume ? (
                <a
                  href={existingResume}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 flex items-center justify-between gap-3 rounded-lg border border-slate-700 bg-[#0B1120] p-3 text-sm text-[#60A5FA] transition hover:border-[#60A5FA]"
                >
                  <span className="flex items-center gap-2">
                    <FiFileText size={18} />
                    View Uploaded Resume
                  </span>

                  <FiExternalLink size={16} />
                </a>
              ) : (
                <p className="mt-3 text-xs text-slate-500">
                  No resume uploaded yet.
                </p>
              )}
            </div>
          </div>
        </section>

        {/* HERO STATISTICS */}
        <section className="rounded-xl border border-slate-700/70 bg-[#111827] p-4 sm:p-6">
          <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div>
              <h2 className="font-semibold text-white">Hero Statistics</h2>
              <p className="mt-1 text-xs text-slate-400">
                Add statistics displayed in your hero section.
              </p>
            </div>

            <button
              type="button"
              onClick={addStat}
              className="flex w-fit cursor-pointer items-center gap-2 rounded-lg bg-[#60A5FA]/10 px-4 py-2.5 text-sm font-medium text-[#60A5FA] transition hover:bg-[#60A5FA]/20"
            >
              <FiPlus size={17} />
              Add Statistic
            </button>
          </div>

          <div className="space-y-4">
            {formData.heroStats.map((stat, index) => (
              <div
                key={index}
                className="rounded-lg border border-slate-700/60 bg-[#0B1120] p-4"
              >
                <div className="mb-4 flex items-center justify-between">
                  <span className="text-sm font-medium text-slate-300">
                    Statistic {index + 1}
                  </span>

                  <button
                    type="button"
                    onClick={() => removeStat(index)}
                    className="cursor-pointer rounded-lg p-2 text-red-400 transition hover:bg-red-500/10"
                    aria-label={`Remove statistic ${index + 1}`}
                  >
                    <FiTrash2 size={17} />
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <label className={labelClass}>Label *</label>
                    <input
                      type="text"
                      value={stat.label}
                      onChange={(e) =>
                        handleStatsChange(index, "label", e.target.value)
                      }
                      placeholder="e.g. Projects Completed"
                      className={inputClass}
                      required
                    />
                  </div>

                  <div>
                    <label className={labelClass}>Value *</label>
                    <input
                      type="text"
                      value={stat.value}
                      onChange={(e) =>
                        handleStatsChange(index, "value", e.target.value)
                      }
                      placeholder="e.g. 10+"
                      className={inputClass}
                      required
                    />
                  </div>
                </div>
              </div>
            ))}
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
                Save Home Section
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminHome;
