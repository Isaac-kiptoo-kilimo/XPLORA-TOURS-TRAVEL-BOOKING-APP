CREATE OR ALTER PROCEDURE getReviewById(
    @reviewID VARCHAR(250)
)
AS
BEGIN
    SELECT  *  FROM Reviews WHERE reviewID=@reviewID;
END
