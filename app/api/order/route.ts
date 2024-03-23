import { PrismaClient, users } from '@prisma/client'
import { Users } from '@/types'
import { NextRequest } from 'next/server'

const prisma = new PrismaClient()

interface reqFortmat{
    OrderID:number,
    UserID:number,
    OrderDate: Date
    TotalAmount: number
    OrderStatus:string
}

export async function POST(req: Request) {
    const data: reqFortmat = await req.json();
    
    const result = await prisma.$executeRaw`
    INSERT INTO orders(OrderID,UserID,OrderDate,TotalAmount,OrderStatus)
    VAlUES(${data.OrderID},${data.UserID},${data.OrderDate},${data.TotalAmount},${data.OrderStatus});`;
  
    //console.log(result)
    return new Response(JSON.stringify(result));
  }