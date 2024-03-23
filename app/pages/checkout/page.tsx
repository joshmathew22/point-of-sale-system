"use client";

import { NextPage } from "next";
import { useEffect, useState } from "react";
import axios from "axios";
//import { cart } from "@/app/page";
import { Checkout } from "@/types";
import { userStore } from "../store";
import toast from "react-hot-toast";

function generateRandomUserId(length: number): number {
  const min = Math.pow(10, length - 1); // Minimum value based on the length
  const max = Math.pow(10, length) - 1; // Maximum value based on the length
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

var inc:number = 0

//const CheckoutPage: NextPage = () => {
export default function Checkout(){
  
    const[products, setProducts] = useState<Checkout[]>()
    const {user} = userStore();
    var total:number
    total = 0;
    var num = user
    var noItems:boolean
    noItems=false
    //getting products from cart in database
    
    useEffect(()=>{
        axios
        .get<Checkout[]>(`../api/checkout?UserID=${user}`)
        .then(response =>{
            if(response.data){
            setProducts(response.data)
        }})
        .catch((err) => console.log(err));
    },[products]);
    
    if(products?.length ===0){
        noItems=true
    }
    
    //removing product from cart
    const removeItem = async (CartID:number) =>{
        axios.delete(`../api/checkout?CartID=${CartID}`)
                    .then(() => {
                        toast.success('Removed track from album')
                    })
                    .catch(Error => console.error(Error))
    }

    //adds everything in cart to order
    var OID:number
    const userIdLength = 8; // You can adjust the length of the user ID as needed
    OID = generateRandomUserId(userIdLength);

    const addOrder = async()=>{
      console.log(products)
      const date = new Date();
      const dateWithoutTime = date.toISOString().split('T')[0];
      let x:number
      x=0
      if(products==null){
        x=0
      }else{
        x=products.length
      }

      //create order
      axios.post('../api/order', {
          OrderID: OID,
          UserID: user,
          OrderDate:dateWithoutTime,
          TotalAmount:products?.length,
          OrderStatus:"Placed"

      }) .then(()=>{
          toast("user added!")
      }) .catch(function(error){
          toast.error("something went wrong")
      })
      
      //add each items to order
      products?.map((product)=>{
          axios.post('../api/orderItems', {
            OrderItemID: inc,
            OrderID: OID,
            ProductID: product.ProductID,
            Quantity: product.Quantity,
            PricePerUnit: product.TotalPrice / product.Quantity

        }) .then(()=>{
            toast("user added!")
        }) .catch(function(error){
            toast.error("something went wrong")
        })
      })

      //delete all products from cart becuase they have been added to order
      
      products?.map((product)=>{
        axios.delete(`../api/checkout?CartID=${product.CartID}`)
          .then(() => {
              toast.success('Removed track from album')
          })
          .catch(Error => console.error(Error))
        
      })

    }

    products?.map((product)=>{
        total = total+ Number(product.TotalPrice)
    })
    
    return (
      
        <div className="relative isolate px-6 pt-14 lg:px-8">
          <div className="">
            <a href="../">back</a>
            <div className='mb-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>Checkout</div>
          </div>
          <div className="mt-8">
                  <div className="flow-root">
                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                      {products?.map((product) => (
                        <li key={product.CartID} className="flex py-6">
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img
                              src={product.ProductDesc}
                              //alt={product.imageAlt}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>

                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium text-gray-900">
              
                                <p className="ml-4">{product.ProductName}</p>
                              </div>

                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <p className="text-gray-500">Qty {product.Quantity}</p>

                              <div className="flex">
                                <button
                                  type="button"
                                  className="font-medium text-indigo-600 hover:text-indigo-500"
                                  onClick={()=>{removeItem(product.CartID)}}
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                      
                    </ul>
                  </div>
                </div>
          
                {(noItems)?
                  <div>You have no Items in cart</div>:
                <div>
                <p className="mt-8">total Price: {total}</p>
                <button  
                  type = "submit"
                  className="bg-black hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
                  onClick={() =>{addOrder()}}>
                          Checkout
                </button>
              </div>}
          </div>

                    
    );
    
}
//export default CheckoutPage;
