-- CreateTable
CREATE TABLE `category` (
    `CategoryID` INTEGER NOT NULL,
    `CategoryName` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `CategoryName_UNIQUE`(`CategoryName`),
    PRIMARY KEY (`CategoryID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `discount` (
    `DiscountID` INTEGER NOT NULL,
    `DiscountCode` VARCHAR(20) NOT NULL,
    `DiscountPercentage` DECIMAL(3, 2) NOT NULL,
    `ValidFrom` DATE NOT NULL,
    `ValidTo` DATE NOT NULL,
    `MinPurchaseAmount` DECIMAL(10, 2) NOT NULL,
    `AppliesTo` VARCHAR(50) NOT NULL,
    `AppliesToID` INTEGER NOT NULL,

    INDEX `Applies To`(`AppliesToID`),
    PRIMARY KEY (`DiscountID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `inventory` (
    `InventoryID` INTEGER NOT NULL,
    `ProductID` INTEGER NOT NULL,
    `SupplierID` INTEGER NOT NULL,
    `Quantity` INTEGER NOT NULL,
    `DateStocked` DATE NOT NULL,
    `ExpiryDate` DATE NOT NULL,
    `CostPrice` DECIMAL(10, 2) NOT NULL,
    `Manufacturer` VARCHAR(255) NOT NULL,
    `BatchNumber` VARCHAR(50) NOT NULL,
    `AdditionalDetails` TEXT NOT NULL,

    INDEX `inventory_ibfk_1`(`ProductID`),
    INDEX `inventory_ibfk_2`(`SupplierID`),
    PRIMARY KEY (`InventoryID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `listing` (
    `ListingID` INTEGER NOT NULL,
    `ProductID` INTEGER NOT NULL,
    `SuppliedBy` INTEGER NOT NULL,
    `Price` DECIMAL(10, 2) NOT NULL,
    `QuantityAvailable` INTEGER NOT NULL,
    `ListingDate` DATE NOT NULL,
    `PCondition` VARCHAR(20) NOT NULL,
    `PDescription` TEXT NOT NULL,
    `PStatus` VARCHAR(20) NOT NULL,

    INDEX `listing_ibfk_1`(`ProductID`),
    INDEX `listing_ibfk_2_idx`(`SuppliedBy`),
    PRIMARY KEY (`ListingID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `orderitem` (
    `OrderItemID` INTEGER NOT NULL,
    `OrderID` INTEGER NOT NULL,
    `ProductID` INTEGER NOT NULL,
    `Quantity` INTEGER NOT NULL,
    `PricePerUnit` DECIMAL(10, 2) NOT NULL,

    INDEX `contains_idx`(`OrderID`),
    INDEX `contains_idx1`(`ProductID`),
    PRIMARY KEY (`OrderItemID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `orders` (
    `OrderID` INTEGER NOT NULL,
    `UserID` INTEGER NOT NULL,
    `OrderDate` DATE NOT NULL,
    `TotalAmount` DECIMAL(10, 2) NOT NULL,
    `OrderStatus` VARCHAR(255) NOT NULL,

    INDEX `contains_idx`(`UserID`),
    PRIMARY KEY (`OrderID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `payment` (
    `PaymentID` INTEGER NOT NULL,
    `OrderID` INTEGER NOT NULL,
    `PaymentDate` DATE NOT NULL,
    `PaymentAmount` DECIMAL(10, 2) NOT NULL,
    `PaymentMethod` VARCHAR(255) NOT NULL,
    `PaymentStatus` VARCHAR(255) NOT NULL,

    INDEX `has_idx`(`OrderID`),
    PRIMARY KEY (`PaymentID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `product` (
    `ProductID` INTEGER NOT NULL,
    `CategoryID` INTEGER NOT NULL,
    `ProductName` VARCHAR(255) NOT NULL,
    `ProductDesc` VARCHAR(255) NOT NULL,
    `Price` DECIMAL(10, 2) NOT NULL,
    `StockQuantity` INTEGER NOT NULL,
    `ExpirationDate` DATE NOT NULL,
    `NutritionValues` VARCHAR(255) NOT NULL,

    UNIQUE INDEX `ProductName_UNIQUE`(`ProductName`),
    INDEX `belong_idx`(`CategoryID`),
    PRIMARY KEY (`ProductID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `recipe` (
    `RecipeID` INTEGER NOT NULL,
    `CreatorID` INTEGER NOT NULL,
    `RecipeName` VARCHAR(255) NOT NULL,
    `RDescription` TEXT NOT NULL,
    `PrepTime` TIME(0) NOT NULL,
    `Instructions` TEXT NOT NULL,
    `DifficultyLevel` VARCHAR(20) NOT NULL,
    `ServingSize` VARCHAR(45) NOT NULL,

    UNIQUE INDEX `RecipeName_UNIQUE`(`RecipeName`),
    INDEX `made by_idx`(`CreatorID`),
    PRIMARY KEY (`RecipeID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `reports` (
    `ReportID` INTEGER NOT NULL,
    `TopSellingProductID` INTEGER NOT NULL,
    `ReportDate` DATE NOT NULL,
    `SalesTotal` DECIMAL(10, 2) NOT NULL,
    `NumOrders` INTEGER NOT NULL,
    `NumProductsSold` INTEGER NOT NULL,
    `NumCustomers` INTEGER NOT NULL,
    `ReportFrom` DATE NOT NULL,
    `ReportTo` DATE NOT NULL,

    INDEX `reports_ibfk_1`(`TopSellingProductID`),
    PRIMARY KEY (`ReportID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `review` (
    `ReviewID` INTEGER NOT NULL,
    `UserID` INTEGER NOT NULL,
    `ProductID` INTEGER NOT NULL,
    `ReviewText` VARCHAR(255) NOT NULL,
    `ReviewDate` DATE NOT NULL,
    `Rating` VARCHAR(45) NULL,

    INDEX `contains_idx`(`UserID`),
    INDEX `review_ibfk_2`(`ProductID`),
    PRIMARY KEY (`ReviewID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `sales` (
    `SalesID` INTEGER NOT NULL,
    `OrderID` INTEGER NOT NULL,
    `ProductID` INTEGER NOT NULL,
    `QuantitySold` INTEGER NOT NULL,
    `SalePrice` DECIMAL(10, 2) NOT NULL,
    `SaleDate` DATETIME(0) NOT NULL,
    `DiscountApply` DECIMAL(3, 2) NOT NULL,

    INDEX `sales_ibfk_1`(`OrderID`),
    INDEX `sales_ibfk_2`(`ProductID`),
    PRIMARY KEY (`SalesID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `shoppingcart` (
    `CartID` INTEGER NOT NULL,
    `UserID` INTEGER NOT NULL,
    `ProductID` INTEGER NOT NULL,
    `Quantity` INTEGER NOT NULL,
    `AddedDate` DATE NOT NULL,
    `TotalPrice` DECIMAL(10, 2) NOT NULL,

    INDEX `contains_idx`(`ProductID`),
    INDEX `shoppingcart_ibfk_1`(`UserID`),
    PRIMARY KEY (`CartID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `supplier` (
    `SupplierID` INTEGER NOT NULL,
    `SupplierName` VARCHAR(100) NOT NULL,
    `ContactPerson` VARCHAR(100) NOT NULL,
    `ContactNumber` VARCHAR(10) NOT NULL,
    `Email` VARCHAR(100) NOT NULL,
    `Address` VARCHAR(255) NOT NULL,
    `City` VARCHAR(45) NOT NULL,
    `PaymentTerms` VARCHAR(50) NOT NULL,

    PRIMARY KEY (`SupplierID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `supplies` (
    `SupplierID` INTEGER NOT NULL,
    `ProductID` INTEGER NOT NULL,
    `PurchasedPrice` DECIMAL(10, 2) NOT NULL,
    `DeliveryPeriod` TIME(0) NOT NULL,

    INDEX `ProductID`(`ProductID`),
    PRIMARY KEY (`SupplierID`, `ProductID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `users` (
    `UserID` INTEGER NOT NULL,
    `ManagerID` INTEGER NOT NULL,
    `EmployeeID` INTEGER NOT NULL,
    `Username` VARCHAR(50) NOT NULL,
    `Password` VARCHAR(255) NOT NULL,
    `Email` VARCHAR(100) NOT NULL,
    `FirstName` VARCHAR(100) NOT NULL,
    `LastName` VARCHAR(100) NOT NULL,
    `Address` VARCHAR(255) NOT NULL,
    `PhoneNumber` VARCHAR(20) NOT NULL,
    `UserType` ENUM('Customer', 'Employee', 'Manager') NOT NULL,
    `HireDate` DATE NOT NULL,
    `Salary` DECIMAL(10, 2) NOT NULL,

    UNIQUE INDEX `Username_UNIQUE`(`Username`),
    INDEX `EmployeeID`(`EmployeeID`),
    INDEX `ManagerID`(`ManagerID`),
    PRIMARY KEY (`UserID`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `discount` ADD CONSTRAINT `Applies To` FOREIGN KEY (`AppliesToID`) REFERENCES `orders`(`OrderID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `inventory` ADD CONSTRAINT `inventory_ibfk_1` FOREIGN KEY (`ProductID`) REFERENCES `product`(`ProductID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `inventory` ADD CONSTRAINT `inventory_ibfk_2` FOREIGN KEY (`SupplierID`) REFERENCES `supplier`(`SupplierID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `listing` ADD CONSTRAINT `listing_ibfk_1` FOREIGN KEY (`ProductID`) REFERENCES `product`(`ProductID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `listing` ADD CONSTRAINT `listing_ibfk_2` FOREIGN KEY (`SuppliedBy`) REFERENCES `supplier`(`SupplierID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `orderitem` ADD CONSTRAINT `orderitem_ibfk_1` FOREIGN KEY (`OrderID`) REFERENCES `orders`(`OrderID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `orderitem` ADD CONSTRAINT `orderitem_ibfk_2` FOREIGN KEY (`ProductID`) REFERENCES `product`(`ProductID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `orders` ADD CONSTRAINT `contains` FOREIGN KEY (`UserID`) REFERENCES `users`(`UserID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `payment` ADD CONSTRAINT `has` FOREIGN KEY (`OrderID`) REFERENCES `orders`(`OrderID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `product` ADD CONSTRAINT `belong` FOREIGN KEY (`CategoryID`) REFERENCES `category`(`CategoryID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `recipe` ADD CONSTRAINT `made by` FOREIGN KEY (`CreatorID`) REFERENCES `users`(`UserID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `reports` ADD CONSTRAINT `reports_ibfk_1` FOREIGN KEY (`TopSellingProductID`) REFERENCES `product`(`ProductID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `review` ADD CONSTRAINT `review_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `users`(`UserID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `review` ADD CONSTRAINT `review_ibfk_2` FOREIGN KEY (`ProductID`) REFERENCES `product`(`ProductID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `sales` ADD CONSTRAINT `sales_ibfk_1` FOREIGN KEY (`OrderID`) REFERENCES `orders`(`OrderID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `sales` ADD CONSTRAINT `sales_ibfk_2` FOREIGN KEY (`ProductID`) REFERENCES `product`(`ProductID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `shoppingcart` ADD CONSTRAINT `shoppingcart_ibfk_1` FOREIGN KEY (`UserID`) REFERENCES `users`(`UserID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `shoppingcart` ADD CONSTRAINT `shoppingcart_ibfk_2` FOREIGN KEY (`ProductID`) REFERENCES `product`(`ProductID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `supplies` ADD CONSTRAINT `supplies_ibfk_1` FOREIGN KEY (`SupplierID`) REFERENCES `supplier`(`SupplierID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `supplies` ADD CONSTRAINT `supplies_ibfk_2` FOREIGN KEY (`ProductID`) REFERENCES `product`(`ProductID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_ibfk_1` FOREIGN KEY (`ManagerID`) REFERENCES `users`(`UserID`) ON DELETE NO ACTION ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE `users` ADD CONSTRAINT `users_ibfk_2` FOREIGN KEY (`EmployeeID`) REFERENCES `users`(`UserID`) ON DELETE NO ACTION ON UPDATE NO ACTION;
