import React, { useEffect, useState } from "react";
import {
  FiBriefcase,
  FiFileText,
  FiLayers,
  FiPlus,
  FiTrash2,
  FiSave,
  FiChevronDown,
  FiCheck,
} from "react-icons/fi";
import PageLoader from "../../../pages/PageLoader";
import Loader from "../../../pages/Loader";
import axios from "axios";
import iconMap from "../../../utils/iconMap";
import { showToast } from "../../../pages/Toast";

const AdminServices = () => {
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [iconDropdownOpen, setIconDropdownOpen] = useState(false);

  const [formData, setFormData] = useState({
    heading: "",
    description: "",
    services: [
      {
        icon: "",
        title: "",
        description: "",
      },
    ],
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    const GetServicesByAdmin = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/portfolio/admin/services`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setFormData({
          heading: res.data.services.heading || "",
          description: res.data.services.description || "",
          services: res.data.services.services || [
            { icon: "", title: "", description: "" },
          ],
        });

        showToast("Successfully fetched Services.", "success");
      } catch (error) {
        showToast("Something went wrong, Can't fetched services.", "error");
      } finally {
        setLoading(false);
      }
    };

    GetServicesByAdmin();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/portfolio/admin/services/add`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      showToast("Successfully added services.", "success");
    } catch (error) {
      showToast("Something went wrong, Can't add services.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // COMMON INPUT CHANGE
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // SERVICE INPUT CHANGE
  const handleServiceChange = (index, field, value) => {
    const updatedServices = [...formData.services];

    updatedServices[index] = {
      ...updatedServices[index],
      [field]: value,
    };

    setFormData((prev) => ({
      ...prev,
      services: updatedServices,
    }));
  };

  // ADD SERVICE
  const addService = () => {
    setFormData((prev) => ({
      ...prev,
      services: [
        ...prev.services,
        {
          icon: "",
          title: "",
          description: "",
        },
      ],
    }));
  };

  // REMOVE SERVICE
  const removeService = (index) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.filter((_, i) => i !== index),
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
            <FiBriefcase size={20} />
            <span className="text-sm font-medium">Portfolio Management</span>
          </div>

          <h1 className="text-2xl font-bold text-white sm:text-3xl">
            Services Section
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Manage your services heading, description and service cards.
          </p>
        </div>

        <span className="flex w-fit items-center gap-2 rounded-full border border-[#60A5FA]/20 bg-[#60A5FA]/10 px-4 py-2 text-sm font-medium text-[#60A5FA]">
          <FiBriefcase size={15} />
          Services Management
        </span>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* SECTION DETAILS */}
        <section className="rounded-xl border border-slate-700/70 bg-[#111827] p-4 sm:p-6">
          <div className="mb-5 flex items-center gap-3">
            <span className="rounded-lg bg-[#60A5FA]/10 p-2.5 text-[#60A5FA]">
              <FiFileText size={19} />
            </span>

            <div>
              <h2 className="font-semibold text-white">Section Details</h2>

              <p className="text-xs text-slate-400">
                Customize your services section heading and introduction.
              </p>
            </div>
          </div>

          <div className="space-y-5">
            {/* HEADING */}
            <div>
              <label className={labelClass}>Services Heading *</label>

              <input
                type="text"
                name="heading"
                value={formData.heading}
                onChange={handleChange}
                placeholder="e.g. My Services"
                className={inputClass}
                required
              />
            </div>

            {/* DESCRIPTION */}
            <div>
              <label className={labelClass}>Section Description *</label>

              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Write an introduction services the services you provide..."
                rows={5}
                className={`${inputClass} resize-y`}
                required
              />

              <div className="mt-2 flex justify-end">
                <span className="text-xs text-slate-500">
                  {formData.description.length} characters
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* SERVICES LIST */}
        <section className="rounded-xl border border-slate-700/70 bg-[#111827] p-4 sm:p-6">
          <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <span className="rounded-lg bg-[#60A5FA]/10 p-2.5 text-[#60A5FA]">
                <FiLayers size={19} />
              </span>

              <div>
                <h2 className="font-semibold text-white">Services List</h2>

                <p className="text-xs text-slate-400">
                  Add and manage your individual service cards.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={addService}
              className="flex w-fit cursor-pointer items-center gap-2 rounded-lg bg-[#60A5FA]/10 px-4 py-2.5 text-sm font-medium text-[#60A5FA] transition hover:bg-[#60A5FA]/20"
            >
              <FiPlus size={17} />
              Add Service
            </button>
          </div>

          <div className="space-y-4">
            {formData.services.map((service, index) => (
              <div
                key={index}
                className="rounded-lg border border-slate-700/60 bg-[#0B1120] p-4 sm:p-5"
              >
                {/* CARD HEADER */}
                <div className="mb-5 flex items-center justify-between">
                  <span className="text-sm font-semibold text-slate-300">
                    Service {index + 1}
                  </span>

                  <button
                    type="button"
                    onClick={() => removeService(index)}
                    disabled={formData.services.length === 1}
                    className="cursor-pointer rounded-lg p-2 text-red-400 transition hover:bg-red-500/10 disabled:cursor-not-allowed disabled:opacity-30"
                    aria-label={`Remove service ${index + 1}`}
                    title={
                      formData.services.length === 1
                        ? "At least one service is required"
                        : "Remove service"
                    }
                  >
                    <FiTrash2 size={17} />
                  </button>
                </div>

                <div className="space-y-4">
                  {/* ICON */}

                  <div className="relative">
                    <label className={labelClass}>Service Icon *</label>

                    <button
                      type="button"
                      onClick={() => setIconDropdownOpen((prev) => !prev)}
                      className={`${inputClass} flex items-center justify-between text-left cursor-pointer`}
                    >
                      <span className="flex items-center gap-3">
                        {service.icon && iconMap[service.icon] ? (
                          <>
                            {React.createElement(iconMap[service.icon], {
                              size: 18,
                              className: "text-[#60A5FA]",
                            })}
                            <span>{service.icon}</span>
                          </>
                        ) : (
                          <span className="text-slate-500">
                            Select service icon
                          </span>
                        )}
                      </span>

                      <FiChevronDown
                        size={18}
                        className={`text-slate-400 transition-transform duration-200 ${
                          iconDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {iconDropdownOpen && (
                      <div className="absolute z-50 mt-2 w-full overflow-hidden rounded-xl border border-slate-700 bg-[#111827] shadow-xl shadow-black/30">
                        <div className="max-h-56 overflow-y-auto p-2 custom-scrollbar">
                          {Object.entries(iconMap).map(([iconName, Icon]) => (
                            <button
                              key={iconName}
                              type="button"
                              onClick={() => {
                                handleServiceChange(index, "icon", iconName);
                                setIconDropdownOpen(false);
                              }}
                              className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-colors duration-200 ${
                                service.icon === iconName
                                  ? "bg-[#60A5FA]/10 text-[#60A5FA]"
                                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
                              }`}
                            >
                              <span className="flex items-center gap-3">
                                <Icon size={18} />
                                {iconName}
                              </span>

                              {service.icon === iconName && (
                                <FiCheck size={17} className="text-[#60A5FA]" />
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <p className="mt-2 text-xs text-slate-500">
                      Select an icon from the available frontend iconMap.
                    </p>
                  </div>

                  {/* TITLE */}
                  <div>
                    <label className={labelClass}>Service Title *</label>

                    <input
                      type="text"
                      value={service.title}
                      onChange={(e) =>
                        handleServiceChange(index, "title", e.target.value)
                      }
                      placeholder="e.g. Web Development"
                      className={inputClass}
                      required
                    />
                  </div>

                  {/* DESCRIPTION */}
                  <div>
                    <label className={labelClass}>Service Description *</label>

                    <textarea
                      value={service.description}
                      onChange={(e) =>
                        handleServiceChange(
                          index,
                          "description",
                          e.target.value,
                        )
                      }
                      placeholder="Describe the service you provide..."
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
            Total Services: {formData.services.length}
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
                Save Services
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminServices;
