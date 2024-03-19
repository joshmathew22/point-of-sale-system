import { PrismaClient } from '@prisma/client'
import { Products } from '@/types'
import { NextRequest } from 'next/server'
const prisma = new PrismaClient()

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
  const searchParams = req.nextUrl.searchParams;
  const ProductID = searchParams.get('ProductID');
  const CategoryID = searchParams.get('CategoryID');
  const ProductName = searchParams.get('ProductName');
  const ProductDesc = searchParams.get('ProductDesc');
  const Price = searchParams.get('Price');
  const StockQuantity = searchParams.get('StockQuantity');
  const ExpirationDate = searchParams.get('ExpirationDate');
  const NutritionValues = searchParams.get('NutritionValues');

  const newProduct = await prisma.$executeRaw`
  INSERT INTO product(ProductID, CategoryID, ProductName, ProductDesc, Price, StockQuantity, ExpirationDate, NutritionValues)
  VALUES(${ProductID}, ${CategoryID}, ${ProductName}, ${ProductDesc}, ${Price}, ${StockQuantity}, ${ExpirationDate}, ${NutritionValues})`

  return new Response(JSON.stringify(newProduct))
}

//update data (stock number)

export async function PATCH(req: Request){
  const data:updateStock = await req.json();

  const result = await prisma.$executeRaw`
  UPDATE product
  SET StockQuantity = ${data.StockQuantity}
  WHERE ProductID = ${data.ProductID}
  `;

  return new Response(JSON.stringify(result))
}