export const cursorQuery = (
  cursor,
  pageSize
) => `SELECT Top ${pageSize} [UserID] as id,
                              UserName, 
                              Email, 
                              DateOfBirth
                              FROM [Test].[dbo].[User]
                              WHERE UserID > ${cursor}
                              ORDER BY UserID
  `;
