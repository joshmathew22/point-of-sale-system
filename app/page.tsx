"use client"

import { Products, Users } from "@/types";
import { PrismaClient } from '@prisma/client'
import { useEffect, useState } from "react";
import { userStore } from "./pages/store";
import toast from "react-hot-toast";
const prisma = new PrismaClient()

var cart:Products[] = []
import axios from "axios";

var inc:number = 0

export default function Home() {
  const {user} = userStore();
  const{signOut} = userStore()

  const[isToggled, setIsToggled] = useState(false) //toggle between log in and sign out
  
  //display all products on main page
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

  //when product is clicked it gets added to cart in database
  
  //console.log(inc)
  const addToCart = async (p:Products) =>{
    var length = cart.push(p)
    //let dateTime = new Date() //time created
    //console.log()
    //inc++
    axios.post('api/checkout', {
        CartID:inc,
        UserID:user,
        ProductID: p.ProductID,
        Quantity: 1,
        TotalPrice: p.Price
    }) .then(()=>{
        toast("product added to cart!") 
    }) .catch(function(error){
        toast.error("something went wrong")
    })
    console.log(inc)
  };
  return(
    /*
    <div>
      {products?.map((product)=>
        <div>{product.ProductName}</div>
      )
    }
    </div>
    <div>{user}</div>
    */
    <div className="relative isolate px-6 pt-14 lg:px-8">
      <div className='mb-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>Grocery Store</div>
      <div className='flex justify-between'> 
            {(user==0)? //check if user is signed in 
              <a href="pages/login">Log in</a>:<button onClick={() =>signOut(0)}>Sign Out</button>
            }
            <a href="pages/dashboard">Dashboard</a>
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
                  onClick={()=>{addToCart(product)}}
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

