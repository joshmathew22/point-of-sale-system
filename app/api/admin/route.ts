
import { Manager } from '@/types'
import { NextRequest } from 'next/server'
import prisma from '@/client'


export async function GET(req: NextRequest) {
    const admin = await prisma.$queryRaw<Manager[]>`
    SELECT *
    FROM manager`

    return new Response(JSON.stringify(admin))
}


  export async function POST(req: NextRequest){
    const data: Manager = await req.json();
  
    const newProduct = await prisma.$executeRaw`
    INSERT INTO manager(ManagerID, UserID)
    VALUES(${data.ManagerID}, ${data.UserID});`;
  
    return new Response(JSON.stringify(newProduct))
}