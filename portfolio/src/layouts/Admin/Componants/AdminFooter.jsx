import React, { useEffect, useState } from "react";
import {
  FiLayers,
  FiPlus,
  FiTrash2,
  FiSave,
  FiLink,
  FiChevronDown,
  FiCheck,
  FiGlobe,
  FiShare2,
} from "react-icons/fi";
import PageLoader from "../../../pages/PageLoader";
import Loader from "../../../pages/Loader";
import axios from "axios";
import iconMap from "../../../utils/iconMap";
import { showToast } from "../../../pages/Toast";

const AdminFooter = () => {
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [socialIconDropdownOpen, setSocialIconDropdownOpen] = useState(false);

  const [formData, setFormData] = useState({
    socialLinks: [
      {
        icon: "",
        title: "",
        url: "",
      },
    ],
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    const GetFooterByAdmin = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/portfolio/admin/footer`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setFormData({
          socialLinks: res.data.footer.socialLinks || [
            {
              icon: "",
              title: "",
              url: "",
            },
          ],
        });

        showToast("Successfully fetched Footer section.", "success");
      } catch (error) {
        showToast("Something went wrong, Cant fetch footer section", "error");
      } finally {
        setLoading(false);
      }
    };

    GetFooterByAdmin();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/portfolio/admin/footer/add`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      showToast("Successfully add Footer section.", "success");
    } catch (error) {
      showToast("Something went wrong, Can't add Footer section.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle Social Link Change
  const handleSocialChange = (index, field, value) => {
    const updatedLinks = [...formData.socialLinks];

    updatedLinks[index][field] = value;

    setFormData({
      ...formData,
      socialLinks: updatedLinks,
    });
  };

  // Add Social Link
  const addSocialLink = () => {
    setFormData({
      ...formData,
      socialLinks: [
        ...formData.socialLinks,
        {
          icon: "",
          title: "",
          url: "",
        },
      ],
    });
  };

  // Remove Social Link
  const removeSocialLink = (index) => {
    setFormData({
      ...formData,
      socialLinks: formData.socialLinks.filter((_, i) => i !== index),
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
            <FiLayers size={20} />
            <span className="text-sm font-medium">Portfolio Management</span>
          </div>

          <h1 className="text-2xl font-bold sm:text-3xl">Manage Footer</h1>

          <p className="mt-2 text-sm text-slate-400">
            Add and manage your portfolio social media links.
          </p>
        </div>

        <button
          type="button"
          onClick={addSocialLink}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#60A5FA] px-5 py-3 text-sm font-semibold text-[#0B1120] transition hover:bg-blue-400"
        >
          <FiPlus size={18} />
          Add Social Link
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Social Links */}
        <section>
          <div className="mb-5 flex items-center gap-2">
            <FiShare2 size={20} className="text-[#60A5FA]" />
            <h2 className="text-lg font-semibold">Social Links</h2>
          </div>

          <div className="space-y-5">
            {formData.socialLinks.map((social, index) => (
              <div
                key={index}
                className="rounded-xl border border-slate-700/70 bg-[#111827] p-5 sm:p-7"
              >
                {/* Card Header */}
                <div className="mb-6 flex items-center justify-between border-b border-slate-700/70 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-[#60A5FA]/10 p-2.5 text-[#60A5FA]">
                      <FiShare2 size={20} />
                    </div>

                    <div>
                      <h3 className="font-semibold">Social Link {index + 1}</h3>
                      <p className="text-xs text-slate-400">
                        Social media details
                      </p>
                    </div>
                  </div>

                  {formData.socialLinks.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeSocialLink(index)}
                      className="rounded-lg p-2 text-red-400 transition hover:bg-red-500/10"
                      title="Remove Social Link"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  {/* Icon */}
                  <div className="relative">
                    <label className={labelClass}>Icon Name</label>

                    <button
                      type="button"
                      onClick={() => setSocialIconDropdownOpen((prev) => !prev)}
                      className={`${inputClass} flex items-center justify-between text-left`}
                    >
                      <span className="flex items-center gap-3">
                        {(() => {
                          const SelectedIcon = iconMap[social.icon];

                          return SelectedIcon ? (
                            <SelectedIcon size={18} />
                          ) : (
                            <FiGlobe size={18} />
                          );
                        })()}

                        <span>{social.icon || "Select an icon"}</span>
                      </span>

                      <FiChevronDown
                        size={18}
                        className={`transition-transform ${
                          socialIconDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {socialIconDropdownOpen && (
                      <div className="absolute z-50 mt-2 max-h-56 w-full overflow-y-auto rounded-xl border border-slate-700 bg-[#111827] p-2 shadow-xl shadow-black/30 custom-scrollbar">
                        {Object.entries(iconMap).map(([iconName, Icon]) => {
                          const isSelected = social.icon === iconName;

                          return (
                            <button
                              key={iconName}
                              type="button"
                              onClick={() => {
                                handleSocialChange(index, "icon", iconName);
                                setSocialIconDropdownOpen(false);
                              }}
                              className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-colors ${
                                isSelected
                                  ? "bg-[#60A5FA]/10 text-[#60A5FA]"
                                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
                              }`}
                            >
                              <span className="flex items-center gap-3">
                                <Icon size={18} />
                                {iconName}
                              </span>

                              {isSelected && <FiCheck size={16} />}
                            </button>
                          );
                        })}
                      </div>
                    )}

                    <p className="mt-2 text-xs text-slate-500">
                      Select an icon from the available iconMap.
                    </p>
                  </div>

                  {/* Title */}
                  <div>
                    <label className={labelClass}>Social Title</label>
                    <input
                      type="text"
                      required
                      value={social.title}
                      onChange={(e) =>
                        handleSocialChange(index, "title", e.target.value)
                      }
                      placeholder="e.g. GitHub"
                      className={inputClass}
                    />
                  </div>

                  {/* URL */}
                  <div className="md:col-span-2">
                    <label className={labelClass}>
                      <span className="flex items-center gap-2">
                        <FiLink className="text-[#60A5FA]" />
                        Social Profile URL
                      </span>
                    </label>

                    <input
                      type="url"
                      required
                      value={social.url}
                      onChange={(e) =>
                        handleSocialChange(index, "url", e.target.value)
                      }
                      placeholder="https://github.com/username"
                      className={inputClass}
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
                Save Footer
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminFooter;
