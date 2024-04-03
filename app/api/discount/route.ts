import { discount } from '@/types'
import { NextRequest } from 'next/server'
import prisma from '@/client'

export async function GET(req: NextRequest) {
    const discount = await prisma.$queryRaw<discount[]>`
    SELECT DiscountApply
    FROM discountapply`
    return new Response(JSON.stringify(discount))
  }