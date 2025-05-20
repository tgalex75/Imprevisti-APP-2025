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
    
    const { data: bonusTrofei, fetchRegistryList: fetchBonusTrofei } =
    useFetchData("bonus-trofei");
    
    const { data: bonusCessioni, fetchRegistryList: fetchBonusCessioni } =
    useFetchData("bonus-cessioni");
    
    const { data: malusAcquisti, fetchRegistryList: fetchMalusAcquisti } =
    useFetchData("malus-acquisti");
    
    const { data: trendPrestazioni, fetchRegistryList: fetchTrendPrestazioni } =
    useFetchData("trend-prestazioni");
    
    const { data: fineCampionato, fetchRegistryList: fetchFineCampionato } =
    useFetchData("fine-campionato");
    
    const { data: ingaggiMercato, fetchRegistryList: fetchIngaggiMercato } =
    useFetchData("ingaggi-mercato");
    
    //const { data: saldoPunti, fetchRegistryList: fetchSaldoPunti } =
    //useFetchData("ingaggi-mercato");
    
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
        bonusTrofei,
        fetchBonusTrofei,
        bonusCessioni,
        fetchBonusCessioni,
        malusAcquisti,
        fetchMalusAcquisti,
        trendPrestazioni,
        fetchTrendPrestazioni,
        fineCampionato,
        fetchFineCampionato
      }}
    >
      {children}
    </DatiImprevistiContext.Provider>
  );
};

export default DatiImprevistiContext;
