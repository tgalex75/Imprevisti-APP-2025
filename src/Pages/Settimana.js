import { useState, useContext } from "react";
import Dado from "../Components/Dado";
import rnd from "random-weight";
import { v4 as uuidv4 } from "uuid";
import LayoutBase from "../Components/LayoutBase";
import DatiImprevistiContext from "../context/datiImprevisti";
import Spinner from "../Components/Spinner";

const Settimana = () => {
  const [casuale, setCasuale] = useState(null);
  const [count, setCount] = useState(0);

  const { settimana, dbReady } = useContext(DatiImprevistiContext);

  if (!dbReady || settimana === undefined ) {
    return <Spinner />; // Mostra lo spinner se dbReady non è true
  }

  // Se settimana è un array vuoto dopo il caricamento e vuoi mostrare un messaggio specifico
  if (dbReady && settimana?.length === 0) {
    return (
      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 transform text-center text-3xl">
        Nessun dato disponibile. Controlla l'Editor.
      </div>
    );
  }

  // Prima Estrazione

  const estraiNumeroCasuale = () => {
    if (!Settimana || settimana.length === 0) return
    const estrattoSettimana =
      Array.isArray(settimana) && rnd(settimana, (i) => i.weight);
    setCasuale(estrattoSettimana);
    setCount(uuidv4());
  };

  const titoloH1 = "Settimana";

  return (
    <>
      <LayoutBase
        key={count}
        titoloH1={titoloH1}
        id={casuale?.id}
        isImprev={casuale?.isImprev}
        casuale={casuale}
      >
        {casuale && (
          <>
            <h2
              className={
                casuale?.isImprev
                  ? "relative top-2 flex-1 text-6xl font-extrabold uppercase xl:text-5xl"
                  : "hidden"
              }
            >
              {casuale?.isImprev === 1 && "IMPREVISTO"}
            </h2>
            <h3
              style={{ filter: "drop-shadow(.05rem .05rem 0.1rem #000)" }}
              className="absolute left-1/2 top-1/3 flex-1 -translate-x-1/2 -translate-y-1/2 text-6xl font-extrabold uppercase xl:text-5xl"
            >
              {casuale?.titolo}
            </h3>
            <p className="orbitron-regular absolute left-1/2 top-2/3 mt-4 flex-1 -translate-x-1/2 -translate-y-1/2 text-4xl xl:text-3xl">
              {casuale?.descrizione}
            </p>
          </>
        )}
      </LayoutBase>
      {<Dado clickFunc={estraiNumeroCasuale} />}
    </>
  );
};

export default Settimana;
