import prisma from '@/client'
import { NextRequest } from 'next/server'
import { Order } from '@/types'

interface reqFortmat{
    OrderID:number,
    UserID:number,
    OrderDate: Date
    TotalAmount: number
    OrderStatus:string,
    TotalPrice: number
}

export async function GET(req: NextRequest) {
    const users = await prisma.$queryRaw<Order[]>`
    SELECT *
    FROM orders
    ORDER BY OrderDate DESC`
    return new Response(JSON.stringify(users))
  }

export async function POST(req: Request) {
    const data: reqFortmat = await req.json();
    
    const result = await prisma.$executeRaw`
    INSERT INTO orders(OrderID,UserID,OrderDate,TotalAmount,OrderStatus,TotalPrice)
    VAlUES(${data.OrderID},${data.UserID},${data.OrderDate},${data.TotalAmount},${data.OrderStatus},${data.TotalPrice});`;
  
    //console.log(result)
    return new Response(JSON.stringify(result));
  }
  