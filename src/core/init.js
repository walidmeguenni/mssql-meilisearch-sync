import meiliSearchClient from "../meilisearch/meilisearchClient.js";

export const init = async (index) => {
  try {
    await meiliSearchClient.deleteIndex(index);
    console.log("delete index if it's exist ====> ", index )
    await meiliSearchClient.createIndex(index, {
      primaryKey: "id",
    });
    console.log("create index ====> ", index )
  } catch (error) {
    console.log("Meilisearch error: ", error);
  }
};
