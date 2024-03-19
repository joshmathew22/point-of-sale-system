export interface Products{
    ProductID: number;
    CategoryID: number;
    ProductName: string;
    ProductDesc: string;
    Price: number;
    StockQuantity: number;
    ExpirationDate: Date;
    NutritionValues: string;
}

export interface Users{
    UserID: number;
    ManagerID: number;
    EmployeeID: number;
    Username: string;
    Password: string;
    Email: string;
    FirstName: string;
    LastName: string;
    Address: string;
    Phone: number;
}