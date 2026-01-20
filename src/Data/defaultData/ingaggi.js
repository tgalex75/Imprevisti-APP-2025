export const ingaggiMercatoDefaultValues = [
  {
    tipo: "ingaggi",
    titolo: "VISITE OK",
    descrizione: "La trattativa viene chiusa senza conseguenze.",
    isImprev: 0,
    weight: 15,
  },
  {
    tipo: "ingaggi",
    titolo: "VISITE NON superate",
    descrizione: "La trattativa salta e non può essere ritentata fino alla prossima finestra di mercato.",
    isImprev: 1,
    weight: 15,
  },
  {
    tipo: "mercato",
    titolo: "TRATTATIVA OK",
    descrizione: "Totale libertà di scelta.",
    isImprev: 0,
    weight: 15,
  },
  {
    tipo: "mercato",
    titolo: "MERCENARIO",
    descrizione: "Accetta offerta o raddoppia ingaggio appena possibile.",
    isImprev: 1,
    weight: 15,
  },
];

