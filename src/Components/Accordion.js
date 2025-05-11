import React, { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

const Accordion = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full border-b border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full justify-between bg-black/50 px-4 py-6 text-left text-lg font-bold uppercase text-gray-300 hover:bg-black/75 focus:outline-none"
      >
        {title}
        <IoMdArrowDropdown
          className={`transform transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          size={32}
        />
      </button>

      <div
        className={`transition-max-height overflow-hidden duration-700 ease-in-out ${
          isOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        {content}
      </div>
    </div>
  );
};

export default Accordion;
