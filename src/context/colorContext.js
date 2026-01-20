// ColorContext.js
import { createContext, useState } from "react";

const ColorContext = createContext();

const convertRgb = (color) => {
  const rgbValues = `${color.r} ${color.g} ${color.b}`;
  return rgbValues;
};

export const ColorProvider = ({ children }) => {
  // Carica i colori dal localStorage o usa valori di default
  const [primary, setPrimary] = useState({
    simpleRgb: localStorage.getItem("primaryColor") || "208 2 27",
    hex: "#D0021B",
  });
  const [secondary, setSecondary] = useState({
    simpleRgb: localStorage.getItem("secondaryColor") || "0 128 0",
    hex: "#008000",
  });
  const [tertiary, setTertiary] = useState({
    simpleRgb: localStorage.getItem("tertiaryColor") || "255 165 0",
    hex: "#FFA500",
  });
  const [colorBG, setColorBG] = useState({
    simpleRgb: localStorage.getItem("colorBG") || "18 18 18",
    hex: "#121212",
  });
  const [colorTxt, setColorTxt] = useState({
    simpleRgb: localStorage.getItem("colorTxt") || "238 238 238",
    hex: "#eeeeee",
  });
  const [colorBtn, setColorBtn] = useState({
    simpleRgb: localStorage.getItem("colorBtn") || "75 20 124",
    hex: "#4b147c",
  });
  const [colorGK, setColorGK] = useState({
    simpleRgb: localStorage.getItem("colorGK") || "44 79 4",
    hex: "#2C4F04",
  });
  const [colorNumGK, setColorNumGK] = useState({
    simpleRgb: localStorage.getItem("colorNumGK") || "255 255 255",
    hex: "#FFFFFF",
  });
  const [colorPl, setColorPl] = useState({
    simpleRgb: localStorage.getItem("colorPl") || "255 0 0",
    hex: "#FF0000",
  });
  const [colorNumPl, setColorNumPl] = useState({
    simpleRgb: localStorage.getItem("colorNumPl") || "255 255 255",
    hex: "#FFFFFF",
  });

  // Funzione per aggiornare il colore primario
  const updatePrimary = (newColor) => {
    setPrimary({ simpleRgb: convertRgb(newColor.rgb), hex: newColor.hex });
    localStorage.setItem("primaryColor", convertRgb(newColor.rgb));
  };

  // Funzione per aggiornare il colore secondario
  const updateSecondary = (newColor) => {
    setSecondary({ simpleRgb: convertRgb(newColor.rgb), hex: newColor.hex });
    localStorage.setItem("secondaryColor", convertRgb(newColor.rgb));
  };

  // Funzione per aggiornare il colore terziario
  const updateTertiary = (newColor) => {
    setTertiary({ simpleRgb: convertRgb(newColor.rgb), hex: newColor.hex });
    localStorage.setItem("tertiaryColor", convertRgb(newColor.rgb));
  };

  // Funzione per aggiornare il colore dello sfondo
  const updateBgColor = (newColor) => {
    setColorBG({ simpleRgb: convertRgb(newColor.rgb), hex: newColor.hex });
    localStorage.setItem("colorBG", convertRgb(newColor.rgb));
  };

  // Funzione per aggiornare il colore del testo
  const updateTxt = (newColor) => {
    setColorTxt({ simpleRgb: convertRgb(newColor.rgb), hex: newColor.hex });
    localStorage.setItem("colorTxt", convertRgb(newColor.rgb));
  };
  // Funzione per aggiornare il colore dei Bottoni
  const updateBtn = (newColor) => {
    setColorBtn({ simpleRgb: convertRgb(newColor.rgb), hex: newColor.hex });
    localStorage.setItem("colorBtn", convertRgb(newColor.rgb));
  };

  // Funzione per aggiornare il colore della T-Shirt del Portiere
  const updateColorGK = (newColor) => {
    setColorGK({ simpleRgb: convertRgb(newColor.rgb), hex: newColor.hex });
    localStorage.setItem("colorGK", convertRgb(newColor.rgb));
  };

  // Funzione per aggiornare il colore della T-Shirt del Portiere
  const updateColorNumGK = (newColor) => {
    setColorNumGK({ simpleRgb: convertRgb(newColor.rgb), hex: newColor.hex });
    localStorage.setItem("colorNumGK", convertRgb(newColor.rgb));
  };

  // Funzione per aggiornare il colore della T-Shirt del Portiere
  const updateColorPl = (newColor) => {
    setColorPl({ simpleRgb: convertRgb(newColor.rgb), hex: newColor.hex });
    localStorage.setItem("colorPl", convertRgb(newColor.rgb));
  };

  // Funzione per aggiornare il colore della T-Shirt del Portiere
  const updateColorNumPl = (newColor) => {
    setColorNumPl({ simpleRgb: convertRgb(newColor.rgb), hex: newColor.hex });
    localStorage.setItem("colorNumPl", convertRgb(newColor.rgb));
  };

  return (
    <ColorContext.Provider
      value={{
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
      }}
    >
      {children}
    </ColorContext.Provider>
  );
};

export default ColorContext;
