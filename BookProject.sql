DROP DATABASE IF EXISTS BookStoreDB
CREATE DATABASE BookStoreDB
GO

USE BookStoreDB

DROP TABLE IF EXISTS WishList
DROP TABLE IF EXISTS OrderCoupon
DROP TABLE IF EXISTS OrderItem
DROP TABLE IF EXISTS [Order]
DROP TABLE IF EXISTS Coupon
DROP TABLE IF EXISTS Book
DROP TABLE IF EXISTS Category
DROP TABLE IF EXISTS [User]
DROP FUNCTION IF EXISTS calcOrderTotalValue
DROP FUNCTION IF EXISTS validateOrderCoupon
DROP FUNCTION IF EXISTS calcOrderTotalDiscount
GO

--BASIC TABLES User, Category, Book, Coupon

--User : Role(Customer/Admin), Status(Active,InActive)
CREATE TABLE [User](
	Id INT IDENTITY(1,1) PRIMARY KEY,
	Username VARCHAR(30) UNIQUE NOT NULL,
	[Password] VARCHAR(255) NOT NULL,
	[Role] CHAR DEFAULT 'C' NOT NULL,
	[Status] Char DEFAULT 'I' NOT NULL,
	CreatedAt DATETIMEOFFSET default SYSUTCDATETIME(),
	LastLoginAt DATETIMEOFFSET
	)

CREATE TABLE Category(
	Id INT IDENTITY(1,1) PRIMARY KEY,
	[Name] VARCHAR(255) NOT NULL,
	[Description] NTEXT,
	[Image] IMAGE,
	[Status] Char DEFAULT 'I' NOT NULL,
	Position INT,
	CreatedAt DATETIMEOFFSET default SYSUTCDATETIME()
	)

CREATE TABLE Book(
	Id INT IDENTITY(1,1) PRIMARY KEY,
	CategoryId INT NOT NULL FOREIGN KEY REFERENCES Category(Id),
	Title VARCHAR(255) NOT NULL,
	Author VARCHAR(50) NOT NULL,
	ISBN VARCHAR(11),
	[Year] SMALLINT,
	Price SMALLMONEY NOT NULL,
	[Status] Char DEFAULT 'I' NOT NULL,
	Position INT,
	CreatedAt DATETIMEOFFSET default SYSUTCDATETIME()
	)

CREATE TABLE Coupon(
	Id INT IDENTITY(1,1) PRIMARY KEY,
	Code VARCHAR(255) NOT NULL,
	DiscountPercentage FLOAT DEFAULT 0 NOT NULL,
	DiscountValue FLOAT DEFAULT 0 NOT NULL,
	MinOrderValue FLOAT DEFAULT 0 NOT NULL,
	IsClubbable BIT DEFAULT 0 NOT NULL,
	[Status] Char DEFAULT 'I' NOT NULL,
	CreatedAt DATETIMEOFFSET default SYSUTCDATETIME()
	)
GO

--Order Related Tables Order, OrderItem, OrderCoupon

CREATE TABLE [Order](
	Id INT IDENTITY(1,1) PRIMARY KEY,
	UserId INT NOT NULL FOREIGN KEY REFERENCES [User](Id),
	DeliveryAddress NTEXT NOT NULL,
	[STATUS] CHAR DEFAULT 'P' NOT NULL,
	CreatedAt DATETIMEOFFSET default SYSUTCDATETIME(),
	)

CREATE TABLE OrderItem (
	Id INT IDENTITY(1,1) PRIMARY KEY,
	OrderId INT NOT NULL FOREIGN KEY REFERENCES [Order](Id),
	BookId INT NOT NULL FOREIGN KEY REFERENCES Book(Id),
	Quantity SMALLINT DEFAULT 1,
	CreatedAt DATETIMEOFFSET default SYSUTCDATETIME(),
	CONSTRAINT ItemRepeat UNIQUE(OrderId,BookId)
	)

CREATE TABLE OrderCoupon (
	Id INT IDENTITY(1,1) PRIMARY KEY,
	OrderId INT NOT NULL FOREIGN KEY REFERENCES [Order](Id),
	CouponId INT NOT NULL FOREIGN KEY REFERENCES Coupon(Id),
	CreatedAt DATETIMEOFFSET default SYSUTCDATETIME(),
	CONSTRAINT CouponRepeat UNIQUE(OrderId,CouponId)

	)
GO

CREATE FUNCTION calcOrderTotalValue(@order_id INT)
	RETURNS SMALLMONEY
	AS
	BEGIN
		DECLARE @total_value SMALLMONEY
		SELECT @total_value = SUM(OI.Quantity * B.Price) FROM OrderItem AS OI, Book AS B WHERE OI.OrderId = @order_id AND OI.BookId = B.Id
		RETURN @total_value
	END
GO

CREATE FUNCTION validateOrderCoupon(@id INT)
	RETURNS CHAR
	AS
	BEGIN
		DECLARE @status CHAR
		SELECT @status = CASE WHEN(dbo.calcOrderTotalValue(O.Id)>=C.MinOrderValue)
		THEN 'V'
		ELSE 'I'
		END
		FROM OrderCoupon AS OC, [Order] AS O, Coupon as C WHERE OC.Id = @id AND OC.OrderId = O.Id AND OC.CouponId = C.Id
		RETURN @status
	END
GO

CREATE FUNCTION calcOrderTotalDiscount(@order_id INT)
	RETURNS SMALLMONEY
	AS
	BEGIN
		DECLARE @maximum_single_discount SMALLMONEY, @total_clubbable_discount SMALLMONEY, @maximum_discount SMALLMONEY, @order_value SMALLMONEY
		SET @order_value = dbo.calcOrderTotalValue(@order_id)

		SELECT @maximum_single_discount = MAX(Discount)
		FROM(SELECT 
			CASE WHEN(C.DiscountValue!=0 AND (C.DiscountPercentage=0 OR (C.DiscountPercentage * @order_value)>C.DiscountValue))
			THEN C.DiscountValue
			ELSE (C.DiscountPercentage * @order_value ) 
			END AS Discount
			FROM OrderCoupon as OC, Coupon AS C WHERE OC.OrderId = @order_id AND OC.CouponId = C.Id AND C.MinOrderValue<=@order_value) a

		SELECT @total_clubbable_discount = SUM(Discount)
		FROM(SELECT 
			CASE WHEN(C.DiscountPercentage=0 OR (C.DiscountPercentage * @order_value)>C.DiscountValue)
			THEN C.DiscountValue
			ELSE (C.DiscountPercentage * @order_value ) 
			END AS Discount
			FROM OrderCoupon as OC, Coupon AS C WHERE OC.OrderId = @order_id AND OC.CouponId = C.Id AND C.MinOrderValue<=@order_value AND C.IsClubbable = 1) a

		SELECT @maximum_discount = MAX(Discount)
		FROM (VALUES (@maximum_single_discount),(@total_clubbable_discount),(0))
		AS a(Discount)
		RETURN @maximum_discount
	END
GO

ALTER TABLE OrderCoupon
	ADD [Status] AS dbo.validateOrderCoupon(Id)
GO

ALTER TABLE [Order]
	ADD TotalValue AS dbo.calcOrderTotalValue(Id),
	TotalDiscount AS dbo.calcOrderTotalDiscount(Id),
	NetPrice AS dbo.calcOrderTotalValue(Id) - dbo.calcOrderTotalDiscount(Id);
GO

--CART And WishLIst Related Tables

--Insert Commands

--INSERT INTO Category VALUES('Name','Desc',image,status,position,GETDATE());
INSERT INTO Category VALUES('Sci-Fi','Category desc',null,1,null,GETDATE());
INSERT INTO Category VALUES('Drama','Category desc',null,1,null,GETDATE());
INSERT INTO Category VALUES('Horror','Category desc',null,1,null,GETDATE());
SELECT * FROM Category;

--INSERT INTO Book VALUES(CategoryID,titkle,'Author','ISBN',Year,PRice,Status,osition,GETDATE() );
INSERT INTO Book VALUES(1,'Artemis Fowl','Eon','asd123',2007,400,1,null,GETDATE() );
INSERT INTO Book VALUES(1,'Artemis Fowl 2','Eon','asd123',2007,400,1,null,GETDATE() );
INSERT INTO Book VALUES(2,'Shoe Dog','Eon','asd123',2007,400,1,null,GETDATE() );
INSERT INTO Book VALUES(3,'Goosebumps','Eon','asd123',2007,400,1,null,GETDATE() );
INSERT INTO Book VALUES(1,'Harry Potter','Eon','asd123',2007,400,1,null,GETDATE() );
SELECT * FROM Book;

--INSERT INTO [User] VALUES ('username','userpassword','Role',status,getdate(),lastlogin)
INSERT INTO [User] VALUES ('admin','admin','A',1,getdate(),null)
INSERT INTO [User] VALUES ('user','user','C',1,getdate(),null)
SELECT * FROM [User];

--INSERT INTO Coupon VALUES ('code',percentage,value,minOrder,ClubbableBit,StatusBit,getdate());
INSERT INTO Coupon VALUES ('FLAT50',0.5,NULL,0,1,1,getdate());
SELECT * FROM Coupon

--INSERT INTO WishList VALUES(UID,BID);
INSERT INTO WishList VALUES(1,1);

--INSERT INTO [Order] VALUES (UID,'Addr',StatusChar,getdate());
INSERT INTO [Order] VALUES (2,'Order Addr','P',getdate());
SELECT * FROM [Order];

--INSERT INTO OrderItem VALUES (OID,BID,Qty,getdate());
INSERT INTO OrderItem VALUES (1,1,10,getdate());
INSERT INTO OrderItem VALUES (1,3,3,getdate());
SELECT * FROM OrderItem;

--INSERT INTO OrderCoupon VALUES(OID,COUPONID,StatusChar,getdate());
INSERT INTO OrderCoupon VALUES(1,3,getdate());
SELECT * FROM OrderCoupon;