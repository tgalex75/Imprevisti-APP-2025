import { useContext } from "react";
import { supabase } from "../supabaseClient";
import { motion } from "framer-motion";
import { HiTrash } from "react-icons/hi2";
import DatiImprevistiContext from "../context/datiImprevisti";

const RiepilogoImprevisti = () => {
  const { prepartita, speciali } = useContext(DatiImprevistiContext);

  const removeVociRegistro = async (element) => {
    const { error } = await supabase
      .from("speciali")
      .delete()
      .eq("id", element);
    error && console.log(error);
  };

  const datiPrepartitaGlobali = [...prepartita];

  return (
    <section className="flex h-full w-full flex-col items-center justify-center gap-4 p-4 font-bold">
      <h1>Riepilogo Imprevisti</h1>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.7 }}
        className="flex h-full w-full flex-col items-center gap-2 overflow-y-auto rounded-lg bg-black/50 p-2 text-[--clr-txt]"
      >
        <h3 className="text-center uppercase text-[--clr-ter]">
          Imprevisti Prepartita
        </h3>
        <ul className="flex h-fit w-full flex-col gap-1 px-2 pb-2">
          {datiPrepartitaGlobali.map(
            (el) =>
              el.title.toUpperCase() !== "NESSUN IMPREVISTO" && (
                <li
                  key={el.id}
                  className="flex items-center justify-start gap-2 bg-[--clr-txt]/20 py-1 ps-2 text-left text-sm"
                >
                  <strong className="uppercase">{el.title}</strong>
                  <em className="font-medium">{el.description}</em>
                </li>
              ),
          )}
        </ul>
        <h3 className="text-center uppercase text-[--clr-ter]">
          Imprevisti Settimana
        </h3>
        <ul className="flex h-fit w-full flex-col gap-1 px-2 pb-2">
          {prepartita?.map(
            (el) =>
              el.title.toUpperCase() !== "NESSUN IMPREVISTO" && (
                <li
                  key={el.id}
                  className="flex items-center justify-start gap-2 bg-[--clr-txt]/20 py-1 ps-2 text-left text-sm"
                >
                  <strong className="uppercase">{el.title}</strong>
                  <em className="font-medium">{el.description}</em>
                </li>
              ),
          )}
        </ul>
        <h3 className="text-center uppercase text-[--clr-ter]">
          Imprevisti Speciali
        </h3>
        <strong className="absolute right-1 top-0 font-semibold">
          # {speciali?.length}
        </strong>
        <ul className="flex h-fit w-full flex-col gap-1 px-2 pb-2">
          {speciali?.map((el) => (
            <li
              key={el.id}
              className="flex h-auto w-full items-center justify-evenly bg-[--clr-txt]/20 py-1 ps-2 text-left text-sm font-normal uppercase"
            >
              <div className="w-full">
                <strong className="uppercase pe-2">{el.titolo}</strong>
                <em className="font-medium">{el.descrizione}</em>
              </div>
              <HiTrash
                size={20}
                className="cursor-pointer transition-all hover:scale-125 hover:fill-red-600"
                onClick={() => removeVociRegistro(el.id)}
              />
            </li>
          ))}
        </ul>
      </motion.div>
    </section>
  );
};

export default RiepilogoImprevisti;
