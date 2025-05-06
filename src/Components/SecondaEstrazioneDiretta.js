/* eslint-disable react-hooks/exhaustive-deps */
import { useContext } from "react";
//import firstKit from "../assets/imgs/firstKit.png";
//import gkKit from "../assets/imgs/gkKit.png";
//import firstKit from "../assets/imgs/jersey.svg";
import IndicatoreGiocatoriImpr from "./IndicatoreGiocatoriImpr";
import JerseySVGBg from "./JerseySVGBg";
import ColorContext from "../context/colorContext";

const SecondaEstrazioneDiretta = (props) => {
  const { numbExtrPlayer, extractedPlayer } = props;
  const { primary, secondary } = useContext(ColorContext);

  return (
    <section
      id="secEstrDiretta"
      className="mb-12 flex h-fit w-full flex-col items-center justify-around rounded-md border-2 border-gray-300/20 px-1 md:min-h-[40%] xl:px-6"
    >
      <h4 className="my-1 text-xs font-bold uppercase text-gray-300 md:my-0 md:mb-1 md:text-lg xl:self-start">
        {numbExtrPlayer === 1 ? "Giocatore estratto" : "Giocatori estratti"}
      </h4>
      <main
        id="mainSecEstrDiretta"
        className="flex h-full w-full items-center justify-between xl:gap-2"
      >
        <div
          id="extractedPlayers"
          className="flex h-full w-3/4 flex-wrap items-center justify-end gap-2 rounded-lg md:flex-nowrap xl:w-1/2 xl:gap-4"
        >
          {extractedPlayer?.map((player, i) => {
            return (
              <div
                key={i}
                className="relative flex w-full flex-col items-center justify-center overflow-hidden rounded transition-all md:h-4/5"
                /* style={{
                  backgroundImage:
                     `url(${<JerseySVGBg fillColor={primary} />})` : `url(${<JerseySVGBg fillColor={secondary} />})`,
                }} */
              >
                {player === 1 ? (
                  <>
                    <JerseySVGBg
                      fillColor={primary}
                      strokeColor={secondary}
                      className="stroke-2"
                    />
                    <span className={`absolute left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 font-['Anton'] text-slate-800 ${numbExtrPlayer > 3 ? "pb-4 text-7xl xl:text-8xl" : "pb-20 text-9xl xl:text-8xl"}`}>
                      {player}
                    </span>
                  </>
                ) : (
                  <>
                    <JerseySVGBg
                      fillColor={secondary}
                      strokeColor={primary}
                      className="stroke-2"
                    />
                    <span className={`absolute left-1/2 top-1/2 z-50 -translate-x-1/2 -translate-y-1/2 font-['Anton'] text-slate-800 ${numbExtrPlayer > 3 ? "pb-4 text-7xl xl:text-8xl" : "pb-20 text-9xl xl:text-8xl"}`}>
                      {player}
                    </span>
                  </>
                )}
              </div>
            );
          })}
        </div>
        <IndicatoreGiocatoriImpr extractedPlayer={extractedPlayer} />
      </main>
    </section>
  );
};

export default SecondaEstrazioneDiretta;
