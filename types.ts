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
    UserID: number,
    Username:string,
    Pass:string,
    Email:string,
    FirstName: string,
    LastName: string,
    Address: string,
    PhoneNumber: string
}

export interface Checkout{
    CartID: number,
    UserID:number,
    ProductID:number,
    Quantity: number,
    TotalPrice: number
}

