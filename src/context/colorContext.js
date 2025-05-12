// ColorContext.js
import React, { createContext, useState } from "react";

const ColorContext = createContext();

export const ColorProvider = ({ children }) => {
  // Carica i colori dal localStorage o usa valori di default
  const [primary, setPrimary] = useState(
    localStorage.getItem("primaryColor") || "#0000FF",
  );
  const [secondary, setSecondary] = useState(
    localStorage.getItem("secondaryColor") || "#008000",
  );
  const [tertiary, setTertiary] = useState(
    localStorage.getItem("tertiaryColor") || "#FFA500",
  );
  const [colorBG, setColorBG] = useState(
    localStorage.getItem("colorBG") || "#1d1c2f",
  );
  const [colorTxt, setColorTxt] = useState(
    localStorage.getItem("colorTxt") || "#eeeeee",
  );
  const [colorBtn, setColorBtn] = useState(
    localStorage.getItem("colorBtn") || "#4b147c",
  );
  const [colorGK, setColorGK] = useState(
    localStorage.getItem("colorGK") || "#2C4F04",
  );
  const [colorNumGK, setColorNumGK] = useState(
    localStorage.getItem("colorNumGK") || "#FFFFFF",
  );
  const [colorPl, setColorPl] = useState(
    localStorage.getItem("colorPl") || "#FF0000",
  );
  const [colorNumPl, setColorNumPl] = useState(
    localStorage.getItem("colorNumPl") || "#FFFFFF",
  );

  // Funzione per aggiornare il colore primario
  const updatePrimary = (newColor) => {
    setPrimary(newColor.hex);
    localStorage.setItem("primaryColor", newColor.hex);
  };

  // Funzione per aggiornare il colore secondario
  const updateSecondary = (newColor) => {
    setSecondary(newColor.hex);
    localStorage.setItem("secondaryColor", newColor.hex);
  };

  // Funzione per aggiornare il colore terziario
  const updateTertiary = (newColor) => {
    setTertiary(newColor.hex);
    localStorage.setItem("tertiaryColor", newColor.hex);
  };

  // Funzione per aggiornare il colore dello sfondo
  const updateBgColor = (newColor) => {
    setColorBG(newColor.hex);
    localStorage.setItem("colorBG", newColor.hex);
  };

  // Funzione per aggiornare il colore del testo
  const updateTxt = (newColor) => {
    setColorTxt(newColor.hex);
    localStorage.setItem("colorTxt", newColor.hex);
  };
  // Funzione per aggiornare il colore dei Bottoni
  const updateBtn = (newColor) => {
    setColorBtn(newColor.hex);
    localStorage.setItem("colorBtn", newColor.hex);
  };

  // Funzione per aggiornare il colore della T-Shirt del Portiere
  const updateColorGK = (newColor) => {
    setColorGK(newColor.hex);
    localStorage.setItem("colorGK", newColor.hex);
  };

  // Funzione per aggiornare il colore della T-Shirt del Portiere
  const updateColorNumGK = (newColor) => {
    setColorNumGK(newColor.hex);
    localStorage.setItem("colorNumGK", newColor.hex);
  };

  // Funzione per aggiornare il colore della T-Shirt del Portiere
  const updateColorPl = (newColor) => {
    setColorPl(newColor.hex);
    localStorage.setItem("colorPl", newColor.hex);
  };

  // Funzione per aggiornare il colore della T-Shirt del Portiere
  const updateColorNumPl = (newColor) => {
    setColorNumPl(newColor.hex);
    localStorage.setItem("colorNumPl", newColor.hex);
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
        updateColorNumPl
      }}
    >
      {children}
    </ColorContext.Provider>
  );
};

export default ColorContext;
