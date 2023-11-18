CREATE OR ALTER PROCEDURE updateReview(
    @reviewID VARCHAR(100),
    @rating INT, 
    @comment VARCHAR(400)
)
AS BEGIN
    UPDATE Reviews SET rating = @rating, comment = @comment WHERE reviewID = @reviewID
END