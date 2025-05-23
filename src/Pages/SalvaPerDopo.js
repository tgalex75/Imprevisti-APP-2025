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
        className="h-full w-full items-center gap-2 overflow-hidden rounded-lg bg-black/50 p-2 text-[--clr-txt] md:flex"
      >
        <div className="flex h-full w-full flex-col gap-2">
          <h3 className="text-center uppercase text-[--clr-ter]">
            Imprevisti Speciali in Attesa di Essere Risolti
          </h3>
          <strong className="absolute right-1 top-0 font-semibold">
            # {vociRegistro.length}
          </strong>
          <ul className="flex h-full w-full flex-col gap-1 overflow-y-auto px-2 pb-2">
            {vociRegistro.map((el) => (
              <li
                key={el.id}
                className="bg-[--clr-txt]/20 even:bg-[--clr-txt]/20 group relative flex items-center justify-between py-1 ps-2 text-left text-sm font-semibold uppercase"
              >
                <span className="w-1/6">{el.titolo}</span>
                <span className="w-5/6 pe-2">{el.descrizione}</span>
                <MdDeleteForever
                  size={20}
                  //className="cursor-pointer fill-red-700 transition-all hover:scale-125 hover:fill-red-600"
                  className="absolute right-0 top-1/2 me-0 h-full w-8 -translate-y-1/2 cursor-pointer transition-all group-hover:fill-red-600 hover:scale-125 xl:me-2"
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
