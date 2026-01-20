import Dexie from "dexie";

export const db = new Dexie("db");

db.version(1).stores({
  prepartita:
    "++id, titolo, descrizione, isImprev, ultEstrazione, isSpecial, baseEstrazione, numbExtrPlayer, notaBene, weight",
  settimana: "++id, titolo, descrizione, isImprev, weight",
  serieNegativa:
    "++id, titolo, descrizione, isImprev, ultEstrazione, baseEstrazione, numbExtrPlayer, weight",
  speciali: "++id, titolo, descrizione, isImprev",
  ingaggiMercato: "++id, titolo, descrizione, isImprev, weight",
  sezioniAttive: "id, nomeSezione, isVisible",
  registroImprevisti: "++id, title, quantity",
  bonusAnnuali: "id",
  salvaxdopo: "++id, titolo, descrizione",
  saldoPunti: "++id, punti",
  bonusMalus:
    "++id, nome, valore, nomeUnder, nomeOver, nomeSerieMinore, nomeSerieMinoreOver, valoreUnder, valoreOver, valoreSerieMinore, valoreSerieMinoreOver",
  preferenzeImmagini: "id, nome, url",
});
