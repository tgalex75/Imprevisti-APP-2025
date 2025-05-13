import { createContext } from "react";
import useFetchData from "../Hooks/useFetchData";

const DatiImprevistiContext = createContext();

export const DatiImprevistiProvider = ({ children }) => {
  const { data: prepartita, fetchRegistryList: fetchPrepartita } =
    useFetchData("prepartita");
  
    const { data: speciali, fetchRegistryList: fetchSpeciali } =
    useFetchData("speciali");

  return (
    <DatiImprevistiContext.Provider
      value={{
        prepartita,
        fetchPrepartita,
        speciali,
        fetchSpeciali,
      }}
    >
      {children}
    </DatiImprevistiContext.Provider>
  );
};

export default DatiImprevistiContext;
