/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext, useCallback } from "react";
import Dado from "../Components/Dado";
import { motion } from "framer-motion";
import rnd from "random-weight";
import { v4 as uuidv4 } from "uuid";
import BonusAnnuali from "../Components/BonusAnnuali";
import DatiImprevistiContext from "../context/datiImprevisti";
import Spinner from "../Components/Spinner";

const IngaggiMercato = (props) => {
  const { ingaggiMercato } = useContext(DatiImprevistiContext);
  const [casuale, setCasuale] = useState(null);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true); // Nuovo stato isLoading

  const { tipoImprevisto } = props;

  const listaImprevisto = ingaggiMercato.filter(
    (item) => item.tipo.toLowerCase() === tipoImprevisto.toLowerCase(),
  );

  const estraiNumeroCasuale = useCallback(() => {
    const estratto = rnd(listaImprevisto, (i) => i.weight);
    setCasuale(estratto);
    setCount(uuidv4());
  }, []);

  const { titolo, descrizione, isImprev } = casuale ? casuale : {};

  useEffect(() => {
    // Controlla se ingaggiMercato ha dati
    if (ingaggiMercato && ingaggiMercato.length > 0) {
      setIsLoading(false); // Imposta isLoading a false quando i dati sono disponibili
    } else if (ingaggiMercato === null || ingaggiMercato === undefined) {
      setIsLoading(true); // Mantieni isLoading a true se ingaggiMercato è null o undefined
    } else if (ingaggiMercato && ingaggiMercato.length === 0 && isLoading) {
      // Se ingaggiMercato è un array vuoto ma stavamo ancora caricando (es. primo render)
      // decidiamo se considerarlo "caricato" (array vuoto è uno stato valido)
      // o se aspettare ulteriormente (dipende dalla logica dell'app)
      // In questo caso, lo considero caricato.
      setIsLoading(false);
    }
  }, [ingaggiMercato, isLoading]); // Aggiungi isLoading alle dipendenze di useEffect

  if (isLoading) {
    return <Spinner />; // Mostra lo spinner se isLoading è true
  }

  // Se ingaggiMercato è un array vuoto dopo il caricamento e vuoi mostrare un messaggio specifico
  if (!isLoading && ingaggiMercato.length === 0) {
    return (
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 transform text-center text-3xl">
        Nessun dato disponibile. Controlla l'Editor.
      </div>
    );
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
        style={isImprev ? { color: "rgb(var(--clr-ter))" } : {}}
        className="flex h-full w-full select-none flex-col items-center justify-around rounded-xl pt-2 text-center shadow-lg ring ring-inset ring-[rgb(var(--clr-txt))] xl:px-10 xl:pb-8"
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
