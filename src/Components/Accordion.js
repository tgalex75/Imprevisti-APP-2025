import { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

const Accordion = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full border-[--clr-txt] ">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full mb-4 justify-between transition-all ease-out duration-300 bg-transparent border-4 rounded-t-lg border-[--clr-btn] px-4 py-6 text-left text-lg font-bold uppercase text-[--clr-txt] hover:bg-[--clr-btn] focus:outline-none"
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
