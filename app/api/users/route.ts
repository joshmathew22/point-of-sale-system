import { PrismaClient, users } from '@prisma/client'
import { Users } from '@/types'
import { NextRequest } from 'next/server'

const prisma = new PrismaClient()

interface reqFortmat{
  UserID: number,
  Username:string,
  Pass:string,
  Email:string,
  FirstName: string,
  LastName: string,
  Address: string,
  PhoneNumber: string
}

export async function GET(req: NextRequest) {
    const users = await prisma.$queryRaw<Users[]>`
    SELECT *
    FROM users`
    return new Response(JSON.stringify(users))
  }
  
export async function POST(req: Request) {
  const data: reqFortmat = await req.json();
  
  const result = await prisma.$executeRaw`
  INSERT INTO users(UserID,Username,Pass,Email,FirstName,LastName,Address,PhoneNumber)
  VAlUES(${data.UserID},${data.Username},${data.Pass},${data.Email},${data.FirstName},${data.LastName},${data.Address},${data.PhoneNumber} );`;

  //console.log(result)
  return new Response(JSON.stringify(result));
}

/*
  export async function PATCH(req: NextRequest){
    const searchParams = req.nextUrl.searchParams;
    const UserID = searchParams.get('UserID');
    const ManagerID = searchParams.get('ManagerID')
    const EmployeeID = searchParams.get('EmployeeID')
    const FirstName = searchParams.get('FirstName')
    const LastName = searchParams.get('LastName')

  }
  */