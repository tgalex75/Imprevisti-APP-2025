import { useContext } from "react";
import ColorPickerComponent from "../Components/ColorPickerComponent";
import ColorContext from "../context/colorContext";
import Accordion from "../Components/Accordion";
import JerseySVGBg from "../Components/JerseySVGBg";
import ImgUploaderList from "../Components/ImgUploaderList";

const EditorInterfaccia = () => {
  const {
    primary,
    secondary,
    tertiary,
    colorBG,
    colorTxt,
    colorBtn,
    updatePrimary,
    updateSecondary,
    updateTertiary,
    updateBgColor,
    updateTxt,
    updateBtn,
    colorGK,
    colorNumGK,
    colorPl,
    colorNumPl,
    updateColorGK,
    updateColorNumGK,
    updateColorPl,
    updateColorNumPl,
  } = useContext(ColorContext);


  return (
    <main className="flex h-full w-full flex-col items-center overflow-y-auto p-4 font-bold xl:gap-8">
      <h1>Impostazioni APP</h1>
      <h3 className="text-center text-sm xl:text-lg">
        Le tue preferenze da applicare nella App
      </h3>
      <div className="w-full overflow-y-auto xl:overflow-hidden">
        <Accordion
          title="Colori Principali della APP"
          content={
            <div className="grid w-full grid-cols-2 items-center gap-1 rounded-lg bg-[rgb(var(--clr-bg))] text-[rgb(var(--clr-txt))] xl:grid-cols-6 xl:gap-0">
              <ColorPickerComponent
                defaultColor={primary.hex}
                updateFunc={updatePrimary}
                testoColore="PRIMARIO"
              />
              <ColorPickerComponent
                defaultColor={secondary.hex}
                updateFunc={updateSecondary}
                testoColore="SECONDARIO"
              />
              <ColorPickerComponent
                defaultColor={tertiary.hex}
                updateFunc={updateTertiary}
                testoColore="TERZIARIO"
              />
              <ColorPickerComponent
                defaultColor={colorBG.hex}
                updateFunc={updateBgColor}
                testoColore="SFONDO"
              />
              <ColorPickerComponent
                defaultColor={colorTxt.hex}
                updateFunc={updateTxt}
                testoColore="TESTO"
              />
              <ColorPickerComponent
                defaultColor={colorBtn.hex}
                updateFunc={updateBtn}
                testoColore="PULSANTI E BORDI"
              />
            </div>
          }
        />
      </div>

      <div className="w-full overflow-y-auto xl:overflow-hidden">
        <Accordion
          title={"Colori Casacche Giocatori"}
          content={
            <div className="grid w-full grid-rows-6 items-center gap-2 overflow-y-auto rounded-lg bg-[rgb(var(--clr-bg))] p-4 text-[rgb(var(--clr-txt))] xl:grid-cols-6 xl:gap-0 xl:p-0">
              <ColorPickerComponent
                defaultColor={colorPl.hex}
                updateFunc={updateColorPl}
                testoColore="CASACCA GIOCATORI"
              />
              <ColorPickerComponent
                defaultColor={colorNumPl.hex}
                updateFunc={updateColorNumPl}
                testoColore="NUMERO GIOCATORI"
              />
              {/* T-SHIRT */}
              <div className="relative flex flex-col items-center justify-around gap-4">
                <JerseySVGBg fillColor={colorPl.hex} strokeColor="white" />
                <span
                  className="absolute left-1/2 top-1/3 z-50 -translate-x-1/2 -translate-y-1/3 p-2 font-['Anton'] text-7xl xl:text-9xl"
                  style={{ color: colorNumPl.hex }}
                >
                  10
                </span>
              </div>
              <ColorPickerComponent
                defaultColor={colorGK.hex}
                updateFunc={updateColorGK}
                testoColore="CASACCA PORTIERE"
              />
              <ColorPickerComponent
                defaultColor={colorNumGK.hex}
                updateFunc={updateColorNumGK}
                testoColore="NUMERO PORTIERE"
              />
              {/* T-SHIRT */}
              <div className="relative flex flex-col items-center justify-around gap-4">
                <JerseySVGBg fillColor={colorGK.hex} strokeColor="white" />
                <span
                  className="absolute left-1/2 top-1/3 z-50 -translate-x-1/2 -translate-y-1/3 stroke-2 p-2 font-['Anton'] text-7xl xl:text-9xl"
                  style={{ color: colorNumGK.hex }}
                >
                  1
                </span>
              </div>
            </div>
          }
        />
      </div>
      <div className="w-full overflow-y-auto">
        <Accordion
          title={"Scelta Immagini personalizzate"}
          content={<ImgUploaderList />}
        />
      </div>
    </main>
  );
};

export default EditorInterfaccia;
