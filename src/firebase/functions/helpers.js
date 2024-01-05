import { collection, query, where } from "firebase/firestore";
import { database } from "..";

export const combinedQuery = ({ queries, dbName = "profiles" }) => {
  try {
    const conditions = queries.map((obj) => {
      const key = Object.keys(obj)[0];
      const value = obj[key];
      const relation = obj["rel"] || "==";
      return where(key, relation, value);
    });
    const q = query(collection(database, dbName), ...conditions);
    return q;
  } catch (e) {
    console.error("Error in creating query: ", e.message);
    alert("Error in creating query: ", e.message);
  }
};
