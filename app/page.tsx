"use client"
import Image from "next/image";
import { Prisma, product } from "@prisma/client";
import { Products } from "@/types";

import { PrismaClient } from '@prisma/client'
import { useEffect, useState } from "react";
const prisma = new PrismaClient()

var cart:Products[] = []
import axios from "axios";


function test(p:Products){
  var length = cart.push(p)
  //console.log(cart)
}

export default function Home() {
  const[products, setProducts] = useState<Products[]>()
  var total:number = 0
  useEffect(()=>{
    axios
      .get<Products[]>('api/products')
      .then(response =>{
        if(response.data){
          setProducts(response.data)
      }})
      .catch((err) => console.log(err));
  },[products]);
  if(products?.length ===0){
    return null
  }
  return(
    /*
    <div>
      {products?.map((product)=>
        <div>{product.ProductName}</div>
      )
    }
    </div>
    */
    <div className="relative isolate px-6 pt-14 lg:px-8">
      <div className='flex justify-between'> 
            <a href="pages/login">Log in</a>
            <div>Grocery Store</div>
            <a href="pages/checkout">Checkout</a>
          </div>
    <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900"></h2>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
          {products?.map((product) => (
            <div key={product.ProductID} className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
                <img
                  src={product.ProductDesc}
                  //alt={product.imageAlt}
                  className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                  onClick={()=>{test(product)}}
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                      {product.ProductName}         
                  </h3>
                </div>
                <p className="text-sm font-medium text-gray-900">{product.Price}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
  </div>
  
  )
}
export{cart}

/*
<div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <a href={product.href'#'}>
                    <span aria-hidden="true" className="absolute inset-0" />
                    {product.ProductName}
                  </a>
                </h3>
                <p className="mt-1 text-sm text-gray-500">{product.color}</p>
              </div>
              <p className="text-sm font-medium text-gray-900">{product.price}</p>
            </div>
*/