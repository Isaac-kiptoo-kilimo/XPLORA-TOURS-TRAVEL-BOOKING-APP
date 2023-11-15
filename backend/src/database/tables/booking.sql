CREATE TABLE Bookings (
    bookingID VARCHAR(100) PRIMARY KEY,
    userID VARCHAR(100),
    tourID VARCHAR(100),
    FOREIGN KEY (userID) REFERENCES Users(userID),
    FOREIGN KEY (tourID) REFERENCES Tours(tourID),
    bookingDate DATETIME DEFAULT GETDATE(),
    CONSTRAINT UC_Bookings UNIQUE (userID, tourID)
);
