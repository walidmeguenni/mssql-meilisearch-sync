const productCdcQuery = (
    start_lsn,
    pageSize
  ) => `SELECT TOP ${pageSize}
        [__$start_lsn]
        ,[__$operation]
        ,[ProductName]
        ,[Price]
        ,[UserID] AS id
    FROM [Test].[cdc].[dbo_Product_CT]
    WHERE [__$start_lsn] > ${start_lsn || 0}
    ORDER BY [__$start_lsn]
  `;
  
  module.exports = { productCdcQuery };