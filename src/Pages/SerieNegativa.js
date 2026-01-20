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
import Spinner from "../Components/Spinner";

const SerieNegativa = () => {
  const { serieNegativa, dbReady } = useContext(DatiImprevistiContext);

  const [casuale, setCasuale] = useState(null);
  const [count, setCount] = useState(0);
  const [extractedPlayer, setExtractedPlayer] = useState(null);

  // Prima Estrazione

  const estraiNumeroCasuale = useCallback(() => {
    if (!serieNegativa || serieNegativa.length === 0) return;
    const estratto =
      Array.isArray(serieNegativa) && rnd(serieNegativa, (i) => i.weight);
    setCasuale(estratto);
    setCount(uuidv4());
  }, []);

  const {
    titolo,
    descrizione,
    isImprev,
    ultEstrazione,
    baseEstrazione,
    numbExtrPlayer,
  } = casuale ? casuale : {};

  useEffect(() => {
    let timeout = setTimeout(() => {
      casuale &&
        setExtractedPlayer(pickRandom(numbers, { count: numbExtrPlayer }));
    }, 50);
    return () => clearTimeout(timeout);
  }, [numbExtrPlayer]);
  const numbers = (baseEstrazione === 11 ? extrTitolari : extrRosa)?.map(
    (player) => player.id,
  );

  if (!dbReady || serieNegativa === undefined) {
    return <Spinner />; // Mostra lo spinner se dbReady non è true
  }

  // Se settimana è un array vuoto dopo il caricamento e vuoi mostrare un messaggio specifico
  if (dbReady && serieNegativa?.length === 0) {
    return (
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 transform text-center text-3xl">
        Nessun dato disponibile. Controlla l'Editor.
      </div>
    );
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
        style={isImprev === 1 ? { color: "rgb(var(--clr-ter))" } : {}}
        className="flex h-full w-full select-none flex-col items-center justify-evenly gap-4 rounded-xl px-4 py-2 text-center shadow-lg ring ring-inset ring-[rgb(var(--clr-txt))] xl:gap-0 xl:px-10"
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
                  isImprev === 1
                    ? "text-3xl font-extrabold uppercase md:flex-1 md:text-6xl"
                    : "hidden"
                }
              >
                imprevisto!
              </h2>
              <h3 className="flex items-center justify-center text-3xl font-extrabold uppercase lg:flex-1 lg:text-4xl">
                {titolo}
              </h3>
              {isImprev === 1 && (
                <p
                  style={{
                    filter: "drop-shadow(.05rem .05rem 0.1rem #000)",
                  }}
                  className="text-md orbitron-regular px-2 lg:w-5/6 lg:flex-1 lg:text-2xl"
                >
                  {descrizione}
                </p>
              )}

              {ultEstrazione === 1 && (
                <SecondaEstrazioneDiretta
                  numbExtrPlayer={numbExtrPlayer}
                  extractedPlayer={extractedPlayer}
                />
              )}
              {ultEstrazione === 1 && <UploadRegistro titolo={titolo} />}
              <RegistroSerieNegativa
                dbReady={dbReady}
              />
            </div>
          </>
        )}
      </motion.div>

      {<Dado clickFunc={estraiNumeroCasuale} />}
    </section>
  );
};

export default SerieNegativa;
