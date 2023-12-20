import { cdc, cursorUpload, init } from "./core/index.js";

const main = async (index, interval,  start_lsn) => {
  try {
    await init(index);
    await cursorUpload(index);
    await cdc(index, interval,  start_lsn);
  } catch (error) {
    console.log("mssql meilisearch :", error);
  }
};
let start_lsn = "0x00000000000000000001";
main("User", 1000, start_lsn);
