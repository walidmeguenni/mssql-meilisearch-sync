import meiliSearchClient from "../meilisearch/meilisearchClient.js";
import { queryDB } from "../database/connect.js";

export const cursorUpload = async (index, cursorQuery, cursor, pageSize) => {
  const pool = await queryDB();
  const Index =  meiliSearchClient.index(index);
  try {
    console.log("start upload data")
    let status = true;
    while (status) {
      console.log("cursor", cursor)
      const result = await pool.request().query(cursorQuery(cursor, pageSize));
      if (result.recordset.length === 0){
        status = false;
        break;
      };
      await Index.addDocuments(result.recordset);
      cursor = result.recordset[result.recordset.length - 1].id;
    }
    console.log("data uploaded")
  } catch (err) {
    console.error("Error:", err);
  } finally {
    pool.close()
  }
}
