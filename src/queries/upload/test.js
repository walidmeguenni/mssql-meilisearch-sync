const testUploadQuery = (
  cursor,
  pageSize
) => `SELECT Top ${pageSize}  u.UserID as id,
                                u.UserName, 
                                u.Email, 
                                u.DateOfBirth,
                                p.ProductName,
                                p.Price
                                FROM [Test].[dbo].[User] u
                                LEFT JOIN [Test].[dbo].[Product] p ON u.UserID = p.UserID
                                WHERE u.UserID > ${cursor}
                                ORDER BY u.UserID
`;

module.exports = { testUploadQuery };