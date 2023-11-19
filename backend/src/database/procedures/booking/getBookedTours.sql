CREATE OR ALTER PROCEDURE getBookedTours (@userID VARCHAR(100))
AS
BEGIN
    SELECT  * FROM Tours JOIN Bookings ON Tours.tourID = Bookings.tourID
    WHERE Bookings.userID = @userID;

END

DROP PROCEDURE getBookedTours
GO
-- CREATE OR ALTER PROCEDURE getBookedTours (@userID VARCHAR(100))
-- AS
-- BEGIN
--     SELECT * FROM Tours WHERE tourID IN (SELECT tourID FROM Users WHERE userID = userID AND hasBooked = 1)
-- END
