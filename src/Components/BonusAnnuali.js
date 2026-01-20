import { motion } from "framer-motion";
import { db } from "../Db/db";
import { useContext } from "react";
import DatiImprevistiContext from "../context/datiImprevisti";
import Spinner from "../Components/Spinner";

const BonusAnnuali = () => {
  const { bonusAnnuali: listaBonus, dbReady } = useContext(DatiImprevistiContext);

  const limiteRaggiunto = listaBonus.length > 2;

  const uploadListDB = async (list) => {
    try {
      const id = await db.bonusAnnuali.add({
        id: list.id,
      });
      console.log(id, list);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteListDB = async () => {
    const id = await db.bonusAnnuali.clear();
    if (id) {
    }
  };

  const addVociBonus = (element) => {
    uploadListDB(element);
  };

  const azzeraVociBonus = () => {
    deleteListDB();
  };

  if (!dbReady || listaBonus === undefined) {
    return <Spinner />; // Mostra lo spinner se dbReady non è true
  }

  // Se listaBonus è un array vuoto dopo il caricamento e vuoi mostrare un messaggio specifico
  if (dbReady) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.7, duration: 0.7 }}
        className="mb-4 flex h-40 w-full flex-col items-center justify-between overflow-hidden rounded-lg p-2 uppercase text-[rgb(var(--clr-txt))] xl:absolute xl:right-1 xl:top-1 xl:mb-0 xl:mt-2 xl:h-1/5 xl:w-[15vw]"
      >
        <h6 className="w-5/6 rounded-t bg-[rgb(var(--clr-prim))] font-bold uppercase text-[rgb(var(--clr-txt))]">
          Bonus Annuali
        </h6>
        <section className="flex w-full items-center justify-around gap-4 xl:gap-1 xl:p-1">
          {listaBonus?.map((item) => (
            <motion.div
              layout
              initial={{ opacity: 0, y: -1000 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 1000 }}
              transition={{ duration: 0.7, type: "spring" }}
              className="flex h-full w-1/3 items-center justify-center rounded p-2 xl:py-1"
              key={item.id}
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[rgb(var(--clr-ter))] p-2 text-center text-[rgb(var(--clr-bg))] xl:h-6 xl:w-6 xl:flex-col">
                <h3 className="mx-2 text-xl font-bold uppercase xl:text-lg">
                  {item.id}
                </h3>
              </div>
            </motion.div>
          ))}
        </section>
        <div className="flex h-1/3 w-full items-center justify-between gap-2 px-4 text-[.7rem] font-semibold">
          <button
            type="button"
            className="flex h-3/4 w-full items-center justify-center rounded border border-[rgb(var(--clr-btn))] px-3 text-center text-[rgb(var(--clr-txt))] shadow-md transition duration-200 ease-in hover:bg-[rgb(var(--clr-btn)/.7)]"
            style={
              limiteRaggiunto ? { pointerEvents: "none", opacity: 0.3 } : {}
            }
            onClick={() =>
              addVociBonus({
                id: listaBonus?.length + 1,
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
  }
};

export default BonusAnnuali;
