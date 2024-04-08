import { sellerReport} from '@/types'
import { NextRequest } from 'next/server'
import prisma from '@/client'

export async function GET(req: NextRequest) {
    //COALESCE(total_orders.TotalOrders, 0) AS NumberOfOrders,
    const searchParams = req.nextUrl.searchParams;
    const email = searchParams.get('email');
    const report = await prisma.$queryRaw<sellerReport[]>`
    
    SELECT DISTINCT
    s.SupplierName,
    p.ProductName as Supplies,
    p.Price AS UnitPrice,
    p.StockQuantity,
    (p.Price * p.StockQuantity) AS TotalValue,
    oi.Quantity,
    mpi.MostPurchasedItem
    FROM 
        product p
    JOIN 
        supplier s ON p.SupplierID = s.SupplierID
    JOIN 
        orderitem oi ON oi.ProductID = p.ProductID
    LEFT JOIN (
        SELECT 
            SupplierID,
            MAX(ProductName) AS MostPurchasedItem
        FROM 
            (SELECT 
                p.SupplierID,
                p.ProductName,
                ROW_NUMBER() OVER (PARTITION BY p.SupplierID ORDER BY SUM(oi.Quantity) DESC) AS rn
            FROM 
                product p
            JOIN 
                orderitem oi ON oi.ProductID = p.ProductID
            GROUP BY 
                p.SupplierID, p.ProductName) AS sub
        WHERE 
            rn = 1
        GROUP BY 
            SupplierID
    ) AS mpi ON p.SupplierID = mpi.SupplierID;

    `
    return new Response(JSON.stringify(report))
}