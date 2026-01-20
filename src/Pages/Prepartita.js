/* eslint-disable react-hooks/exhaustive-deps */
import { useCallback, useState, useEffect, useContext } from "react";
import UploadRegistro from "../Funzioni/UploadRegistro";
import FetchImprevisto from "../Funzioni/FetchImprevisto";
import LayoutBase from "../Components/LayoutBase";
import Dado from "../Components/Dado";
import SecondaEstrazioneDiretta from "../Components/SecondaEstrazioneDiretta";
import BonusAnnuali from "../Components/BonusAnnuali";
import RegistroSerieNegativa from "../Components/RegistroSerieNegativa";
import rnd from "random-weight";
import random from "random";
import { numbers } from "../Funzioni/schemi";
import { v4 as uuidv4 } from "uuid";
import pickRandom from "pick-random";
import DatiImprevistiContext from "../context/datiImprevisti";
import Spinner from "../Components/Spinner";

const Prepartita = () => {
  const { prepartita, speciali, dbReady } = useContext(DatiImprevistiContext);
  const [casuale, setCasuale] = useState(null);
  const [count, setCount] = useState(0);
  const [casualeCommunity, setCasualeCommunity] = useState(null);

  const [extractedPlayer, setExtractedPlayer] = useState(null);

  useEffect(() => {
    setCasualeCommunity(
      speciali?.length > 0
        ? random.choice(speciali)
        : { id: 0, descrizione: "LISTA VUOTA!!!" },
    );
    let timeout = setTimeout(() => {
      setExtractedPlayer(pickRandom(numbersEx, { count: numbExtrPlayer }));
    }, 200);
    return () => clearTimeout(timeout);
  }, [casuale]);

  // Prima Estrazione

  const estraiNumeroCasuale = useCallback(() => {
    if (!prepartita || prepartita.length === 0) return;
    const estratto =
      Array.isArray(prepartita) && rnd(prepartita, (i) => i.weight);
    setCasuale(estratto);
    setCount(uuidv4());
  }, []);

  const {
    id,
    titolo,
    descrizione,
    isImprev,
    isSpecial,
    ultEstrazione,
    baseEstrazione,
    numbExtrPlayer,
    notaBene,
  } = casuale ? casuale : {};

  const titoloH1 = "Prepartita";
  const numbersEx = numbers(baseEstrazione);

  if (!dbReady || prepartita === undefined) {
    return <Spinner />; // Mostra lo spinner se dbReady non è true
  }

  // Se settimana è un array vuoto dopo il caricamento e vuoi mostrare un messaggio specifico
  if (dbReady && prepartita?.length === 0) {
    return (
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 transform text-center text-3xl">
        Nessun dato disponibile. Controlla l'Editor.
      </div>
    );
  }

  return (
    <>
      <LayoutBase
        key={count}
        titoloH1={titoloH1}
        id={id}
        isImprev={isImprev}
        casuale={casuale}
      >
        {casuale && (
          <>
            <h2
              className={
                isImprev === 1
                  ? "text-xl font-extrabold uppercase md:relative md:top-2 xl:text-5xl"
                  : "invisible"
              }
            >
              {isSpecial === 1 ? "IMPREVISTO SPECIALE!" : "IMPREVISTO!"}
            </h2>
            {isSpecial === 0 && (
              <>
                <h3
                  className={`text-lg lg:text-2xl font-extrabold uppercase xl:text-3xl ${
                    isSpecial === 1 && "invisible"
                  } `}
                >
                  {titolo}
                </h3>
                <p className="orbitron-regular w-full px-4 py-2 text-lg lg:text-2xl xl:mt-4 xl:w-1/2 xl:text-3xl">
                  {descrizione && descrizione}
                </p>

                {/* Eccezioni */}
                <p className="orbitron-regular animate-bounce text-sm font-normal md:text-lg">
                  {notaBene && notaBene}
                </p>
              </>
            )}

            {isSpecial === 1 && (
              <FetchImprevisto
                extractedPlayer={extractedPlayer}
                setExtractedPlayer={setExtractedPlayer}
                casualeCommunity={casualeCommunity}
              />
            )}

            {ultEstrazione === 1 && isSpecial === 0 && (
              <SecondaEstrazioneDiretta
                numbExtrPlayer={numbExtrPlayer}
                extractedPlayer={extractedPlayer}
              />
            )}
            {titolo === "Notte brava" && (
              <>
                <UploadRegistro titolo={titolo} />
                <RegistroSerieNegativa />
              </>
            )}
            {isImprev === 1 && <BonusAnnuali />}
          </>
        )}
      </LayoutBase>
      {<Dado clickFunc={estraiNumeroCasuale} />}
    </>
  );
};

export default Prepartita;
