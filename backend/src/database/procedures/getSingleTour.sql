CREATE OR ALTER PROCEDURE getSingleTour (@tourID VARCHAR(100))

AS BEGIN

  SELECT *  FROM Tours  WHERE tourID = @tourID;

END;


