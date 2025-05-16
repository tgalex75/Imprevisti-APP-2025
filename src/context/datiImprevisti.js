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

  return (
    <DatiImprevistiContext.Provider
      value={{
        prepartita,
        fetchPrepartita,
        speciali,
        fetchSpeciali,
        settimana,
        fetchSettimana,
        serieNegativa,
        fetchSerieNegativa,
      }}
    >
      {children}
    </DatiImprevistiContext.Provider>
  );
};

export default DatiImprevistiContext;
