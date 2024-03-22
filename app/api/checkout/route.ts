import { PrismaClient, users } from '@prisma/client'
import { Users } from '@/types'
import { NextRequest } from 'next/server'
import { LargeNumberLike } from 'crypto'
import { Checkout } from '@/types'
import { userStore } from '@/app/pages/store'

const prisma = new PrismaClient()


interface reqFortmat{
    CartID: number,
    UserID:number,
    ProductID:number,
    Quantity: number,
    TotalPrice: number
}
/*
    SELECT *
    FROM shoppingcart
    WHERE UserID= ${UserID} 
*/
export async function GET(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const UserID = searchParams.get('UserID');
    //console.log(UserID)
    const products = await prisma.$queryRaw<Checkout[]>`
    SELECT sc.*, p.ProductName, p.ProductDesc
    FROM shoppingcart sc
    JOIN product p ON sc.ProductID = p.ProductID 
    WHERE sc.UserID= ${UserID}
    `//WHERE {abc}=UserID`
    return new Response(JSON.stringify(products))
  }

export async function DELETE(req: NextRequest) {
    const searchParams = req.nextUrl.searchParams;
    const CartID = searchParams.get('CartID');
    const affected = await prisma.$executeRaw`DELETE FROM shoppingcart WHERE CartID=${CartID}`
    return new Response(JSON.stringify(affected));
}

export async function POST(req: Request) {
    const data: reqFortmat = await req.json();
    //console.log(user)
    const result = await prisma.$executeRaw`
    INSERT INTO shoppingcart(CartID,UserID,ProductID,Quantity,TotalPrice)
    VAlUES(${data.CartID},${data.UserID},${data.ProductID},${data.Quantity},${data.TotalPrice} );`;
  
    return new Response(JSON.stringify(result));
}