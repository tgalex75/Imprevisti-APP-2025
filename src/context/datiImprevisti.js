import { createContext } from "react";
import useFetchData from "../Hooks/useFetchData";

const DatiImprevistiContext = createContext();

export const DatiImprevistiProvider = ({ children }) => {
  const { data: prepartita, fetchRegistryList: fetchPrepartita } =
    useFetchData("prepartita");
  
    const { data: speciali, fetchRegistryList: fetchSpeciali } =
    useFetchData("speciali");
    
    const { data: settimana, fetchRegistryList: fetchSettimana } =
    useFetchData("settimana");
    
    const { data: serieNegativa, fetchRegistryList: fetchSerieNegativa } =
    useFetchData("serie-negativa");
    
    const { data: bonusMalus, fetchRegistryList: fetchBonusMalus } =
    useFetchData("bonus-malus-punti");
        
    const { data: ingaggiMercato, fetchRegistryList: fetchIngaggiMercato } =
    useFetchData("ingaggi-mercato");
    
    const { data: saldoPunti, fetchRegistryList: fetchSaldoPunti } =
    useFetchData("saldo-punti");
    
  return (
    <DatiImprevistiContext.Provider
      value={{
        prepartita,
        fetchPrepartita,
        speciali,
        fetchSpeciali,
        settimana,
        fetchSettimana,
        ingaggiMercato,
        fetchIngaggiMercato,
        serieNegativa,
        fetchSerieNegativa,
        bonusMalus,
        fetchBonusMalus,
        saldoPunti,
        fetchSaldoPunti
      }}
    >
      {children}
    </DatiImprevistiContext.Provider>
  );
};

export default DatiImprevistiContext;
