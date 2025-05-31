import { useState, useEffect, useContext } from "react";
import Dado from "../Components/Dado";
import rnd from "random-weight";
import {v4 as uuidv4} from "uuid"
import LayoutBase from "../Components/LayoutBase";
import DatiImprevistiContext from "../context/datiImprevisti";
import Spinner from "../Components/Spinner";

const Settimana = () => {
  const [casuale, setCasuale] = useState(null);
  const [count, setCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true); // Nuovo stato isLoading

  const { settimana } = useContext(DatiImprevistiContext);

  useEffect(() => {
    // Controlla se settimana ha dati
    if (settimana && settimana.length > 0) {
      setIsLoading(false); // Imposta isLoading a false quando i dati sono disponibili
    } else if (settimana === null || settimana === undefined) {
      setIsLoading(true); // Mantieni isLoading a true se settimana è null o undefined
    } else if (settimana && settimana.length === 0 && isLoading) {
        // Se settimana è un array vuoto ma stavamo ancora caricando (es. primo render)
        // decidiamo se considerarlo "caricato" (array vuoto è uno stato valido)
        // o se aspettare ulteriormente (dipende dalla logica dell'app)
        // In questo caso, lo considero caricato.
        setIsLoading(false);
    }
  }, [settimana, isLoading]); // Aggiungi isLoading alle dipendenze di useEffect

  if (isLoading) {
    return <Spinner />; // Mostra lo spinner se isLoading è true
  }

  // Se settimana è un array vuoto dopo il caricamento e vuoi mostrare un messaggio specifico
  if (!isLoading && settimana.length === 0) {
    return (
      <div className=" absolute text-3xl left-1/2 top-1/2 -translate-x-1/2 transform text-center">
        Nessun dato disponibile. Controlla l'Editor.
      </div>
    );
  }

  // Prima Estrazione

  const estraiNumeroCasuale = () => {
    const estrattoSettimana = rnd(settimana, (i) => i.weight);
    setCasuale(estrattoSettimana);
    setCount(uuidv4());
  };

  const titoloH1 = "Imprevisto della Settimana";

  return (
    <div className="xl-p-0 flex h-full w-full flex-col items-center justify-center p-2 text-center xl:flex-row">
      {!casuale ? (
        <h2 className="flex h-full items-center justify-center text-5xl italic">
          Vai!
        </h2>
      ) : (
        <LayoutBase
          key={count}
          titoloH1={titoloH1}
          id={casuale?.id}
          isImprev={casuale?.isImprev}
          casuale={casuale}
        >
          <>
            <h2
              className={
                casuale?.isImprev
                  ? "relative top-2 flex-1 text-7xl font-extrabold uppercase xl:text-5xl"
                  : "hidden"
              }
            >
              {casuale?.isImprev && "IMPREVISTO"}
            </h2>
            <h3
              style={{ filter: "drop-shadow(.05rem .05rem 0.1rem #000)" }}
              className="absolute left-1/2 top-1/3 flex-1 -translate-x-1/2 -translate-y-1/2 text-7xl font-extrabold uppercase xl:text-6xl"
            >
              {casuale?.title}
            </h3>
            <p className="orbitron-regular absolute left-1/2 top-2/3 mt-4 flex-1 -translate-x-1/2 -translate-y-1/2 text-5xl xl:text-4xl">
              {casuale?.description}
            </p>
          </>
        </LayoutBase>
      )}
      {<Dado clickFunc={estraiNumeroCasuale} />}
    </div>
  );
};

export default Settimana;
