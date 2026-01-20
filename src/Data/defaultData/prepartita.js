export const prepartitaDefaultValues = [
  {
    titolo: "Imprevisto SPECIALE",
    descrizione: "",
    isImprev: 1, // true = 1, false = 0
    isSpecial: 1, // true = 1, false = 0
    ultEstrazione: 1, // true = 1, false = 0
    baseEstrazione: 30,
    numbExtrPlayer: 1,
    notaBene: "",
    weight: 15,
  },
  {
    titolo: "NESSUN Imprevisto",
    descrizione: "Tutto tranquillo",
    isImprev: 0, // true = 1, false = 0
    isSpecial: 0, // true = 1, false = 0
    ultEstrazione: 0, // true = 1, false = 0
    baseEstrazione: 30,
    numbExtrPlayer: 0,
    notaBene: "",
    weight: 25,
  },
  {
    titolo: "Imprevisto INTESTINALE",
    descrizione: "Tre giocatori OUT per problemi intestinali",
    isImprev: 1, // true = 1, false = 0
    isSpecial: 0, // true = 1, false = 0
    ultEstrazione: 1, // true = 1, false = 0
    baseEstrazione: 30,
    numbExtrPlayer: 4,
    notaBene: "",
    weight: 12,
  },
];
