import React from "react";

const PageLoader = ({ size = "md" }) => {
  const sizes = {
    sm: "w-5 h-5 border-2",
    md: "w-9 h-9 border-[3px]",
    lg: "w-14 h-14 border-4",
  };

  return (
    <div className="fixed inset-0 z-[9999] flex min-h-screen items-center justify-center bg-[#0B1120]">
      <div className="flex flex-col items-center gap-5">
        <div
          className={`rounded-full border-slate-700 border-t-[#60A5FA] animate-spin ${
            sizes[size] || sizes.md
          }`}
          role="status"
          aria-label="Loading"
        />

        <div className="flex flex-col items-center gap-1">
          <p className="text-sm font-semibold tracking-widest text-white">
            PORTFOLIO
          </p>
          <p className="text-xs tracking-wide text-slate-400">
            Preparing your experience...
          </p>
        </div>
      </div>
    </div>
  );
};

export default PageLoader;
