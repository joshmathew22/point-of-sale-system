import { PrismaClient } from '@prisma/client'
import { Manager } from '@/types'
import { NextRequest } from 'next/server'
const prisma = new PrismaClient()

export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const UserID = searchParams.get('UserID');
    const admin = await prisma.$queryRaw<Manager[]>`
    SELECT *
    FROM manager
    WHERE UserID = ${UserID}`
    return new Response(JSON.stringify(admin))
  }