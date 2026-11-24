import React from "react";

const Loader = ({ size = "md" }) => {
  const sizes = {
    sm: "w-4 h-4 border-2",
    md: "w-5 h-5 border-2",
    lg: "w-7 h-7 border-[3px]",
  };

  return (
    <span
      className={`inline-block shrink-0 ${
        sizes[size] || sizes.md
      } animate-spin rounded-full border-slate-500 border-t-[#60A5FA]`}
      role="status"
      aria-label="Loading"
    />
  );
};

export default Loader;
