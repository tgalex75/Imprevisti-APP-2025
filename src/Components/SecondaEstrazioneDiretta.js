/* eslint-disable react-hooks/exhaustive-deps */
import { useContext } from "react";
import IndicatoreGiocatoriImpr from "./IndicatoreGiocatoriImpr";
import JerseySVGBg from "./JerseySVGBg";
import ColorContext from "../context/colorContext";

const SecondaEstrazioneDiretta = (props) => {
  const { numbExtrPlayer, extractedPlayer } = props;
  const { colorPl, colorGK, colorNumPl, colorNumGK } = useContext(ColorContext);

  return (
    <section
      id="secEstrDiretta"
      className="mb-12 flex w-full flex-col items-center justify-around rounded-md border-2 bg-[rgb(var(--clr-txt)/.2)] px-1 min-h-[50%] xl:px-6"
    >
      <h4 className="my-1 text-xs font-bold uppercase text-[--clr-txt] xl:my-0 xl:mb-1 xl:text-lg xl:self-start">
        {numbExtrPlayer === 1 ? "Giocatore estratto" : "Giocatori estratti"}
      </h4>
      <main
        id="mainSecEstrDiretta"
        className="flex h-full w-full items-center justify-around xl:gap-2 flex-col xl:flex-row pt-8 xl:pt-0"
      >
        <div
          id="extractedPlayers"
          className="flex h-fit xl:h-full w-fit flex-wrap items-center rounded-lg xl:gap-4"
        >
          {extractedPlayer?.map((player, i) => {
            return (
              <div
                key={i}
                className={`relative flex flex-col items-center overflow-hidden rounded p-6 transition-all ${numbExtrPlayer > 2 ? "min-w-60 h-fit xl:h-1/2" : numbExtrPlayer === 1 ? "min-w-60 xl:w-96 h-full xl:h-3/5" : "min-w-52 xl:w-80 h-full xl:h-3/5"}`}>
                <JerseySVGBg
                  fillColor={player === 1 ? colorGK : colorPl}
                  strokeColor="white"
                  className="stroke-2"
                />
                <span
                  className={`absolute left-1/2 top-1/3 z-50 -translate-x-1/2 -translate-y-1/3 font-['Anton'] ${numbExtrPlayer > 2 ? "text-[4rem] xl:text-[4rem]" : numbExtrPlayer === 1 ? "text-[5rem] xl:text-[7rem]" : "text-[4rem] xl:text-[5rem]"}`}
                  style={player === 1 ? {color: colorNumGK} : {color: colorNumPl}}
                >
                  {player}
                </span>
              </div>
            );
          })}
        </div>
        <div className="h-5/6 w-full xl:w-fit">
          <IndicatoreGiocatoriImpr extractedPlayer={extractedPlayer} />
        </div>
      </main>
    </section>
  );
};

export default SecondaEstrazioneDiretta;
