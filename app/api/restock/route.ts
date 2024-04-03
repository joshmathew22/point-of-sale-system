import { restockItem } from '@/types'
import { NextRequest } from 'next/server'
import prisma from '@/client'

export async function GET(req: NextRequest) {
    const restock = await prisma.$queryRaw<restockItem[]>`
    SELECT ProductID,ProductName,restockMSG
    FROM product`
    return new Response(JSON.stringify(restock))
  }