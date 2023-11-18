CREATE OR ALTER PROCEDURE getReviewsByUserAndTour(
    @userID VARCHAR(100),
    @tourID VARCHAR(100)
)
AS 
BEGIN
    SELECT * FROM Reviews WHERE userID = @userID AND tourID = @tourID;
END
