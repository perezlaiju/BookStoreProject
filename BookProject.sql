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
DROP FUNCTION IF EXISTS calcOrderTotalDiscount
GO

--BASIC TABLES User, Category, Book, Coupon


CREATE TABLE [User](
	Id INT IDENTITY(1,1) PRIMARY KEY,
	Username VARCHAR(30) UNIQUE NOT NULL,
	[Password] VARCHAR(255) NOT NULL,
	[Role] CHAR DEFAULT 'C' NOT NULL,
	[STATUS] BIT DEFAULT 0 NOT NULL,
	CreatedAt DATETIMEOFFSET default SYSUTCDATETIME(),
	LastLoginAt DATETIMEOFFSET
	)


CREATE TABLE Category(
	Id INT IDENTITY(1,1) PRIMARY KEY,
	[Name] VARCHAR(255) NOT NULL,
	[Description] NTEXT,
	[Image] IMAGE,
	[STATUS] BIT DEFAULT 0 NOT NULL,
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
	Price SMALLMONEY,
	[STATUS] BIT DEFAULT 0 NOT NULL,
	Position INT,
	CreatedAt DATETIMEOFFSET default SYSUTCDATETIME()
	)

CREATE TABLE Coupon(
	Id INT IDENTITY(1,1) PRIMARY KEY,
	Code VARCHAR(255) NOT NULL,
	DiscountPercentage FLOAT DEFAULT 0,
	DiscountValue FLOAT DEFAULT 0,
	MinOrderValue FLOAT DEFAULT 0,
	IsClubbable BIT DEFAULT 0,
	[STATUS] BIT DEFAULT 0 NOT NULL,
	CreatedAt DATETIMEOFFSET default SYSUTCDATETIME()
	)
GO

CREATE TABLE WishList(
	UserId INT FOREIGN KEY REFERENCES [User],
	Bookid INT FOREIGN KEY REFERENCES Book,
	CONSTRAINT  pkWishList PRIMARY KEY (UserId, BookId)
	);


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
	)

CREATE TABLE OrderCoupon (
	Id INT IDENTITY(1,1) PRIMARY KEY,
	OrderId INT NOT NULL FOREIGN KEY REFERENCES [Order](Id),
	CouponId INT NOT NULL FOREIGN KEY REFERENCES Coupon(Id),
	[STATUS] CHAR DEFAULT 'V' NOT NULL,
	CreatedAt DATETIMEOFFSET default SYSUTCDATETIME(),
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

CREATE FUNCTION calcOrderTotalDiscount(@order_id INT)
	RETURNS SMALLMONEY
	AS
	BEGIN
		DECLARE @total_discount SMALLMONEY
		SELECT @total_discount = C.DiscountPercentage * dbo.calcOrderTotalValue(@order_id) FROM [Order] AS O , OrderCoupon AS OC ,Coupon AS C WHERE OC.OrderId = @order_id AND O.Id = @order_id AND OC.CouponId = C.Id
		RETURN @total_discount
	END
GO

ALTER TABLE [Order]
	ADD TotalValue AS dbo.calcOrderTotalValue(Id),
	TotalDiscount AS dbo.calcOrderTotalDiscount(Id),
	NetPrice AS dbo.calcOrderTotalValue(Id) - dbo.calcOrderTotalDiscount(Id);
GO

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
INSERT INTO Coupon VALUES ('FLAT50',0.5,NULL,NULL,1,1,getdate());

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
INSERT INTO OrderCoupon VALUES(1,1,'V',getdate());
SELECT * FROM OrderCoupon;
