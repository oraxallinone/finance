-- Create table tblBirthday
IF OBJECT_ID('dbo.tblBirthday', 'U') IS NULL
BEGIN
    CREATE TABLE dbo.tblBirthday (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        Name NVARCHAR(200) NOT NULL,
        DateOfBirth DATE NOT NULL,
        IsActive BIT NOT NULL DEFAULT(1)
    );
END
GO

-- Stored procedure to insert if not duplicate
IF OBJECT_ID('dbo.sp_birthdayTracker', 'P') IS NOT NULL
    DROP PROCEDURE dbo.sp_birthdayTracker;
GO
CREATE PROCEDURE dbo.sp_birthdayTracker
    @Name NVARCHAR(200),
    @DateOfBirth DATE,
    @IsActive BIT = 1
AS
BEGIN
    SET NOCOUNT ON;

    -- basic validation
    IF LTRIM(RTRIM(ISNULL(@Name, ''))) = ''
    BEGIN
        RAISERROR('Name is required', 16, 1);
        RETURN;
    END

    IF @DateOfBirth IS NULL
    BEGIN
        RAISERROR('DateOfBirth is required', 16, 1);
        RETURN;
    END

    -- check duplicate (same name and same date)
    IF EXISTS (SELECT 1 FROM dbo.tblBirthday WHERE Name = @Name AND DateOfBirth = @DateOfBirth)
    BEGIN
        RAISERROR('Duplicate record exists', 16, 1);
        RETURN;
    END

    INSERT INTO dbo.tblBirthday (Name, DateOfBirth, IsActive)
    VALUES (@Name, @DateOfBirth, @IsActive);

    SELECT SCOPE_IDENTITY() AS NewId;
END
GO

-- Helper: get all birthdays
IF OBJECT_ID('dbo.sp_getAllBirthdays', 'P') IS NOT NULL
    DROP PROCEDURE dbo.sp_getAllBirthdays;
GO
CREATE PROCEDURE dbo.sp_getAllBirthdays
AS
BEGIN
    SET NOCOUNT ON;
    SELECT Id, Name, DateOfBirth, IsActive FROM dbo.tblBirthday ORDER BY DateOfBirth, Name;
END
GO

-- Helper: get birthdays for a month (repeat annually)
IF OBJECT_ID('dbo.sp_getBirthdaysByMonth', 'P') IS NOT NULL
    DROP PROCEDURE dbo.sp_getBirthdaysByMonth;
GO
CREATE PROCEDURE dbo.sp_getBirthdaysByMonth
    @Year INT,
    @Month INT
AS
BEGIN
    SET NOCOUNT ON;

    -- Return birthdays that occur in the requested month, ignoring the year so birthdays recur every year.
    -- Only return active birthdays.
    SELECT Id, Name, DateOfBirth, IsActive
    FROM dbo.tblBirthday
    WHERE IsActive = 1 AND MONTH(DateOfBirth) = @Month
    ORDER BY DAY(DateOfBirth), Name;
END
GO