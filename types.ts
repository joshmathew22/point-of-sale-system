export interface Products{
    ProductID: number;
    CategoryID: number;
    ProductName: string;
    ProductDesc: string;
    Price: number;
    StockQuantity: number;
    ExpirationDate: Date;
    NutritionValues: string;
    isDeleted: boolean;
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
    ProductDesc: string,
    ProductName: string;
}

export interface Manager{
    ManagerID:number,
    UserID:number
}

export interface Category{
    CategoryID:number,
    CategoryName:string
}

export interface Order{
    OrderID:number,
    UserID:number,
    OrderDate: Date
    TotalAmount: number
    OrderStatus:string,
    TotalPrice: number
}

export interface OrderItem{
    OrderItemID: number,
    OrderID: number,
    ProductID: number,
    Quantity: number,
    PricePerUnit: number,
    ProductName: string,
    ProductDesc: string
}

export interface restockItem{
    ProductName: string,
    ProductID: number,
    restockMSG: boolean
}

export interface discount{
    DiscountApply: boolean
}

export interface userReport{
    UserID: number,
    Name: string,
    OrderID: number,
    Email: string,
    OrderDate: Date,
    TotalPrice: number,
    QuantityTotal: number
}

export interface productReport{
    ProductID: number,
    ProductName: string,
    CategoryName: string,
    Price: number,
    StockQuantity: number,
    AmountSoldLifeTime: number,
    ExpirationDate: Date,
    ProductsValue: number
}