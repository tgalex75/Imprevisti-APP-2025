export const serieNegativaDefaultValues = [
  {
    titolo: "Imprevisto con estrazione giocatori sul totale rosa",
    descrizione: "Motivo per l'estrazione di tre giocatori",
    isimprev: 1, // true = 1, false = 0
    ultEstrazione: 1, // true = 1, false = 0
    baseEstrazione: 30,
    numbExtrPlayer: 3,
    weight: 15,
  },
  {
    titolo: "Imprevisto senza estrazione giocatori",
    descrizione: "Motivo per l'estrazione di tre giocatori",
    isimprev: 1, // true = 1, false = 0
    ultEstrazione: 0, // true = 1, false = 0
    baseEstrazione: 30,
    numbExtrPlayer: 0,
    weight: 15,
  },
  {
    titolo: "NESSUN IMPREVISTO",
    descrizione: "Stavolta tutto tranquillo",
    isimprev: 0, // true = 1, false = 0
    ultEstrazione: 0, // true = 1, false = 0
    baseEstrazione: 30,
    numbExtrPlayer: 0,
    weight: 15,
  },
];
