
CREATE OR ALTER PROCEDURE getSingleUser(
    @userID	varchar(100)
)

AS
BEGIN
	SELECT	userID,
			email,
			fullName,
			role
		
	from	Users where userID= @userID
END

