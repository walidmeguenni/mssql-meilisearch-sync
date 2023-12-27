const  meiliSearchClient = require("../meilisearch/meilisearchClient.js");
const { queryDB } = require("../database/connect.js");

const cdc = async (index, main, queruyCdc, start_lsn , pageSize, interval) => {
  const pool = await queryDB();
  const Index = meiliSearchClient.index(index);
  try {
    console.log("cdc start at", Date.now() ,"form process", process.pid)
    const result = await pool.request().query(queruyCdc(start_lsn, pageSize));
    if (result.recordset.length > 0) {
      start_lsn = `0x${result.recordset[
        result.recordset.length - 1
      ].__$start_lsn.toString("hex")}`;
      for (const record of result.recordset) {
        if (record.__$operation === 1) {
          if(main === 0){
            console.log("deleted record from main table ===> ", record.id);
            await Index.deleteDocument(record.id);
          } else {
            console.log("deleted record from second tabale ===> ", record.id);
            const oldDoc = await Index.getDocument(record.id);
            const { id , ...newRecord} = record;
            for (const key in newRecord) {
              if (Object.prototype.hasOwnProperty.call(newRecord, key)) {
                delete oldDoc[key];
              }
            }
            console.log("oldDoc", oldDoc)
            await Index.updateDocuments([oldDoc]);
          }
        } else {  
          const  { __$start_lsn,  __$operation, ...customRecord } = record;
          if (record.__$operation === 2) {
            if(main === 0){
              console.log("inserted record from main table ===> ", record.id);
              await Index.addDocuments([customRecord]);
            } else {
              console.log("inserted record from second tabale ===> ", record.id);
              const oldDoc = await Index.getDocument(record.id);
              const currentDoc = {...oldDoc, ...customRecord}
              await Index.updateDocuments([currentDoc]);
            }
          }
          if (record.__$operation === 4 || record.__$operation === 3) {
            console.log("updated record ===> ", record.id);
            await Index.addDocuments([customRecord]);
          }
        }
      }
    }
    console.log("cdc end at", Date.now(), "form process", process.pid)
  } catch (error) {
    console.error("Error fetching CDC data:", error.message);
  } finally {
    pool.close();
    setTimeout(() => cdc(index, main, queruyCdc, start_lsn , pageSize, interval), interval);
  }
};

module.exports = { cdc };