import meiliSearchClient from "../meilisearch/meilisearchClient.js";

export const deleteDocument = async (index) => {
  try {
    await meiliSearchClient.deleteIndex(index);
  } catch (error) {
    console.log("Meilisearch error: ", error);
  }
};
