import { useEffect, createContext, useState } from "react";
import { bonusMalusDefaultValues } from "../Data/defaultData/bonusMalus";
import { serieNegativaDefaultValues } from "../Data/defaultData/serieNegativa";
import { specialiDefaultValues } from "../Data/defaultData/speciali";
import { settimanaDefaultValues } from "../Data/defaultData/settimana";
import { ingaggiMercatoDefaultValues } from "../Data/defaultData/ingaggi";
import { prepartitaDefaultValues } from "../Data/defaultData/prepartita";
import { prefImmaginiDefaultValues } from "../Data/defaultData/immagini";
import { sezioniAttiveDefaultValues } from "../Data/defaultData/sezioniAttive";
import { db } from "../Db/db";
import { useLiveQuery } from "dexie-react-hooks";

const DatiImprevistiContext = createContext();

export const DatiImprevistiProvider = ({ children }) => {
  const [dbReady, setDbReady] = useState(false); // Nuovo stato di controllo

  const prepartita = useLiveQuery(async () => db.prepartita.toArray());
  const settimana = useLiveQuery(async () => db.settimana.toArray());
  const serieNegativa = useLiveQuery(async () => db.serieNegativa.toArray());
  const ingaggiMercato = useLiveQuery(async () => db.ingaggiMercato.toArray());
  const speciali = useLiveQuery(async () => db.speciali.toArray());
  const saldoPunti = useLiveQuery(async () => db.saldoPunti.toArray());
  const bonusMalus = useLiveQuery(async () => db.bonusMalus.toArray());
  const bonusAnnuali = useLiveQuery(async () => db.bonusAnnuali.toArray());
  const salvaxdopo = useLiveQuery(async () => db.salvaxdopo.toArray());
  const registroImprevisti = useLiveQuery(async () =>
    db.registroImprevisti.toArray(),
  );
  const preferenzeImmagini = useLiveQuery(async () =>
    db.preferenzeImmagini.toArray(),
  );
  const sezioniAttive = useLiveQuery(async () => db.sezioniAttive.toArray());

  useEffect(() => {
    const inizializzaDb = async () => {
      try {
        const [
          checkPrepartita,
          checkSpeciali,
          checkSettimana,
          checkSerieNegativa,
          checkIngaggiMercato,
          checkSezioniAttive,
          checkBonusMalus,
          checkBonusAnnuali,
          checkSalvaxdopo,
          checkRegistroImprevisti,
          checkPreferenzeImmagini,
          checkSaldoPunti,
        ] = await Promise.all([
          db.prepartita.toArray(),
          db.speciali.toArray(),
          db.settimana.toArray(),
          db.serieNegativa.toArray(),
          db.ingaggiMercato.toArray(),
          db.sezioniAttive.toArray(),
          db.saldoPunti.toArray(),
          db.bonusMalus.toArray(),
          db.bonusAnnuali.toArray(),
          db.salvaxdopo.toArray(),
          db.registroImprevisti.toArray(),
          db.preferenzeImmagini.toArray(),
        ]);

        const inizializzaTasks = [];
        if (checkPrepartita.length === 0) {
          inizializzaTasks.push(db.prepartita.bulkAdd(prepartitaDefaultValues));
        }
        if (checkSpeciali.length === 0) {
          inizializzaTasks.push(db.speciali.bulkAdd(specialiDefaultValues));
        }
        if (checkSettimana.length === 0) {
          inizializzaTasks.push(db.settimana.bulkAdd(settimanaDefaultValues));
        }
        if (checkSerieNegativa.length === 0) {
          inizializzaTasks.push(
            db.serieNegativa.bulkAdd(serieNegativaDefaultValues),
          );
        }
        if (checkIngaggiMercato.length === 0) {
          inizializzaTasks.push(
            db.ingaggiMercato.bulkAdd(ingaggiMercatoDefaultValues),
          );
        }
        if (checkSezioniAttive.length === 0) {
          inizializzaTasks.push(
            db.sezioniAttive.bulkAdd(sezioniAttiveDefaultValues),
          );
        }
        if (checkSaldoPunti.length === 0) {
          inizializzaTasks.push(db.saldoPunti.add({ punti: 10 }));
        }
        if (checkBonusMalus.length === 0) {
          inizializzaTasks.push(db.bonusMalus.bulkAdd(bonusMalusDefaultValues));
        }
        if (checkBonusAnnuali.length === 0) {
          inizializzaTasks.push(db.bonusAnnuali.add({}));
        }
        if (checkSalvaxdopo.length === 0) {
          inizializzaTasks.push(db.salvaxdopo.add({}));
        }
        if (checkRegistroImprevisti.length === 0) {
          inizializzaTasks.push(db.registroImprevisti.add({}));
        }
        if (checkPreferenzeImmagini.length === 0) {
          inizializzaTasks.push(
            db.preferenzeImmagini.bulkAdd(prefImmaginiDefaultValues),
          );
        }
        if (inizializzaTasks.length > 0) {
          await Promise.all(inizializzaTasks);
        }
        setDbReady(true);
      } catch (error) {
        console.error(
          "Errore durante l'inizializzazione del database: ",
          error,
        );
      }
    };
    inizializzaDb();
    // eslint-disable-next-line
  }, []);

  return (
    <DatiImprevistiContext.Provider
      value={{
        dbReady,
        prepartita,
        speciali,
        settimana,
        serieNegativa,
        ingaggiMercato,
        sezioniAttive,
        saldoPunti,
        bonusMalus,
        bonusAnnuali,
        salvaxdopo,
        registroImprevisti,
        preferenzeImmagini,
      }}
    >
      {children}
    </DatiImprevistiContext.Provider>
  );
};

export default DatiImprevistiContext;
