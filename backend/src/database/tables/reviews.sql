CREATE TABLE Reviews (
    reviewID VARCHAR(100),
    userID VARCHAR(100),
    tourID VARCHAR(100),
    rating INT NOT NULL,
    comment VARCHAR(400) NOT NULL,
    FOREIGN KEY (userID) REFERENCES Users(userID),
    FOREIGN KEY (tourID) REFERENCES Tours(tourID)
);

SELECT * FROM Reviews;
DROP TABLE Reviews