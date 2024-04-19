import { userReport} from '@/types'
import { NextRequest } from 'next/server'
import prisma from '@/client'
import { start } from 'repl';

export async function GET(req: NextRequest) {
    //COALESCE(total_orders.TotalOrders, 0) AS NumberOfOrders,

    const searchParams = req.nextUrl.searchParams;
    const email = searchParams.get('email');
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const adjustedStartDate = startDate ? new Date(startDate) : null;

    // Check if adjustedStartDate is not null
    if (adjustedStartDate !== null) {
        // Adjust the date by subtracting one day
        adjustedStartDate.setDate(adjustedStartDate.getDate() +1);
        // Use adjustedStartDate...
    } else {
        // Handle the case where startDate is null
        // For example:
        console.log('startDate is null, cannot adjust date');
    }
    console.log(startDate,endDate)
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
    WHERE OrderDate BETWEEN ${startDate} AND ${endDate}
    ORDER BY OrderDate DESC;
    `
    return new Response(JSON.stringify(report))
}

//  AND OrderDate BETWEEN ${adjustedStartDate} AND ${endDate}
//u.Email = ${email} AND