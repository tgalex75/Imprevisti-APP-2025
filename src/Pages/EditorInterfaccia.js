import { useContext } from "react";
import ColorPickerComponent from "../Components/ColorPickerComponent";
import ColorContext from "../context/colorContext";
import Accordion from "../Components/Accordion";
import Tshirt from "../Components/Tshirt";
import ImageUploader from "../Funzioni/ImageUploader";
const EditorInterfaccia = () => {
  const {
    primary,
    secondary,
    tertiary,
    updatePrimary,
    updateSecondary,
    updateTertiary,
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
    <main className="flex h-full w-full flex-col items-center gap-12 overflow-y-auto p-4 font-bold">
      <h1>Editor interfaccia</h1>
      <h3>Scegli le tue preferenze da applicare nella App</h3>
      <Accordion
        title="Colori Principali della APP"
        content={
          <div className="grid w-full grid-cols-3 items-center gap-2 overflow-y-auto rounded-lg bg-slate-100/10 p-4 text-gray-300 xl:grid-cols-6 xl:gap-0 xl:p-0">
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
          </div>
        }
      />

      <Accordion
        title={"Colori Casacche Giocatori"}
        content={
          <div className="grid w-full grid-cols-3 items-center gap-2 overflow-y-auto rounded-lg bg-slate-100/10 p-4 text-gray-300 xl:grid-cols-6 xl:gap-0 xl:p-0">
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
            <Tshirt
              keyId="PlayerTShirt"
              numPlayer={10}
              colorGK={colorGK}
              colorPl={colorPl}
              colorNumGK={colorNumGK}
              colorNumPl={colorNumPl}
              extrPlayers={1}
            />
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
            <Tshirt
              keyId="GKTShirt"
              numPlayer={1}
              colorGK={colorGK}
              colorPl={colorPl}
              colorNumGK={colorNumGK}
              colorNumPl={colorNumPl}
              extrPlayers={1}
            />
          </div>
        }
      />
      <div className="h-auto w-full">
        <Accordion title={"Scelta del Logo per lo sfondo"} content={<ImageUploader />} />
      </div>
    </main>
  );
};

export default EditorInterfaccia;
