import React, { useState, useRef, useContext } from "react";
import JerseySVGBg from "./JerseySVGBg";
import ColorContext from "../context/colorContext";
import IndicatoreGiocatoriImpr from "./IndicatoreGiocatoriImpr";
import random from "random";

const SecondaEstrazione = () => {
  const [refState, setRefState] = useState(11);
  const { colorPl, colorGK, colorNumPl, colorNumGK } = useContext(ColorContext);

  const ref = useRef(null);

  const handleRefState = () => {
    setRefState(parseInt(ref.current.value));
  };

  const [secondExtractedNumber, setSecondExtractedNumber] = useState(null);

  const randomNumber = () => {
    setSecondExtractedNumber(random.int(1, refState));
  };
  const extractedPlayer = [secondExtractedNumber];


  return (
    <section className="flex h-auto w-full flex-col items-center justify-around gap-2 rounded-md border-2 border-gray-300/20 p-4 xl:w-3/4 xl:flex-row xl:p-4 xl:px-12">
      <div className="flex h-fit w-3/4 flex-col items-center justify-around gap-2 rounded-lg px-2 xl:w-auto">
        <div className="flex h-12 w-full flex-col items-center justify-around xl:h-auto">
          <input
            onChange={handleRefState}
            ref={ref}
            type="number"
            id="input-estrazione-giocatore"
            className="w-full flex-1 appearance-none rounded-lg border-gray-300 bg-white p-2 text-center text-sm text-gray-800 placeholder-gray-400 shadow-sm focus:border-transparent focus:outline-none focus:ring-4 focus:ring-sky-700"
            name="randomPlayerNum"
            placeholder="Su quanti giocatori?"
          />
        </div>
        <button
          type="button"
          onClick={() => randomNumber()}
          className="flex h-12 w-full items-center justify-center rounded-lg bg-[--clr-btn] p-2 px-4 text-center text-sm font-semibold text-gray-100 shadow-md transition duration-200 ease-in hover:bg-[--clr-ter] focus:outline-none focus:ring-2 focus:ring-[--clr-ter] focus:ring-offset-2 focus:ring-offset-sky-800 xl:h-auto"
        >
          Estrai
        </button>
        <small>
          {" "}
          N.B. Se non viene inserito alcun numero verrà effettuata la estrazione
          su 11 giocatori
        </small>
      </div>
      <div
          className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded transition-all h-1/3 xl:h-3/5"
      >
        <JerseySVGBg
          fillColor={secondExtractedNumber === 1 ? colorGK : colorPl}
          className="stroke-2"
        />
        <span className="absolute left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 pb-14 font-['Anton'] text-7xl xl:text-9xl xl:pb-24 text-slate-300" style={secondExtractedNumber === 1 ? {color: colorNumGK} : {color: colorNumPl}}>
          {secondExtractedNumber}
        </span>
      </div>
      <IndicatoreGiocatoriImpr extractedPlayer={extractedPlayer} />
    </section>
  );
};

export default SecondaEstrazione;
