import { Supplier } from '@/types'
import { NextRequest } from 'next/server'
import prisma from '@/client'



//get data
export async function GET(req: NextRequest) {
  const supplier = await prisma.$queryRaw<Supplier[]>`
  SELECT *
  FROM supplier`
  return new Response(JSON.stringify(supplier))
}

//add data
export async function POST(req: NextRequest){
  const data:Supplier = await req.json();

  const supplier = await prisma.$executeRaw`
  INSERT INTO supplier(SupplierID, SupplierName)
  VALUES(${data.SupplierID}, ${data.SupplierName});`;
/*
INSERT INTO product(SupplierID, SupplierName, ContactPerson, ContactNumber, Email, Address, City)
  VALUES(${data.SupplierID}, ${data.SupplierName}, ${data.ContactPerson}, ${data.ContactNumber}, ${data.Email}, ${data.Address}, ${data.City});`;
  */
  return new Response(JSON.stringify(supplier))
}