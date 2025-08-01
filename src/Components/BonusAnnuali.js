import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { supabase } from "../supabaseClient";

const BonusAnnuali = () => {
  const [vociBonus, setVociBonus] = useState([]);

  const limiteRaggiunto = vociBonus.length > 2;

  useEffect(() => {
    fetchLista();
  }, []);

  const fetchLista = async () => {
    const { data } = await supabase.from("bonus-annuali").select("*");
    setVociBonus(data ? data : []);
  };

  const uploadListDB = async (list) => {
    const { error } = await supabase
      .from("bonus-annuali")
      .insert([{ id: list.id }])
      .select();
    error && console.log("error: ", error);
    fetchLista();
  };

  const deleteListDB = async () => {
    const { error } = await supabase
      .from("bonus-annuali")
      .delete("id")
      .lt("id", 4);
    error && console.log(error);
    fetchLista();
  };

  const addVociBonus = (element) => {
    setVociBonus([...vociBonus, { ...element }]);
    uploadListDB(element);
    fetchLista();
  };

  const azzeraVociBonus = () => {
    setVociBonus([]);
    deleteListDB();
    fetchLista();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.7, duration: 0.7 }}
      className="mb-4 flex h-40 w-3/4 flex-col items-center justify-between overflow-hidden rounded-lg p-2 uppercase text-[rgb(var(--clr-txt))] xl:absolute xl:right-1 xl:top-1 xl:mb-0 xl:mt-2 xl:h-1/4 xl:w-[20vw]"
    >
      <h6 className="font-bold uppercase bg-[rgb(var(--clr-prim))] w-[90%] rounded-t text-[rgb(var(--clr-txt))]">Bonus Annuali</h6>
      <section className="flex w-full items-center justify-around gap-4 xl:gap-1 xl:p-1">
        {vociBonus.map((item) => (
          <motion.div
            layout
            initial={{ opacity: 0, y: -1000 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 1000 }}
            transition={{ duration: 0.7, type: "spring" }}
            className="flex h-full w-1/3 items-center justify-center rounded p-2 xl:py-1"
            key={item.id}
          >
            <div className="flex h-12 xl:h-20 w-12 xl:w-20 items-center justify-center rounded-full bg-[rgb(var(--clr-ter))] p-2 text-center text-[rgb(var(--clr-bg))] xl:flex-col">
              <h3 className="mx-2 text-xl font-bold uppercase xl:text-2xl">
                {item.id}
              </h3>
            </div>
          </motion.div>
        ))}
      </section>
      <div className="flex h-1/3 w-full items-center justify-between gap-2 px-4 text-[.8rem] font-semibold">
        <button
          type="button"
          className="flex h-3/4 w-full items-center justify-center rounded border border-[rgb(var(--clr-btn))] px-3 text-center text-[rgb(var(--clr-txt))] shadow-md transition duration-200 ease-in hover:bg-[rgb(var(--clr-btn)/.7)]"
          style={limiteRaggiunto ? { pointerEvents: "none", opacity: 0.3 } : {}}
          onClick={() =>
            addVociBonus({
              id: vociBonus.length + 1,
            })
          }
        >
          Aggiungi Bonus
        </button>
        <button
          type="button"
          className="flex h-3/4 w-full items-center justify-center rounded border border-red-700 px-3 text-center text-[rgb(var(--clr-txt))] shadow-md transition duration-200 ease-in hover:bg-red-700"
          onClick={azzeraVociBonus}
        >
          Azzera
        </button>
      </div>
    </motion.div>
  );
};

export default BonusAnnuali;
