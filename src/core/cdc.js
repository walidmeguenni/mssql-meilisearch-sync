import meiliSearchClient from "../meilisearch/meilisearchClient.js";
import { queryDB } from "../database/connect.js";
import { cdcQuery } from "../queries/index.js";

export const cdc = async (index, interval,  start_lsn) => {
  const pool = await queryDB();
  const userIndex = meiliSearchClient.index(index);
  try {
    console.log("cdc start at", Date.now())
    const result = await pool.request().query(cdcQuery(start_lsn));
    if (result.recordset.length > 0) {
      start_lsn = `0x${result.recordset[
        result.recordset.length - 1
      ].__$start_lsn.toString("hex")}`;
      for (const record of result.recordset) {
        if (record.__$operation === 1) {
          console.log("deleted record ===> ", record.id);
          await userIndex.deleteDocument(record.id);
        } else {
          const customRecord = {
            id: record.id,
            UserName: record.UserName,
            Email: record.Email,
            DateOfBirth: record.DateOfBirth,
          };
          if (record.__$operation === 2) {
            console.log("inserted record ===> ", record.id);
            await userIndex.addDocuments([customRecord]);
          }
          if (record.__$operation === 4) {
            console.log("updated record ===> ", record.id);
            await userIndex.addDocuments([customRecord]);
          }
        }
      }
    }
    console.log("cdc end at", Date.now())
  } catch (error) {
    console.error("Error fetching CDC data:", error.message);
  } finally {
    pool.close();
    setTimeout(() => cdc(index, interval, start_lsn), interval);
  }
};
