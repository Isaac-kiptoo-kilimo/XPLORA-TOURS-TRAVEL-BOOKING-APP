CREATE PROCEDURE deleteReview(@reviewID VARCHAR(100))

AS BEGIN
  DELETE  FROM Reviews  WHERE reviewID = @reviewID;
END;

DROP PROCEDURE IF EXISTS deleteReview;

