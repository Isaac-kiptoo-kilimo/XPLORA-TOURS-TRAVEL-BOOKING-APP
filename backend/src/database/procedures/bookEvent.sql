CREATE OR ALTER PROCEDURE bookTour( @userID VARCHAR(100))
AS BEGIN
    UPDATE Users SET hasBooked = 1 WHERE userID = @userID
END

GO
CREATE OR ALTER PROCEDURE bookTour(
    @userID VARCHAR(100),
    @tourID VARCHAR(100)
)
AS
BEGIN
    
    IF EXISTS (SELECT 1 FROM Tours WHERE tourID= @project_id AND projectStatus = 'unassigned')
    BEGIN
      
        UPDATE projects
        SET projectStatus = 'assigned', user_id = @user_id
        WHERE project_id = @project_id;
        PRINT 'Project assigned successfully.';
    END
    ELSE
    BEGIN
        PRINT 'Project is already assigned or does not exist.';
    END
END
