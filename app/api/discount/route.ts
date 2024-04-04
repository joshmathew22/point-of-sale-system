import { discount } from '@/types'
import { NextRequest } from 'next/server'
import prisma from '@/client'

export async function GET(req: NextRequest) {
    const discount = await prisma.$queryRaw<discount[]>`
    SELECT DiscountApply
    FROM discountapply`
    return new Response(JSON.stringify(discount))
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