import meiliSearchClient from "../../meilisearch/meilisearchClient.js";
import { queryDB } from "../../database/connect.js";
import { cursorQuery } from "../../queries/index.js";

export const cursorUpload = async (index) => {
  const pool = await queryDB();
  const userIndex =  meiliSearchClient.index(index);
  try {
    console.log("start upload data")
    const pageSize = 10000;
    let cursor = 1;
    let status = true;
    while (status) {
      const result = await pool.request().query(cursorQuery(cursor, pageSize));
      if (result.recordset.length === 0){
        status = false;
        break;
      };
      await userIndex.addDocuments(result.recordset);
      cursor = result.recordset[result.recordset.length - 1].id;
    }
    console.log("data uploaded")
  } catch (err) {
    console.error("Error:", err);
  } finally {
    pool.close()
  }
}
