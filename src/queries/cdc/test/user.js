const userCdcQuery = (start_lsn, pageSize) => `
SELECT TOP ${pageSize} [__$start_lsn]
                ,[__$operation]
                ,[UserID] AS id
                ,[UserName]
                ,[Email]
                ,[DateOfBirth]
FROM [Test].[cdc].[dbo_User_CT]
WHERE [__$start_lsn] > ${start_lsn || 0}
ORDER BY [__$start_lsn]`;

module.exports = { userCdcQuery };