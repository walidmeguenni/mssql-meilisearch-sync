import meiliSearchClient from "../meilisearch/meilisearchClient.js";
import { queryDB } from "../database/connect.js";

export const cdc = async (index, queruyCdc, startLsnList, operationList, pageSize, interval) => {
  const pool = await queryDB();
  const Index = meiliSearchClient.index(index);
  try {
    console.log("cdc start at", Date.now())
    const result = await pool.request().query(queruyCdc(startLsnList[0], pageSize));
    if (result.recordset.length > 0) {
      startLsnList[0] = `0x${result.recordset[
        result.recordset.length - 1
      ].__$start_lsn.toString("hex")}`;
      for (const record of result.recordset) {
        if (record.__$operation === 1) {
          console.log("deleted record ===> ", record.id);
          await Index.deleteDocument(record.id);
        } else {
          const  { __$start_lsn,  __$operation, ...customRecord } = record;
          if (record.__$operation === 2) {
            console.log("inserted record ===> ", record.id);
            await Index.addDocuments([customRecord]);
          }
          if (record.__$operation === 4) {
            console.log("updated record ===> ", record.id);
            await Index.addDocuments([customRecord]);
          }
        }
      }
    }
    console.log("cdc end at", Date.now())
  } catch (error) {
    console.error("Error fetching CDC data:", error.message);
  } finally {
    pool.close();
    setTimeout(() => cdc(index, queruyCdc, start_lsn, pageSize, interval), interval);
  }
};
