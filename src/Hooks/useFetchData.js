import { useState, useEffect } from "react";
import { db } from "../Db/db";

const useFetchData = (dexieTable) => {
  const [data, setData] = useState([]);

  const fetchRegistryList = async () => {
    const { data: fetchedData } = await db.dexieTable.toArray();
    setData(fetchedData ? fetchedData : []);
  };

  useEffect(() => {
    fetchRegistryList();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { data, fetchRegistryList };
};
export default useFetchData;
