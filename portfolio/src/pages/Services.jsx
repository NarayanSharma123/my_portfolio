import React, { useEffect, useState } from "react";
import iconMap from "../utils/iconMap";
import axios from "axios";

const Services = () => {
  const [services, setServices] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const GetServicesSection = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/portfolio/services-section`,
        );
        setServices(res.data.services);
      } catch (error) {
        console.log("Get services error: ", error);
      } finally {
        setLoading(false);
      }
    };

    GetServicesSection();
  }, []);

  return (
    <section
      id="services"
      className="bg-[#0B1120] px-5 py-24 text-white sm:px-8 lg:px-16"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-14 max-w-2xl">
          <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-blue-400">
            What I Work On
          </p>

          <h2 className="text-3xl font-bold sm:text-4xl">
            {services?.heading}
          </h2>

          <p className="mt-4 leading-7 text-slate-400">
            {services?.description}
          </p>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {services?.services?.map((service) => {
            const Icon = iconMap[service?.icon];

            return (
              <div
                key={service?.title}
                className="rounded-xl border border-slate-800 bg-[#111827] p-7 transition-colors duration-300 hover:border-blue-400/50"
              >
                <div className="mb-6 inline-flex rounded-lg border border-blue-400/20 bg-blue-400/10 p-3 text-blue-400">
                  <Icon className="h-7 w-7" />
                </div>

                <h3 className="text-xl font-semibold text-slate-100">
                  {service?.title}
                </h3>

                <p className="mt-3 text-sm leading-7 text-slate-400">
                  {service?.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default Services;
