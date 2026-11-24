import React, { useEffect, useState } from "react";
import { FiShield, FiPlus, FiTrash2, FiSave, FiFileText } from "react-icons/fi";
import PageLoader from "../../../pages/PageLoader";
import Loader from "../../../pages/Loader";
import axios from "axios";
import { showToast } from "../../../pages/Toast";

const AdminPrivacy = () => {
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    sections: [
      {
        heading: "",
        description: "",
      },
    ],
  });

  useEffect(() => {
    const GetPrivacyByAdmin = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/portfolio/admin/privacy`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setFormData({
          sections: res.data.privacy.sections || [
            {
              heading: "",
              description: "",
            },
          ],
        });

        showToast("Successfully fetched Privacy Policy.", "success");
      } catch (error) {
        showToast(
          "Something went wrong, Can't get privacy policy section.",
          "error",
        );
      } finally {
        setLoading(false);
      }
    };

    GetPrivacyByAdmin();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/portfolio/admin/privacy/add`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      showToast("Successfully add Privacy policy.", "success");
    } catch (error) {
      showToast(
        "Something went wrong, Can't add privacy policy section.",
        "error",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Section Change
  const handleSectionChange = (index, field, value) => {
    const updatedSections = [...formData.sections];

    updatedSections[index][field] = value;

    setFormData({
      ...formData,
      sections: updatedSections,
    });
  };

  // Add Section
  const addSection = () => {
    setFormData({
      ...formData,
      sections: [
        ...formData.sections,
        {
          heading: "",
          description: "",
        },
      ],
    });
  };

  // Remove Section
  const removeSection = (index) => {
    setFormData({
      ...formData,
      sections: formData.sections.filter((_, i) => i !== index),
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
            <FiShield size={20} />
            <span className="text-sm font-medium">Portfolio Management</span>
          </div>

          <h1 className="text-2xl font-bold sm:text-3xl">
            Manage Privacy Policy
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Create and manage your portfolio privacy policy sections.
          </p>
        </div>

        <button
          type="button"
          onClick={addSection}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#60A5FA] px-5 py-3 text-sm font-semibold text-[#0B1120] transition hover:bg-blue-400"
        >
          <FiPlus size={18} />
          Add Section
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Privacy Sections */}
        <section>
          <div className="mb-5 flex items-center gap-2">
            <FiFileText size={20} className="text-[#60A5FA]" />
            <h2 className="text-lg font-semibold">Policy Sections</h2>
          </div>

          <div className="space-y-5">
            {formData.sections.map((section, index) => (
              <div
                key={index}
                className="rounded-xl border border-slate-700/70 bg-[#111827] p-5 sm:p-7"
              >
                {/* Section Header */}
                <div className="mb-6 flex items-center justify-between border-b border-slate-700/70 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-[#60A5FA]/10 p-2.5 text-[#60A5FA]">
                      <FiFileText size={20} />
                    </div>

                    <div>
                      <h3 className="font-semibold">Section {index + 1}</h3>
                      <p className="text-xs text-slate-400">
                        Privacy policy details
                      </p>
                    </div>
                  </div>

                  {formData.sections.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSection(index)}
                      className="rounded-lg p-2 text-red-400 transition hover:bg-red-500/10"
                      title="Remove Section"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  )}
                </div>

                <div className="space-y-5">
                  {/* Heading */}
                  <div>
                    <label className={labelClass}>Section Heading</label>
                    <input
                      type="text"
                      required
                      value={section.heading}
                      onChange={(e) =>
                        handleSectionChange(index, "heading", e.target.value)
                      }
                      placeholder="e.g. Information We Collect"
                      className={inputClass}
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className={labelClass}>Description</label>
                    <textarea
                      rows={5}
                      required
                      value={section.description}
                      onChange={(e) =>
                        handleSectionChange(
                          index,
                          "description",
                          e.target.value,
                        )
                      }
                      placeholder="Write your privacy policy content..."
                      className={`${inputClass} resize-y`}
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
                Save Privacy Policy
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminPrivacy;
