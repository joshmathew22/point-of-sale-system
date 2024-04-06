import { userReport} from '@/types'
import { NextRequest } from 'next/server'
import prisma from '@/client'

export async function GET(req: NextRequest) {
    //COALESCE(total_orders.TotalOrders, 0) AS NumberOfOrders,
    const report = await prisma.$queryRaw<userReport[]>`
    
    SELECT DISTINCT
    u.UserID,
    CONCAT(u.FirstName, ' ', u.LastName) AS Name,
    u.Email,
    FORMAT(COALESCE(avg_order.AverageSpend, 0), 2) AS AverageSpend,
    FORMAT(COALESCE(total_orders.TotalOrders, 0), 0) AS NumberOfOrders,
    max_order_date.LastPurchasedDate
FROM 
    users u
LEFT JOIN (
    SELECT 
        UserID,
        AVG(TotalPrice) AS AverageSpend
    FROM 
        orders
    GROUP BY 
        UserID
) AS avg_order ON u.UserID = avg_order.UserID
LEFT JOIN (
    SELECT 
        UserID,
        COUNT(*) AS TotalOrders
    FROM 
        orders
    GROUP BY 
        UserID
) AS total_orders ON u.UserID = total_orders.UserID
LEFT JOIN (
    SELECT 
        UserID,
        MAX(OrderDate) AS LastPurchasedDate
    FROM 
        orders
    GROUP BY 
        UserID
) AS max_order_date ON u.UserID = max_order_date.UserID
LEFT JOIN orders o ON u.UserID = o.UserID AND o.OrderDate = max_order_date.LastPurchasedDate;`
    return new Response(JSON.stringify(report))
}