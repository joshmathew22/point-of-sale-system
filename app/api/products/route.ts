import { Products } from '@/types'
import { NextRequest } from 'next/server'
import prisma from '@/client'
interface updateStock{
  ProductID: number;
  StockQuantity: number;
}


//get data
export async function GET(req: NextRequest) {
  const products = await prisma.$queryRaw<Products[]>`
  SELECT *
  FROM product`
  return new Response(JSON.stringify(products))
}

//add data
export async function POST(req: NextRequest){
  const data: Products = await req.json();

  const newProduct = await prisma.$executeRaw`
  INSERT INTO product(ProductID, CategoryID, ProductName, ProductDesc, Price, StockQuantity, ExpirationDate, NutritionValues,SupplierName,SupplierID)
  VALUES(${data.ProductID}, ${data.CategoryID}, ${data.ProductName}, ${data.ProductDesc}, ${data.Price}, ${data.StockQuantity}, ${data.ExpirationDate}, ${data.NutritionValues},${data.SupplierName},${data.SupplierID} );`;

  return new Response(JSON.stringify(newProduct))
}

//update data (stock number)

export async function PATCH(req: NextRequest){
  const searchParams = req.nextUrl.searchParams;
  const ProductID = searchParams.get('ProductID');
  const StockQuantity = searchParams.get('StockQuantity');

  const result = await prisma.$executeRaw`
  UPDATE product
  SET StockQuantity = ${Number(StockQuantity)-1}
  WHERE ProductID = ${ProductID}
  `;

  return new Response(JSON.stringify(result))
}
//delete product given name
export async function DELETE(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams;
  const ProductName = searchParams.get('ProductName');
  //const affected = await prisma.$executeRaw`DELETE FROM product WHERE ProductName=${ProductName}`
  const affected = await prisma.$executeRaw`
  UPDATE product
  SET isDeleted = ${1}
  WHERE ProductName = ${ProductName}`
  return new Response(JSON.stringify(affected));
}