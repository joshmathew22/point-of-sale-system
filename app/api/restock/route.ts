import { restockItem } from '@/types'
import { NextRequest } from 'next/server'
import prisma from '@/client'

export async function GET(req: NextRequest) {
    const restock = await prisma.$queryRaw<restockItem[]>`
    SELECT ProductID,ProductName,restockMSG
    FROM product`
    return new Response(JSON.stringify(restock))
  }

  export async function PATCH(req: NextRequest){
    const searchParams = req.nextUrl.searchParams;
    const restockMSG = searchParams.get('restockMSG');
  
    const result = await prisma.$executeRaw`
    UPDATE product
    SET restockMSG = ${(Number(restockMSG))}
    `;
  
    return new Response(JSON.stringify(result))
  }