import React from "react";

const Spinner = () => {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <div className="h-16 w-16 animate-spin rounded-full border-b-4 border-t-4 border-blue-500"></div>
      <p className="mt-4 text-lg">Caricamento...</p>
    </div>
  );
};

export default Spinner;
