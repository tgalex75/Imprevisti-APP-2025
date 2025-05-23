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
import {v4 as uuidv4} from "uuid"
import pickRandom from "pick-random";
import DatiImprevistiContext from "../context/datiImprevisti";

const Prepartita = () => {
  const { prepartita, speciali, fetchSpeciali } = useContext(
    DatiImprevistiContext,
  );
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
    fetchSpeciali();
    let timeout = setTimeout(() => {
      setExtractedPlayer(pickRandom(numbersEx, { count: numbExtrPlayer }));
    }, 200);
    return () => clearTimeout(timeout);
  }, [casuale]);
  
  // Prima Estrazione
  
  const estraiNumeroCasuale = useCallback(() => {
    const estratto = rnd(prepartita, (i) => i.weight);
    setCasuale(estratto);
    setCount(uuidv4());
  }, []);
  
  // Controlla se saldoPunti esiste e se ha almeno un elemento
if (!prepartita || prepartita.length === 0) {
  // Puoi mostrare un messaggio di caricamento, null, o un valore di fallback
  return (
    <div className="left-1/2 top-1/2 -translate-x-1/2 animate-pulse">
      Caricamento dati imprevisto...
    </div>
  ); // Oppure return null; se non vuoi mostrare nulla
}

  const {
    id,
    title,
    description,
    isImprev,
    isSpecial,
    ultEstrazione,
    baseEstrazione,
    numbExtrPlayer,
    notaBene,
  } = casuale ? casuale : {};

  const titoloH1 = "Prepartita";
  const numbersEx = numbers(baseEstrazione);

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
                isImprev
                  ? "text-7xl font-extrabold uppercase md:relative md:top-2 md:flex-1 xl:text-5xl"
                  : "invisible"
              }
            >
              {isSpecial ? "IMPREVISTO SPECIALE!" : "IMPREVISTO!"}
            </h2>
            {!isSpecial && (
              <>
                <h3
                  className={`flex-1 text-6xl font-extrabold uppercase xl:text-4xl ${
                    isSpecial && "invisible"
                  } `}
                >
                  {title}
                </h3>
                <p className="orbitron-regular w-4/5 px-4 text-3xl md:flex-1 xl:mt-4 xl:w-1/2 xl:text-2xl">
                  {description && description}
                </p>

                {/* Eccezioni */}
                <p className="orbitron-regular animate-bounce text-sm font-normal md:text-lg">
                  {notaBene && notaBene}
                </p>
              </>
            )}

            {isSpecial && (
              <FetchImprevisto
                extractedPlayer={extractedPlayer}
                setExtractedPlayer={setExtractedPlayer}
                casualeCommunity={casualeCommunity}
              />
            )}

            {ultEstrazione && !isSpecial && (
              <SecondaEstrazioneDiretta
                numbExtrPlayer={numbExtrPlayer}
                extractedPlayer={extractedPlayer}
              />
            )}
            {title === "Notte brava" && (
              <>
                <UploadRegistro title={title} />
                <RegistroSerieNegativa />
              </>
            )}
            {isImprev && <BonusAnnuali />}
          </>
        )}
      </LayoutBase>
      {<Dado clickFunc={estraiNumeroCasuale} />}
    </>
  );
};

export default Prepartita;
