import { motion } from "framer-motion";
import { MdDeleteForever } from "react-icons/md";
import DatiImprevistiContext from "../context/datiImprevisti";
import { delImprevisto } from "../Funzioni/delImprevisto";
import { useContext } from "react";

const SalvaPerDopo = () => {
  const { salvaxdopo: vociRegistro } = useContext(DatiImprevistiContext);

  return (
    <section className="flex h-full w-full flex-col items-center justify-center gap-12 p-4 font-bold">
      <h1>Imprevisti Sospesi</h1>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.7 }}
        className="h-full w-full items-center gap-2 overflow-hidden rounded-lg p-2 text-[rgb(var(--clr-txt))] md:flex"
      >
        <div className="flex h-full w-full flex-col justify-center gap-2">
          <h3 className="w-5/6 self-center rounded-t bg-[rgb(var(--clr-prim))] text-center uppercase text-[rgb(var(--clr-txt))]">
            Imprevisti Speciali in Attesa di Essere Risolti
          </h3>
          <strong className="absolute right-1 top-1 font-semibold">
            # {vociRegistro?.length}
          </strong>
          <ul className="flex h-full w-full flex-col gap-1 overflow-y-auto px-2 pb-2">
            <header className="flex flex-col items-center justify-between p-2 text-xs xl:flex-row">
              <span className="w-full xl:w-1/3">TITOLO</span>
              <span className="w-full pe-2 xl:w-2/3">DESCRIZIONE</span>
            </header>
            {vociRegistro?.map((el) => (
              <li
                key={el.id}
                className="group relative flex flex-col items-start justify-start py-2 pe-8 text-left text-sm font-semibold uppercase hover:bg-[rgb(var(--clr-btn)/.7)] xl:flex-row xl:items-center xl:justify-between xl:gap-4 xl:pe-20"
              >
                <span className="w-full xl:w-1/3">{el.titolo}</span>
                <span className="w-full pe-2 xl:w-2/3">{el.descrizione}</span>
                <MdDeleteForever
                  size={20}
                  className="absolute right-0 top-6 me-0 h-full w-8 -translate-y-1/2 cursor-pointer transition-all group-hover:fill-red-600 hover:scale-125 xl:top-1/2 xl:me-2"
                  onClick={() => delImprevisto("salvaxdopo", el.id)}
                />
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </section>
  );
};

export default SalvaPerDopo;
