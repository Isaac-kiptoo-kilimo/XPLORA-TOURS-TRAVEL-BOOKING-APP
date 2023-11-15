-- CREATE OR ALTER PROCEDURE bookingTour (
-- @bookingID VARCHAR(100),
-- @userID VARCHAR(100),
-- @tourID VARCHAR(100)
-- )
-- AS BEGIN
--     INSERT INTO Bookings (bookingID, userID, tourID)
--     VALUES (@bookingID, @userID, @tourID);
-- END

GO

CREATE OR ALTER PROCEDURE bookingTour (
@bookingID VARCHAR(100),
@userID VARCHAR(100),
@tourID VARCHAR(100)
)
AS BEGIN
    INSERT INTO Bookings (bookingID, userID, tourID)
    VALUES (@bookingID, @userID, @tourID);
END

