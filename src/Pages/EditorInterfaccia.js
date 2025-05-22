import { useContext } from "react";
import ColorPickerComponent from "../Components/ColorPickerComponent";
import ColorContext from "../context/colorContext";
import Accordion from "../Components/Accordion";
import JerseySVGBg from "../Components/JerseySVGBg";
import ImageUploader from "../Funzioni/ImageUploader";
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

  const listaUploader = [
    { id: 1, nome: "Prepartita", urlName: "prepartita" },
    { id: 2, nome: "Settimana", urlName: "settimana" },
    { id: 3, nome: "Serie Negativa", urlName: "serie-negativa" },
    { id: 4, nome: "Ingaggi", urlName: "ingaggi" },
    { id: 5, nome: "Mercato", urlName: "mercato" },
    { id: 6, nome: "Saldo Punti", urlName: "saldo-punti" },
    { id: 7, nome: "Logo", urlName: "logo" },
  ];
  const mappedUploader = listaUploader.map((el) => (
    <ImageUploader key={el.id} nome={el.nome} urlName={el.urlName} />
  ));

  return (
    <main className="flex h-full w-full flex-col items-center xl:gap-8 overflow-y-auto p-4 font-bold">
      <h1>Editor interfaccia</h1>
      <h3>Scegli le tue preferenze da applicare nella App</h3>
      <Accordion
        title="Colori Principali della APP"
        content={
          <div className="grid w-full grid-cols-3 items-center gap-2 overflow-y-auto rounded-lg bg-[--clr-bg] p-4 text-[--clr-txt] xl:grid-cols-6 xl:gap-0 xl:p-0">
            <ColorPickerComponent
              defaultColor={primary}
              updateFunc={updatePrimary}
              testoColore="PRIMARIO"
            />
            <ColorPickerComponent
              defaultColor={secondary}
              updateFunc={updateSecondary}
              testoColore="SECONDARIO"
            />
            <ColorPickerComponent
              defaultColor={tertiary}
              updateFunc={updateTertiary}
              testoColore="TERZIARIO"
            />
            <ColorPickerComponent
              defaultColor={colorBG}
              updateFunc={updateBgColor}
              testoColore="SFONDO"
            />
            <ColorPickerComponent
              defaultColor={colorTxt}
              updateFunc={updateTxt}
              testoColore="TESTO"
            />
            <ColorPickerComponent
              defaultColor={colorBtn}
              updateFunc={updateBtn}
              testoColore="PULSANTI"
            />
          </div>
        }
      />

      <Accordion
        title={"Colori Casacche Giocatori"}
        content={
          <div className="grid w-full grid-cols-3 items-center gap-2 overflow-y-auto rounded-lg bg-[--clr-bg] p-4 text-[--clr-txt] xl:grid-cols-6 xl:gap-0 xl:p-0">
            <ColorPickerComponent
              defaultColor={colorPl}
              updateFunc={updateColorPl}
              testoColore="CASACCA GIOCATORI"
            />
            <ColorPickerComponent
              defaultColor={colorNumPl}
              updateFunc={updateColorNumPl}
              testoColore="NUMERO GIOCATORI"
            />
            {/* T-SHIRT */}
            <div className="relative flex flex-col items-center justify-around gap-4">
              <JerseySVGBg fillColor={colorPl} strokeColor="white" />
              <span
                className="absolute left-1/2 top-1/3 z-50 -translate-x-1/2 -translate-y-1/3 p-2 font-['Anton'] text-7xl xl:text-9xl"
                style={{ color: colorNumPl }}
              >
                10
              </span>
            </div>
            <ColorPickerComponent
              defaultColor={colorGK}
              updateFunc={updateColorGK}
              testoColore="CASACCA PORTIERE"
            />
            <ColorPickerComponent
              defaultColor={colorNumGK}
              updateFunc={updateColorNumGK}
              testoColore="NUMERO PORTIERE"
            />
            {/* T-SHIRT */}
            <div className="relative flex flex-col items-center justify-around gap-4">
              <JerseySVGBg fillColor={colorGK} strokeColor="white" />
              <span
                className="absolute left-1/2 top-1/3 z-50 -translate-x-1/2 -translate-y-1/3 stroke-2 p-2 font-['Anton'] text-7xl xl:text-9xl"
                style={{ color: colorNumGK }}
              >
                1
              </span>
            </div>
          </div>
        }
      />
      <div className="h-full w-full overflow-y-auto">
        <Accordion
          title={"Scelta Immagini personalizzate"}
          content={mappedUploader}
        />
      </div>
    </main>
  );
};

export default EditorInterfaccia;
