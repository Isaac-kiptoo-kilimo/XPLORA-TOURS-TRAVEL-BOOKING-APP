CREATE OR ALTER PROCEDURE searchTourByType(
    @type VARCHAR(200)
)

AS 
BEGIN
    SELECT * FROM tours WHERE type = @type

END