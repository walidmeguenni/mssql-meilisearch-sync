const { productCdcQuery, userCdcQuery, ProcessTimesCdcQuery, ResponsesCdcQuery } = require("./cdc");
const { testUploadQuery, adhocUploadQuery } = require( "./upload");

module.exports = { productCdcQuery, userCdcQuery, ProcessTimesCdcQuery, ResponsesCdcQuery, testUploadQuery, adhocUploadQuery };