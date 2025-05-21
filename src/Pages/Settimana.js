import { useState } from "react";
import Dado from "../Components/Dado";
import rnd from "random-weight";
import datiSettimana from "../Data/datiSettimana";
import LayoutBase from "../Components/LayoutBase";

const Settimana = () => {
  const [casuale, setCasuale] = useState(null);

  // Prima Estrazione

  const estraiNumeroCasuale = () => {
    const estrattoSettimana1 = rnd(datiSettimana, (i) => i.weight);
    const estrattoSettimana2 = rnd(datiSettimana, (i) => i.weight);
    setCasuale([estrattoSettimana1, estrattoSettimana2]);
  };

  const titoloH1 = "Peggiore della Settimana n. ";

  return (
    <div className="xl-p-0 flex h-full w-full flex-col items-center justify-center p-2 text-center xl:flex-row">
      {!casuale && (
       <h2 className="flex h-full items-center justify-center text-5xl italic">
            Vai!
          </h2>
      )}
      {casuale?.map((array, i) => (
        <LayoutBase
          key={i}
          titoloH1={titoloH1 + parseInt(i + 1)}
          id={array.id}
          isImprev={array.isImprev}
          casuale={array}
        >
          <>
            <h2
              className={
                array.isImprev
                  ? "relative top-2 flex-1 text-7xl font-extrabold uppercase xl:text-5xl"
                  : "hidden"
              }
            >
              {array.isImprev && "IMPREVISTO"}
            </h2>
            <h3
              style={{ filter: "drop-shadow(.05rem .05rem 0.1rem #000)" }}
              className="absolute left-1/2 top-1/3 flex-1 -translate-x-1/2 -translate-y-1/2 text-6xl font-extrabold uppercase xl:text-4xl"
            >
              {array.title}
            </h3>
            <p className="orbitron-regular absolute left-1/2 top-2/3 mt-4 flex-1 -translate-x-1/2 -translate-y-1/2 text-3xl xl:text-xl">
              {array.description}
            </p>
          </>
        </LayoutBase>
      ))}

      {<Dado clickFunc={estraiNumeroCasuale} />}
    </div>
  );
};

export default Settimana;
