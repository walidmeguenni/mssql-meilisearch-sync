const cluster = require('cluster');
const { cdc, cursorUpload, init } = require( "./core");
const { testUploadQuery, userCdcQuery, productCdcQuery } = require(  "./queries");

const main = async (index, queruyUpload, cursor, queruyCdcList, startLsnList, pageSize, interval) => {
  try {
    if (cluster.isPrimary) {
      await init(index);
      await cursorUpload(index, queruyUpload, cursor, pageSize);
      console.log("queruyCdcList.length", queruyCdcList.length)
      for (let i = 0; i < queruyCdcList.length; i++) {
        const queruyCdcId = i;
        const startLsnId = i;
        const worker = cluster.fork(); 
        worker.send({ queruyCdcId, startLsnId, index, pageSize, interval });
      }
    } else {
      process.on("message", async (args) => {
        console.log("args", args)
        const { queruyCdcId, startLsnId, index, pageSize, interval } = args;
        const queruyCdc = queruyCdcList[queruyCdcId];
        const startLsn = startLsnList[startLsnId];
        await cdc(index, queruyCdcId , queruyCdc, startLsn, pageSize, interval);
      });
    }
  } catch (error) {
    console.log("mssql meilisearch :", error);
  }
};
              
let index = "Test";
let cursor = 0;

let queruyCdcList =[
  userCdcQuery,
  productCdcQuery,
]

let startLsnList = [
  "0x00000000000000000001",
 "0x00000000000000000001"
]


let pageSize = 10000;
let interval = 1000;

main(index, testUploadQuery, cursor, queruyCdcList, startLsnList, pageSize, interval);