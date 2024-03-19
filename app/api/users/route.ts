import { PrismaClient, users } from '@prisma/client'
import { Users } from '@/types'
import { NextRequest } from 'next/server'
const prisma = new PrismaClient()

export async function GET(req: NextRequest) {
    const users = await prisma.$queryRaw<Users[]>`
    SELECT *
    FROM users`
    return new Response(JSON.stringify(users))
  }