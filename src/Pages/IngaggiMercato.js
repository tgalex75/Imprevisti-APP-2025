/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useContext, useCallback } from "react";
import Dado from "../Components/Dado";
import { motion } from "framer-motion";
import rnd from "random-weight";
import { v4 as uuidv4 } from "uuid";
import BonusAnnuali from "../Components/BonusAnnuali";
import DatiImprevistiContext from "../context/datiImprevisti";

const IngaggiMercato = (props) => {
  const { ingaggiMercato } = useContext(DatiImprevistiContext);
  const [casuale, setCasuale] = useState(null);
  const [count, setCount] = useState(0);

  const {tipoImprevisto} = props

  const listaImprevisto = ingaggiMercato.filter((item)=> item.tipo.toLowerCase() === tipoImprevisto.toLowerCase())


  const estraiNumeroCasuale = useCallback(() => {
    const estratto = rnd(listaImprevisto, (i) => i.weight);
    setCasuale(estratto);
    setCount(uuidv4());
  }, []);


  const {
    titolo,
    descrizione,
    isImprev,
  } = casuale ? casuale : {};


  // Controlla se saldoPunti esiste e se ha almeno un elemento
  if (!ingaggiMercato || ingaggiMercato.length === 0) {
    // Puoi mostrare un messaggio di caricamento, null, o un valore di fallback
    return (
      <div className="left-1/2 top-1/2 -translate-x-1/2 animate-pulse">
        Caricamento dati imprevisto...
      </div>
    ); // Oppure return null; se non vuoi mostrare nulla
  }

  return (
    <section className="flex h-full w-full select-none flex-col items-center justify-around gap-2 px-4 py-6 font-bold md:p-8">
      <h1>{`Imprevisti ${tipoImprevisto}`}</h1>
      {/* BOX PRIMA ESTRAZIONE */}
      <motion.div
        key={count}
        initial={{ opacity: 0, x: "-10vw" }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.4, type: "spring" }}
        id="containerPrimaEstrazione"
        style={isImprev ? { color: "var(--clr-ter)" } : {}}
        className="flex h-full w-full select-none flex-col items-center justify-around rounded-xl bg-black/50 pt-2 text-center shadow-lg ring ring-inset ring-[--clr-txt] xl:px-10 xl:pb-8"
      >
        {!casuale && (
          <h2 className="flex h-full items-center justify-center text-5xl italic">
            Vai!
          </h2>
        )}
        {casuale && (
          <>
            <h2
              className={
                isImprev
                  ? "text-7xl font-extrabold uppercase xl:text-5xl"
                  : "hidden"
              }
            >
              imprevisto!
            </h2>
            <h3 className="text-7xl font-extrabold uppercase xl:text-6xl">
              {titolo}
            </h3>
            <p
              style={{
                filter: "drop-shadow(.05rem .05rem 0.1rem #000)",
              }}
              className="orbitron-regular mt-4 w-4/5 px-4 text-5xl xl:w-3/5 xl:text-4xl"
            >
              {descrizione}
            </p>
          </>
        )}
        {isImprev && <BonusAnnuali />}
      </motion.div>

      {<Dado clickFunc={estraiNumeroCasuale} />}
    </section>
  );
};

export default IngaggiMercato;
