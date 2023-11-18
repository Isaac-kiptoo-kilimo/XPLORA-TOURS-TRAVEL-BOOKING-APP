
CREATE OR ALTER PROCEDURE createReviewTour (
@reviewID VARCHAR(100),
@userID VARCHAR(100),
@tourID VARCHAR(100),
@rating INT,
@comment VARCHAR(400)
)
AS BEGIN
    INSERT INTO Reviews (reviewID, userID, tourID,rating,comment)
    VALUES (@reviewID, @userID, @tourID,@rating,@comment);
END
