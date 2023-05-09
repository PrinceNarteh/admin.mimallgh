import React from "react";

export const Loader = () => {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-dark-gray z-50 bg-opacity-80">
      <div className="flex justify-center">
        <span className="circle animate-loader"></span>
        <span className="circle animation-delay-200 animate-loader"></span>
        <span className="circle animation-delay-400 animate-loader"></span>
      </div>
    </div>
  );
};
