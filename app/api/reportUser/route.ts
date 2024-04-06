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
        
        MAX(o.OrderDate) AS LastPurchasedDate,
        COALESCE(FORMAT(last_purchase.Amount, 2), 0) AS LastPurchaseAmount
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
    LEFT JOIN orders o ON u.UserID = o.UserID
    LEFT JOIN (
        SELECT 
            UserID,
            MAX(OrderDate) AS MaxOrderDate
        FROM 
            orders
        GROUP BY 
            UserID
    ) AS max_order_date ON u.UserID = max_order_date.UserID
    LEFT JOIN orders AS last_order ON u.UserID = last_order.UserID AND max_order_date.MaxOrderDate = last_order.OrderDate
    LEFT JOIN (
        SELECT 
            UserID,
            OrderDate,
            TotalPrice AS Amount
        FROM 
            orders
    ) AS last_purchase ON u.UserID = last_purchase.UserID AND last_order.OrderDate = last_purchase.OrderDate

    GROUP BY 
        u.UserID, u.FirstName, u.LastName, u.Email, avg_order.AverageSpend, total_orders.TotalOrders, last_purchase.Amount;
        `
    return new Response(JSON.stringify(report))
}