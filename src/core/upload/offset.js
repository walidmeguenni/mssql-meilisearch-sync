import { queryDB } from "../../database/connect.js";
import { offsetQuery } from "../../queries/index.js";
import meiliSearchClient from "../../meilisearch/meilisearchClient.js";

export const offsetUpload = async () => {
  try {
    const pageSize = 1000;
    let page = 1;
    const pool = await queryDB();
    const request = pool.request();
    while (true) {
      const result = await request.query(offsetQuery(page, pageSize));
      if (result.recordset.length === 0) break;
      await meiliSearchClient.index("Adhoc").addDocuments(result.recordset);
      page++;
    }
  } catch (err) {
    console.error("Error:", err);
  }
}
