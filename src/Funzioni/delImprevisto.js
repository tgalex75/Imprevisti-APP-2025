import { db } from "../Db/db";

export const delImprevisto = (tipoImprevisto, idToRemove) => {
  db[tipoImprevisto].delete(idToRemove);
};