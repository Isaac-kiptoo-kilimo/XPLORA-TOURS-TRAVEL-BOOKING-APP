CREATE OR ALTER PROCEDURE updateTour(
      @tourID VARCHAR(100),
      @name VARCHAR(200),
      @description VARCHAR(300),
      @destination VARCHAR (250),
      @price INT,
      @type VARCHAR(200),
      @startDate VARCHAR(200), 
      @endDate VARCHAR(200)
)
AS
BEGIN
	UPDATE Tours
	SET 
	name=@name,
	description=@description,
    destination=@destination,
    price=@price,
    type=@type,
	startDate=@startDate,
    endDate=@endDate
	
	WHERE tourID = @tourID ;
END;