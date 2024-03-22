"use client";

import { NextPage } from "next";
import { useEffect, useState } from "react";
import axios from "axios";
import { cart } from "@/app/page";
import { Checkout } from "@/types";
import { userStore } from "../store";
import toast from "react-hot-toast";

const Checkout: NextPage = () => {
    const[products, setProducts] = useState<Checkout[]>()
    const {user} = userStore();
    var total:number
    total = 0;
    var num = user

    //getting data from cart in database
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
        return null
    }
    
    const removeItem = async (CartID:number) =>{
        axios.delete(`../api/checkout?CartID=${CartID}`)
                    .then(() => {
                        toast.success('Removed track from album')
                    })
                    .catch(Error => console.error(Error))
    }

    
    products?.map((product)=>{
        total = total+ Number(product.TotalPrice)
    })
    return (
        
        <div>
            Checkout Page
            <br />
            <a href="../">back</a>
            <div className="mt-8">
                        <div className="flow-root">
                          <ul role="list" className="-my-6 divide-y divide-gray-200">
                            {products?.map((product) => (
                              <li key={product.CartID} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    //src={product.imageSrc}
                                    //alt={product.imageAlt}
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                    
                                      <p className="ml-4">{product.TotalPrice}</p>
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
                          <p className="mt-8">total Price: {total}</p>
                        </div>
                      </div>
        </div>
    );
}
export default Checkout;
