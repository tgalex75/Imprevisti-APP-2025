import { supabase } from "../supabaseClient";
import { motion } from "framer-motion";
import { MdDeleteForever } from "react-icons/md";
import useFetchData from "../Hooks/useFetchData";

const SalvaPerDopo = () => {
  const { data: vociRegistro, fetchRegistryList } = useFetchData("salvaxdopo");

  const removeVociRegistro = async (element) => {
    const { error } = await supabase
      .from("salvaxdopo")
      .delete()
      .eq("id", element);
    error && console.log(error);
    fetchRegistryList();
  };

  return (
    <section className="flex h-full w-full flex-col items-center justify-center gap-12 p-4 font-bold">
      <h1>Imprevisti Sospesi</h1>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.7 }}
        className="h-full w-full items-center gap-2 overflow-hidden rounded-lg p-2 text-[rgb(var(--clr-txt))] md:flex"
      >
        <div className="flex h-full w-full flex-col gap-2 justify-center">
          <h3 className="self-center rounded-t text-center uppercase text-[rgb(var(--clr-txt))] bg-[rgb(var(--clr-prim))] w-5/6">
            Imprevisti Speciali in Attesa di Essere Risolti
          </h3>
          <strong className="absolute right-1 top-1 font-semibold">
            # {vociRegistro.length}
          </strong>
          <ul className="flex h-full w-full flex-col gap-1 overflow-y-auto px-2 pb-2">
            {vociRegistro.map((el) => (
              <li
                key={el.id}
                className="group relative flex flex-col xl:flex-row items-start xl:items-center justify-start xl:justify-around py-2 pe-8 xl:pe-20 text-left text-sm font-semibold uppercase hover:bg-[rgb(var(--clr-btn)/.7)]"
              >
                <span className="w-full bg-[rgb(var(--clr-sec))] xl:bg-none xl:w-1/6">{el.titolo}</span>
                <span className="w-full xl:w-5/6 pe-2">{el.descrizione}</span>
                <MdDeleteForever
                  size={20}
                  className="absolute right-0 top-6 xl:top-1/2 me-0 h-full w-8 -translate-y-1/2 cursor-pointer transition-all group-hover:fill-red-600 hover:scale-125 xl:me-2"
                  onClick={() => removeVociRegistro(el.id)}
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
