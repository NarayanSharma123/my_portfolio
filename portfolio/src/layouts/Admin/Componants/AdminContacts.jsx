import React, { useEffect, useState } from "react";
import {
  FiMail,
  FiPlus,
  FiTrash2,
  FiSave,
  FiMessageSquare,
  FiLink,
  FiBriefcase,
  FiChevronDown,
  FiCheck,
} from "react-icons/fi";
import PageLoader from "../../../pages/PageLoader";
import Loader from "../../../pages/Loader";
import axios from "axios";
import { showToast } from "../../../pages/Toast";
import iconMap from "../../../utils/iconMap";

const AdminContacts = () => {
  const [loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactIconDropdownOpen, setContactIconDropdownOpen] = useState(false);
  const [opportunityIconDropdownOpen, setOpportunityIconDropdownOpen] =
    useState(false);

  const [formData, setFormData] = useState({
    contacts: [
      {
        icon: "",
        title: "",
        description: "",
        linkText: "",
        url: "",
      },
    ],
    opportunity: {
      icon: "",
      heading: "",
      description: "",
    },
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    const GetContactByAdmin = async () => {
      try {
        setLoading(true);
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/portfolio/admin/contacts`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );

        setFormData({
          contacts: res.data.contacts.contacts || [
            { icon: "", title: "", description: "", linkText: "", url: "" },
          ],
          opportunity: res.data.contacts.opportunity || {
            icon: "",
            heading: "",
            description: "",
          },
        });
        showToast("Successfully fetched contact section", "success");
      } catch (error) {
        showToast("Something went wrong, Cant fetch contacts", "error");
      } finally {
        setLoading(false);
      }
    };

    GetContactByAdmin();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setIsSubmitting(true);

    try {
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/portfolio/admin/contacts/add`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      showToast("Successfully added contacts.", "success");
    } catch (error) {
      showToast("Something went wrong, Can't add contacts.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Contact Field Change
  const handleContactChange = (index, field, value) => {
    const updatedContacts = [...formData.contacts];

    updatedContacts[index][field] = value;

    setFormData({
      ...formData,
      contacts: updatedContacts,
    });
  };

  // Add Contact
  const addContact = () => {
    setFormData({
      ...formData,
      contacts: [
        ...formData.contacts,
        {
          icon: "",
          title: "",
          description: "",
          linkText: "",
          url: "",
        },
      ],
    });
  };

  // Remove Contact
  const removeContact = (index) => {
    setFormData({
      ...formData,
      contacts: formData.contacts.filter((_, i) => i !== index),
    });
  };

  // Opportunity Field Change
  const handleOpportunityChange = (field, value) => {
    setFormData({
      ...formData,
      opportunity: {
        ...formData.opportunity,
        [field]: value,
      },
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
            <FiMail size={20} />
            <span className="text-sm font-medium">Portfolio Management</span>
          </div>

          <h1 className="text-2xl font-bold sm:text-3xl">Manage Contact</h1>

          <p className="mt-2 text-sm text-slate-400">
            Manage your contact details and opportunity section.
          </p>
        </div>

        <button
          type="button"
          onClick={addContact}
          className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#60A5FA] px-5 py-3 text-sm font-semibold text-[#0B1120] transition hover:bg-blue-400"
        >
          <FiPlus size={18} />
          Add Contact
        </button>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Contact Cards */}
        <section>
          <div className="mb-5 flex items-center gap-2">
            <FiMessageSquare className="text-[#60A5FA]" size={20} />
            <h2 className="text-lg font-semibold">Contact Information</h2>
          </div>

          <div className="space-y-5">
            {formData.contacts.map((contact, index) => (
              <div
                key={index}
                className="rounded-xl border border-slate-700/70 bg-[#111827] p-5 sm:p-7"
              >
                {/* Card Header */}
                <div className="mb-6 flex items-center justify-between border-b border-slate-700/70 pb-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-[#60A5FA]/10 p-2.5 text-[#60A5FA]">
                      <FiMail size={20} />
                    </div>

                    <div>
                      <h3 className="font-semibold">Contact {index + 1}</h3>
                      <p className="text-xs text-slate-400">
                        Contact card details
                      </p>
                    </div>
                  </div>

                  {formData.contacts.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeContact(index)}
                      className="rounded-lg p-2 text-red-400 transition hover:bg-red-500/10"
                      title="Remove Contact"
                    >
                      <FiTrash2 size={18} />
                    </button>
                  )}
                </div>

                <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
                  {/* Icon */}

                  <div className="relative">
                    <label className={labelClass}>Contact Icon *</label>

                    <button
                      type="button"
                      onClick={() =>
                        setContactIconDropdownOpen((prev) => !prev)
                      }
                      className={`${inputClass} flex items-center justify-between text-left cursor-pointer`}
                    >
                      <span className="flex items-center gap-3">
                        {contact.icon && iconMap[contact.icon] ? (
                          <>
                            {React.createElement(iconMap[contact.icon], {
                              size: 18,
                              className: "text-[#60A5FA]",
                            })}
                            <span>{contact.icon}</span>
                          </>
                        ) : (
                          <span className="text-slate-500">
                            Select contact icon
                          </span>
                        )}
                      </span>

                      <FiChevronDown
                        size={18}
                        className={`text-slate-400 transition-transform duration-200 ${
                          contactIconDropdownOpen ? "rotate-180" : ""
                        }`}
                      />
                    </button>

                    {contactIconDropdownOpen && (
                      <div className="absolute z-50 mt-2 w-full overflow-hidden rounded-xl border border-slate-700 bg-[rgb(17,24,39)] shadow-xl shadow-black/30">
                        <div className="max-h-56 overflow-y-auto p-2 custom-scrollbar">
                          {Object.entries(iconMap).map(([iconName, Icon]) => (
                            <button
                              key={iconName}
                              type="button"
                              onClick={() => {
                                handleContactChange(index, "icon", iconName);
                                setContactIconDropdownOpen(false);
                              }}
                              className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-colors duration-200 ${
                                contact.icon === iconName
                                  ? "bg-[#60A5FA]/10 text-[#60A5FA]"
                                  : "text-slate-300 hover:bg-slate-800 hover:text-white"
                              }`}
                            >
                              <span className="flex items-center gap-3">
                                <Icon size={18} />
                                {iconName}
                              </span>

                              {contact.icon === iconName && (
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

                  {/* Title */}
                  <div>
                    <label className={labelClass}>Contact Title</label>
                    <input
                      type="text"
                      required
                      value={contact.title}
                      onChange={(e) =>
                        handleContactChange(index, "title", e.target.value)
                      }
                      placeholder="e.g. Email Address"
                      className={inputClass}
                    />
                  </div>

                  {/* Description */}
                  <div>
                    <label className={labelClass}>Description</label>
                    <input
                      type="text"
                      required
                      value={contact.description}
                      onChange={(e) =>
                        handleContactChange(
                          index,
                          "description",
                          e.target.value,
                        )
                      }
                      placeholder="e.g. hello@example.com"
                      className={inputClass}
                    />
                  </div>

                  {/* Link Text */}
                  <div>
                    <label className={labelClass}>Link Text</label>
                    <input
                      type="text"
                      required
                      value={contact.linkText}
                      onChange={(e) =>
                        handleContactChange(index, "linkText", e.target.value)
                      }
                      placeholder="e.g. Send Email"
                      className={inputClass}
                    />
                  </div>

                  {/* URL */}
                  <div className="md:col-span-2">
                    <label className={labelClass}>
                      <span className="flex items-center gap-2">
                        <FiLink className="text-[#60A5FA]" />
                        Contact URL
                      </span>
                    </label>

                    <input
                      type="text"
                      required
                      value={contact.url}
                      onChange={(e) =>
                        handleContactChange(index, "url", e.target.value)
                      }
                      placeholder="e.g. mailto:hello@example.com"
                      className={inputClass}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Opportunity Section */}
        <section className="rounded-xl border border-slate-700/70 bg-[#111827] p-5 sm:p-7">
          <div className="mb-6 flex items-center gap-3 border-b border-slate-700/70 pb-4">
            <div className="rounded-lg bg-[#60A5FA]/10 p-2.5 text-[#60A5FA]">
              <FiBriefcase size={20} />
            </div>

            <div>
              <h2 className="font-semibold">Opportunity Section</h2>
              <p className="text-xs text-slate-400">
                Manage your opportunity message
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
            {/* Icon */}

            <div className="relative">
              <label className={labelClass}>Opportunity Icon *</label>

              <button
                type="button"
                onClick={() => setOpportunityIconDropdownOpen((prev) => !prev)}
                className={`${inputClass} flex items-center justify-between text-left cursor-pointer`}
              >
                <span className="flex items-center gap-3">
                  {formData.opportunity.icon &&
                  iconMap[formData.opportunity.icon] ? (
                    <>
                      {React.createElement(iconMap[formData.opportunity.icon], {
                        size: 18,
                        className: "text-[#60A5FA]",
                      })}
                      <span>{formData.opportunity.icon}</span>
                    </>
                  ) : (
                    <span className="text-slate-500">
                      Select opportunity icon
                    </span>
                  )}
                </span>

                <FiChevronDown
                  size={18}
                  className={`text-slate-400 transition-transform duration-200 ${
                    opportunityIconDropdownOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {opportunityIconDropdownOpen && (
                <div className="absolute z-50 mt-2 w-full overflow-hidden rounded-xl border border-slate-700 bg-[#111827] shadow-xl shadow-black/30">
                  <div className="max-h-56 overflow-y-auto p-2 custom-scrollbar">
                    {Object.entries(iconMap).map(([iconName, Icon]) => (
                      <button
                        key={iconName}
                        type="button"
                        onClick={() => {
                          handleOpportunityChange("icon", iconName);
                          setOpportunityIconDropdownOpen(false);
                        }}
                        className={`flex w-full items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-colors duration-200 ${
                          formData.opportunity.icon === iconName
                            ? "bg-[#60A5FA]/10 text-[#60A5FA]"
                            : "text-slate-300 hover:bg-slate-800 hover:text-white"
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <Icon size={18} />
                          {iconName}
                        </span>

                        {formData.opportunity.icon === iconName && (
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

            {/* Heading */}
            <div>
              <label className={labelClass}>Heading</label>
              <input
                type="text"
                required
                value={formData.opportunity.heading}
                onChange={(e) =>
                  handleOpportunityChange("heading", e.target.value)
                }
                placeholder="e.g. Open to Opportunities"
                className={inputClass}
              />
            </div>

            {/* Description */}
            <div className="md:col-span-2">
              <label className={labelClass}>Description</label>
              <textarea
                required
                rows={4}
                value={formData.opportunity.description}
                onChange={(e) =>
                  handleOpportunityChange("description", e.target.value)
                }
                placeholder="Write your opportunity description..."
                className={`${inputClass} resize-none`}
              />
            </div>
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
                Save Contact
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminContacts;
