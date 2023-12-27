const ResponsesCdcQuery = (
  start_lsn,
  pageSize
) => `SELECT TOP ${pageSize} 
    SELECT TOP (1000)
    [__$start_lsn],
    [__$operation],
    [OID] as id,
    [SequenceNumber],
    [Type],
    [Priority],
    [HandlingResource],
    [Zone],
    [AgencyName],
    [DispatchGroup],
    [IncidentNumber],
    [PrimaryResponse],
    [DispatcherDisplayName],
    [DispatcherLogonName],
    [CreationTime],
    [CreationDate],
    [ClassificationName],
    [StatusTime],
    [IncidentCreationTime],
    [ResponseLocation],
    [RespAlarmLevel],
    [PrimaryResource],
    [MilestoneName],
    [OriginName],
    [PersonCount],
    [Status],
    [ImportDateTime],
    [ResponseTypeCategory],
FROM [Adhoc].[cdc].[dbo_Responses_CT] 
WHERE [__$start_lsn] > ${start_lsn || 0}
ORDER BY [__$start_lsn]
`;
module.exports = { ResponsesCdcQuery };