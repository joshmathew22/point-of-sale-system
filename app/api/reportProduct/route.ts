import { productReport} from '@/types'
import { NextRequest } from 'next/server'
import prisma from '@/client'

export async function GET(req: NextRequest) {
    //COALESCE(total_orders.TotalOrders, 0) AS NumberOfOrders,
    const searchParams = req.nextUrl.searchParams;
    const category = searchParams.get('category');
    const report = await prisma.$queryRaw<productReport[]>`
    SELECT
        p.ProductID,
        p.ProductName,
        p.Price,
        p.StockQuantity,
        SUM(oi.Quantity) AS AmountSoldLifeTime,
        p.ExpirationDate,
        (p.Price * p.StockQuantity) AS ProductsValue
    FROM
        product p
    LEFT JOIN
        orderitem oi ON p.ProductID = oi.ProductID
    LEFT JOIN
        category c ON p.CategoryID = c.CategoryID
    WHERE 
        c.CategoryName = ${category}
    GROUP BY
        p.ProductID, p.ProductName, c.CategoryName, p.Price, p.StockQuantity, p.ExpirationDate, p.restockMSG;

    
    `
    return new Response(JSON.stringify(report))
}