import { useState } from "react";
import { delImprevisto } from "./delImprevisto";
import { MdDeleteForever } from "react-icons/md";

const EliminaImprevisto = (props) => {
  const { id } = props;

  const [isSaved, setIsSaved] = useState(false);

  const eliminaImprevisto = async () => {
    delImprevisto("speciali", id);
    setIsSaved(true);
  };

  return (
    <section className="flex h-full flex-col items-center">
      <button
        onClick={eliminaImprevisto}
        className="hover:[rgb(var(--clr-btn))] peer rounded-full p-2 text-center text-sm font-bold shadow-md transition duration-200 ease-in hover:scale-125 hover:text-[rgb(var(--clr-txt))]"
      >
        <MdDeleteForever size={36} />
      </button>
      {!isSaved ? (
        <span className="invisible text-xs transition-all duration-150 ease-in-out peer-hover:visible">
          Eliminare imprevisto?
        </span>
      ) : (
        <span className="text-xs transition-all duration-150 ease-in-out">
          Imprevisto eliminato!
        </span>
      )}
    </section>
  );
};

export default EliminaImprevisto;
