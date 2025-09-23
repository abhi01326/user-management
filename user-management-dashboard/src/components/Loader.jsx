import React from "react";

const Loader = () => {
  return (
    <div
      className="absolute h-full w-full flex items-center justify-center
       bg-[rgba(0.36,0.35,0.36,0.3)] text-white"
       data-testid="loader"
    >
      Loading ...
    </div>
  );
};

export default Loader;
