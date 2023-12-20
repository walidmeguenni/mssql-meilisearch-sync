export const cdcQuery =(start_lsn )=> `
SELECT TOP (1000) [__$start_lsn]
                ,[__$operation]
                ,[UserID] AS id
                ,[UserName]
                ,[Email]
                ,[DateOfBirth]
FROM [Test].[cdc].[dbo_User_CT]
WHERE [__$start_lsn] > ${start_lsn || 0}`;
