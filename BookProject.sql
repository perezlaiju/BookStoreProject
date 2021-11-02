DROP DATABASE IF EXISTS BookStoreDB
CREATE DATABASE BookStoreDB
GO

USE BookStoreDB

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
    --To be completed
    RETURN 0
END
GO

ALTER TABLE [Order]
ADD TotalValue AS dbo.calcOrderTotalValue(Id),
TotalDiscount AS dbo.calcOrderTotalDiscount(Id),
NetPrice AS dbo.calcOrderTotalValue(Id) - dbo.calcOrderTotalDiscount(Id);





