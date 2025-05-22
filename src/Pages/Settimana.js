import { useState, useContext } from "react";
import Dado from "../Components/Dado";
import rnd from "random-weight";
import LayoutBase from "../Components/LayoutBase";
import DatiImprevistiContext from "../context/datiImprevisti";

const Settimana = () => {
  const [casuale, setCasuale] = useState(null);
  const [count, setCount] = useState(0);

  const { settimana } = useContext(DatiImprevistiContext);

  // Controlla se settimana esiste e se ha almeno un elemento
  if (!settimana || settimana.length === 0) {
    // Puoi mostrare un messaggio di caricamento, null, o un valore di fallback
    return (
      <div className="left-1/2 top-1/2 -translate-x-1/2 animate-pulse">
        Caricamento saldo punti...
      </div>
    );
    // Oppure return null; se non vuoi mostrare nulla
  }

  // Prima Estrazione

  const estraiNumeroCasuale = () => {
    const estrattoSettimana = rnd(settimana, (i) => i.weight);
    setCasuale(estrattoSettimana);
    setCount(count + 1);
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
              className="absolute left-1/2 top-1/3 flex-1 -translate-x-1/2 -translate-y-1/2 text-6xl font-extrabold uppercase xl:text-4xl"
            >
              {casuale?.title}
            </h3>
            <p className="orbitron-regular absolute left-1/2 top-2/3 mt-4 flex-1 -translate-x-1/2 -translate-y-1/2 text-3xl xl:text-xl">
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
