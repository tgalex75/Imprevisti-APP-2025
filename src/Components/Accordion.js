import { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

const Accordion = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full mb-2 items-center justify-between transition-all ease-out duration-300 bg-transparent border-4 rounded-t-lg border-[rgb(var(--clr-btn))] p-2 xl:p-4 text-left text-sm xl:text-lg font-bold uppercase text-[rgb(var(--clr-txt))] hover:bg-[rgb(var(--clr-btn)/.7)] focus:outline-none"
      >
        {title}
        <IoMdArrowDropdown
          className={`transform transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          size={32}
        />
      </button>

      <div
        className={`transition-max-height overflow-y-auto xl:overflow-hidden duration-700 ease-in-out ${
          isOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        {content}
      </div>
    </div>
  );
};

export default Accordion;
