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
      className="flex h-5/6 w-full flex-col items-center justify-around rounded-md border-2 px-1 xl:px-6"
    >
      <h4 className="my-1 text-xs font-bold uppercase text-[rgb(var(--clr-txt))] xl:my-0 xl:mb-1 xl:self-start xl:text-lg">
        {numbExtrPlayer === 1 ? "Giocatore estratto" : "Giocatori estratti"}
      </h4>
      <main
        id="mainSecEstrDiretta"
        className="flex h-full w-full flex-col items-center justify-around pt-8 xl:flex-row xl:gap-2 xl:pt-0"
      >
        <div
          id="extractedPlayers"
          className="flex h-fit w-fit flex-wrap items-center rounded-lg xl:h-full"
        >
          {extractedPlayer?.map((player, i) => {
            return (
              <div
                key={i}
                className={`relative flex flex-col items-center overflow-hidden rounded p-2 transition-all lg:p-6 ${numbExtrPlayer > 2 ? "h-fit min-w-28 lg:min-w-60" : numbExtrPlayer === 1 ? "h-full min-w-24 lg:min-w-60 xl:h-3/5 xl:w-96" : "h-full min-w-20 lg:min-w-52 xl:h-3/5 xl:w-80"}`}
              >
                <JerseySVGBg
                  fillColor={player === 1 ? colorGK.hex : colorPl.hex}
                  strokeColor="white"
                  className="stroke-2"
                />
                <span
                  className={`absolute left-1/2 top-1/3 z-50 -translate-x-1/2 -translate-y-1/3 font-['Anton'] ${numbExtrPlayer > 2 ? "text-[2.5rem] xl:text-[4rem]" : numbExtrPlayer === 1 ? "text-[2.8rem] xl:text-[7rem]" : "text-[3rem] xl:text-[5rem]"}`}
                  style={
                    player === 1
                      ? { color: colorNumGK.hex }
                      : { color: colorNumPl.hex }
                  }
                >
                  {player}
                </span>
              </div>
            );
          })}
        </div>
        <div className="min-h-fit w-full xl:w-fit">
          <IndicatoreGiocatoriImpr extractedPlayer={extractedPlayer} />
        </div>
      </main>
    </section>
  );
};

export default SecondaEstrazioneDiretta;
