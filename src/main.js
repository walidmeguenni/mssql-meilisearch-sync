import { cdc, cursorUpload, init } from "./core/index.js";
import { AdhocCdcQuery, adhocUploadQuery } from "./queries/index.js";

const main = async ( index, queruyUpload, cursor, queruyCdc, startLsnList , operationList, pageSize,  interval ) => {
  try {
    await init(index);
    await cursorUpload(index, queruyUpload, cursor, pageSize);
    await cdc(index, queruyCdc, startLsnList, operationList, pageSize, interval);
  } catch (error) {
    console.log("mssql meilisearch :", error);
  }
};

let index = "Adhoc";
let cursor = 0;

let startLsnList = {
  Response_start_lsn,
  ProcessTimes_start_lsn,
}

let operationList = {
  Response_operation,
  ProcessTimes_operation,
}

let pageSize = 10000;
let interval = 1000;

main(index, adhocUploadQuery , cursor, AdhocCdcQuery, startLsnList,operationList, pageSize, interval);