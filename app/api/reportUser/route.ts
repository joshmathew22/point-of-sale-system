import { userReport} from '@/types'
import { NextRequest } from 'next/server'
import prisma from '@/client'

export async function GET(req: NextRequest) {
    //COALESCE(total_orders.TotalOrders, 0) AS NumberOfOrders,
    const searchParams = req.nextUrl.searchParams;
    const email = searchParams.get('email');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const report = await prisma.$queryRaw<userReport[]>`
    
    SELECT u.UserID, 
    CONCAT(u.FirstName, ' ', u.LastName) AS Name, 
    OrderID, 
    OrderDate, 
    TotalPrice,
    TotalAmount as QuantityTotal,
    Email


    FROM Users u
    INNER JOIN Orders
    ON u.UserID = Orders.UserID
    WHERE u.Email = ${email} AND OrderDate BETWEEN ${startDate} AND ${endDate}
    ORDER BY OrderDate DESC;
    `
    return new Response(JSON.stringify(report))
}