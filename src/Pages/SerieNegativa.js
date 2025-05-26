/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useContext, useCallback } from "react";
import Dado from "../Components/Dado";
import SecondaEstrazioneDiretta from "../Components/SecondaEstrazioneDiretta";
import RegistroSerieNegativa from "../Components/RegistroSerieNegativa";
import { motion } from "framer-motion";
import { extrTitolari, extrRosa } from "../Funzioni/schemi";
import UploadRegistro from "../Funzioni/UploadRegistro";
import { v4 as uuidv4 } from "uuid";
import rnd from "random-weight";
import pickRandom from "pick-random";
import DatiImprevistiContext from "../context/datiImprevisti";

const SerieNegativa = () => {
  const { serieNegativa } = useContext(DatiImprevistiContext);

  const [casuale, setCasuale] = useState(null);
  const [count, setCount] = useState(0);
  const [extractedPlayer, setExtractedPlayer] = useState(null);

  // Prima Estrazione

  const estraiNumeroCasuale = useCallback(() => {
    const estratto = rnd(serieNegativa, (i) => i.weight);
    setCasuale(estratto);
    setCount(uuidv4());
  }, []);

  const {
    title,
    description,
    isImprev,
    ultEstrazione,
    baseEstrazione,
    numbExtrPlayer,
  } = casuale ? casuale : {};

  console.log(serieNegativa)


  useEffect(() => {
    let timeout = setTimeout(() => {
      casuale &&
        setExtractedPlayer(pickRandom(numbers, { count: numbExtrPlayer }));
    }, 50);
    return () => clearTimeout(timeout);
  }, [numbExtrPlayer]);
  const numbers = (baseEstrazione === 11 ? extrTitolari : extrRosa).map(
    (player) => player.id,
  );

  // Controlla se saldoPunti esiste e se ha almeno un elemento
  if (!serieNegativa || serieNegativa.length === 0) {
    // Puoi mostrare un messaggio di caricamento, null, o un valore di fallback
    return (
      <div className="left-1/2 top-1/2 -translate-x-1/2 animate-pulse">
        Caricamento dati imprevisto...
      </div>
    ); // Oppure return null; se non vuoi mostrare nulla
  }

  return (
    <section className="flex h-full w-full select-none flex-col items-center justify-evenly gap-2 p-4 font-bold xl:p-8">
      <h1>Serie Negativa</h1>

      {/* BOX PRIMA ESTRAZIONE */}
      <motion.div
        initial={{ opacity: 0, x: "-10vw" }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.4, duration: 0.4, type: "spring" }}
        key={count}
        id="containerPrimaEstrazione"
        style={isImprev ? { color: "var(--clr-ter)" } : {}}
        className="flex h-full w-full select-none flex-col items-center justify-evenly gap-4 rounded-xl bg-black/50 px-4 py-2 text-center shadow-lg ring ring-inset ring-[--clr-txt] xl:gap-0 xl:px-10"
      >
        {!casuale ? (
          <h2 className="flex h-full items-center justify-center text-5xl italic">
            Vai!
          </h2>
        ) : (
          <>
            <div className="flex h-full w-full flex-col items-center justify-start pb-24 xl:w-3/4 xl:justify-around xl:self-end xl:py-2">
              <h2
                className={
                  isImprev
                    ? "text-3xl font-extrabold uppercase md:flex-1 md:text-7xl"
                    : "hidden"
                }
              >
                imprevisto!
              </h2>
              <h3 className="flex items-center justify-center text-3xl font-extrabold uppercase md:flex-1 md:text-5xl">
                {title}
              </h3>
              {isImprev && (
                <p
                  style={{
                    filter: "drop-shadow(.05rem .05rem 0.1rem #000)",
                  }}
                  className="text-md orbitron-regular px-2 md:w-5/6 md:flex-1 md:text-2xl"
                >
                  {description}
                </p>
              )}

              {ultEstrazione && (
                <SecondaEstrazioneDiretta
                  numbExtrPlayer={numbExtrPlayer}
                  extractedPlayer={extractedPlayer}
                />
              )}
              {ultEstrazione && <UploadRegistro title={title} />}
              <RegistroSerieNegativa />
            </div>
          </>
        )}
      </motion.div>

      {<Dado clickFunc={estraiNumeroCasuale} />}
    </section>
  );
};

export default SerieNegativa;
