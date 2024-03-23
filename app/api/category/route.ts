import { Category } from '@/types'
import { NextRequest } from 'next/server'
import prisma from '@/client'
import { category } from '@prisma/client'

export async function GET(req: NextRequest) {
    //const searchParams = req.nextUrl.searchParams;
    //const CategoryName = searchParams.get('CategoryName');
    const id = await prisma.$queryRaw<Category[]>`
    SELECT *
    FROM category`
    //WHERE CategoryName = ${CategoryName}`
    return new Response(JSON.stringify(id))
}

export async function POST(req: Request) {
    const data: category = await req.json();
    
    const result = await prisma.$executeRaw`
    INSERT INTO category(CategoryID,CategoryName)
    VAlUES(${data.CategoryID},${data.CategoryName});`;
  
    //console.log(result)
    return new Response(JSON.stringify(result));
  }