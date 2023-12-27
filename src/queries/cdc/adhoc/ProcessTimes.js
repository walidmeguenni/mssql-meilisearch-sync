const ProcessTimesCdcQuery = (
    start_lsn,
    pageSize
) => `SELECT TOP ${pageSize} SELECT TOP (1000)
      [__$start_lsn],
      [__$operation],
      [ResponseOID] as id,
      [CreationTime]  AS ProcessTimes_CreationTime,
      [Dispatch],
      [Disposition],
      [Completion],
      [__$command_id]
  FROM [Adhoc].[cdc].[dbo_ProcessTimes_CT]
  WHERE [__$start_lsn] > ${start_lsn || 0};
  ORDER BY [__$start_lsn]
  `;

module.exports = { ProcessTimesCdcQuery };