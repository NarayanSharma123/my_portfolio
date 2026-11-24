import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const Policy = () => {
  const [privacy, setPrivacy] = useState({});

  useEffect(() => {
    const GetPrivacySection = async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/portfolio/privacy-section`,
        );

        setPrivacy(res.data.privacy);
        console.log("privacy: ", res.data.privacy);
      } catch (error) {
        console.log("Get privacy error: ", error);
      }
    };

    GetPrivacySection();
  }, []);

  return (
    <section
      id="policy"
      className="bg-[#0B1120] px-5 py-20 text-white sm:px-8 lg:px-16"
    >
      <div className="mx-auto max-w-4xl">
        <div className="mb-8">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
            Legal Information
          </p>

          <h2 className="text-3xl font-bold sm:text-4xl">Privacy Policy</h2>

          <p className="mt-3 text-sm text-slate-500">
            Last updated:{" "}
            {privacy?.updatedAt
              ? new Date(privacy?.updatedAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })
              : ""}
          </p>
        </div>

        <div className="space-y-6 rounded-xl border border-slate-800 bg-[#111827] p-6 sm:p-8">
          {privacy?.sections?.map((privacy, index) => {
            return (
              <div key={index}>
                <h3 className="mb-2 text-lg font-semibold text-slate-100">
                  {privacy?.heading}
                </h3>

                <p className="text-sm leading-7 text-slate-400">
                  {privacy?.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Policy;
