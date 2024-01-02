import { collection, query, where } from "firebase/firestore";
import { database } from "..";

export const combinedQuery = ({ queries, dbName = "profiles" }) => {
  const conditions = queries.map((obj) => {
    const key = Object.keys(obj)[0];
    const value = obj[key];
    return where(key, "==", value);
  });
  const q = query(collection(database, dbName), ...conditions);
  return q;
};
