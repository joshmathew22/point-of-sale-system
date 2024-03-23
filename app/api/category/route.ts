import { Category } from '@/types'
import { NextRequest } from 'next/server'
import prisma from '@/client'

export async function GET(req: NextRequest) {
    //const searchParams = req.nextUrl.searchParams;
    //const CategoryName = searchParams.get('CategoryName');
    const id = await prisma.$queryRaw<Category[]>`
    SELECT *
    FROM category`
    //WHERE CategoryName = ${CategoryName}`
    return new Response(JSON.stringify(id))
}