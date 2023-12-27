const { ProcessTimesCdcQuery, ResponsesCdcQuery} = require('./adhoc');
const { productCdcQuery, userCdcQuery } = require('./test');

module.exports = { productCdcQuery, userCdcQuery, ProcessTimesCdcQuery, ResponsesCdcQuery };