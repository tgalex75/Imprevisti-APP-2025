/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import SecondaEstrazioneDiretta from "../Components/SecondaEstrazioneDiretta";
import RimandaImprevisto from "./RimandaImprevisto";
import EliminaImprevisto from "./EliminaImprevisto";
import capitalize from "lodash.capitalize";
import pickRandom from "pick-random";
import { numbers } from "./schemi";

const FetchImprevisto = (props) => {
  const { casualeCommunity, titolariRosa } = props;

  const [extractedPlayerCM, setExtractedPlayerCM] = useState([]);

  const { id, titolo, descrizione, ultEstrazione, qtGiocatori } =
    casualeCommunity;

  const numbersCM = numbers(titolariRosa);

  useEffect(() => {
    setExtractedPlayerCM(pickRandom(numbersCM, { count: qtGiocatori }));
    let timeout = setTimeout(() => {
      //id !== 0 && delImprevisto("speciali", id);
      timeout = null;
    }, 3000);
    // Cleanup del timeout per evitare memory leak
    return () => clearTimeout(timeout);
  }, []);

  return (
    <section
      id="fetchImprevisto"
      className="flex h-full w-full flex-col items-center justify-between gap-2 xl:w-4/5"
    >
      <h3 className="mt-6 text-xl lg:text-2xl font-extrabold uppercase xl:mt-0 xl:text-4xl">
        {titolo && titolo}
      </h3>
      <p
        className={`orbitron-regular flex min-h-20 w-full p-2 items-center justify-center overflow-y-auto scrollbar xl:w-2/3 xl:px-4 ${
          descrizione && descrizione.length > 200
            ? "text-base xl:text-lg"
            : "text-lg xl:text-xl"
        }`}
      >
        {capitalize(descrizione)}
      </p>
      {ultEstrazione === 1 && (
        <SecondaEstrazioneDiretta
          numbExtrPlayer={qtGiocatori}
          extractedPlayer={extractedPlayerCM}
        />
      )}
      <div className="mb-2 flex h-1/4 w-5/6 items-center justify-around xl:h-20">
        <RimandaImprevisto id={id} titolo={titolo} descrizione={descrizione} />
        <EliminaImprevisto id={id} />
      </div>
    </section>
  );
};

export default FetchImprevisto;
