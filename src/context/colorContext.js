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

  return (
    <ColorContext.Provider
      value={{
        primary,
        secondary,
        tertiary,
        updatePrimary,
        updateSecondary,
        updateTertiary,
      }}
    >
      {children}
    </ColorContext.Provider>
  );
};

export default ColorContext;
