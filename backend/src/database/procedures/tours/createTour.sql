CREATE OR ALTER PROCEDURE createTours(
      @tourID VARCHAR(100),
      @name VARCHAR(200),
      @description VARCHAR(300),
      @destination VARCHAR (250),
      @price INT,
      @type VARCHAR(200),
      @startDate VARCHAR(200), 
      @endDate VARCHAR(200)
     
)
AS BEGIN
    INSERT INTO Tours(tourID,name,description,destination,price,type,startDate,endDate)
     VALUES(@tourID,@name,@description,@destination,@price,@type,@startDate,@endDate)

END

