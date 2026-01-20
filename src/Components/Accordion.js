import { useState } from "react";
import { IoMdArrowDropdown } from "react-icons/io";

const Accordion = ({ title, content }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => {
    let timeout = setTimeout(() => {
          setIsOpen(false);
        }, 2000);
        return () => clearTimeout(timeout);
  }

  return (
    <div className="w-full py-4" onMouseLeave={() => handleOpen()}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="mb-2 flex w-full items-center justify-between rounded-t-lg border-4 border-[rgb(var(--clr-btn))] bg-transparent p-2 text-left text-sm font-bold uppercase text-[rgb(var(--clr-txt))] transition-all duration-300 ease-out hover:bg-[rgb(var(--clr-btn)/.7)] focus:outline-none xl:p-4 xl:text-lg"
      >
        {title}
        <IoMdArrowDropdown
          className={`transform transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
          size={32}
        />
      </button>

      <div
        className={`transition-max-height overflow-y-auto duration-700 ease-in-out xl:overflow-hidden ${
          isOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        {content}
      </div>
    </div>
  );
};

export default Accordion;
