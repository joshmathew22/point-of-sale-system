import { sellerReport} from '@/types'
import { NextRequest } from 'next/server'
import prisma from '@/client'

export async function GET(req: NextRequest) {
    //COALESCE(total_orders.TotalOrders, 0) AS NumberOfOrders,
    const searchParams = req.nextUrl.searchParams;
    const seller = searchParams.get('seller');
    const report = await prisma.$queryRaw<sellerReport[]>`
    
    SELECT DISTINCT
        s.SupplierName,
        p.ProductName as Supplies,
        p.Price AS UnitPrice,
        p.StockQuantity,
        (p.Price * p.StockQuantity) AS TotalValue

    FROM 
        product p, supplier s
    WHERE 
        p.SupplierID = s.SupplierID AND
        s.supplierName= ${seller}

    `
    return new Response(JSON.stringify(report))
}