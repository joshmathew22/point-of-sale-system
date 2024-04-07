import prisma from '@/client'
import { NextRequest } from 'next/server'
import { OrderItem} from '@/types'
interface reqFortmat{
    OrderItemID: number,
    OrderID: number,
    ProductID: number,
    Quantity: number,
    PricePerUnit: number
}
export async function GET(req: NextRequest) {
    const users = await prisma.$queryRaw<OrderItem[]>`
    SELECT orderitem.*, product.ProductName, product.ProductDesc
    FROM orderitem, product
    WHERE orderitem.ProductID = product.ProductID`
    return new Response(JSON.stringify(users))
}
export async function POST(req: Request) {
    const data: reqFortmat = await req.json();
    
    const result = await prisma.$executeRaw`
    INSERT INTO orderItem(OrderItemID,OrderID,ProductID,Quantity,PricePerUnit)
    VAlUES(${data.OrderItemID},${data.OrderID},${data.ProductID},${data.Quantity},${data.PricePerUnit});`;
  
    //console.log(result)
    return new Response(JSON.stringify(result));
  }