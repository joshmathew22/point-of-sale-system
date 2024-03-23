import prisma from '@/client'

interface reqFortmat{
    OrderItemID: number,
    OrderID: number,
    ProductID: number,
    Quantity: number,
    PricePerUnit: number
}

export async function POST(req: Request) {
    const data: reqFortmat = await req.json();
    
    const result = await prisma.$executeRaw`
    INSERT INTO orderItem(OrderItemID,OrderID,ProductID,Quantity,PricePerUnit)
    VAlUES(${data.OrderItemID},${data.OrderID},${data.ProductID},${data.Quantity},${data.PricePerUnit});`;
  
    //console.log(result)
    return new Response(JSON.stringify(result));
  }