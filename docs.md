EXEC sys.sp_cdc_enable_db;
EXEC sys.sp_cdc_enable_table
@source_schema = 'dbo',
@source_name = 'User',
@role_name = 'cdc_Admin',
@supports_net_changes = 1;
GO
CREATE TABLE [User] (
UserID INT IDENTITY(1,1) PRIMARY KEY,
UserName NVARCHAR(50),
Email NVARCHAR(100),
DateOfBirth DATE
);
SELECT TOP (1000) [__$start_lsn]
,[__$end_lsn]
,[__$seqval]
,[__$operation]
,[__$update_mask]
,[UserID]
,[UserName]
,[Email]
,[DateOfBirth]
,[__$command_id]
FROM [Test].[cdc].[dbo_User_CT]
DELETE FROM [User]
WHERE UserID = '1';
INSERT INTO [User] (UserName, Email, DateOfBirth)
VALUES ('Bob', 'bob@example.com', '1990-08-15');
