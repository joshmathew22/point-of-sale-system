"use client";

import { NextPage } from "next";
import { useEffect, useState } from "react";
import axios from "axios";
//import { cart } from "@/app/page";
import { Order, OrderItem } from "@/types";
import { userStore } from "../store";
import toast from "react-hot-toast";

export default function OrderPage(){
    const {user} = userStore();
    //console.log(user)
    const[order, setOrder] = useState<Order[]>()
    useEffect(()=>{
        axios
        .get<Order[]>('../api/order')
        .then(response =>{
            if(response.data){
            setOrder(response.data)
        }})
        .catch((err) => console.log(err));
    },[order]);
    //console.log(order)

    const[orderItem, setOrderItem] = useState<OrderItem[]>()
    useEffect(()=>{
        axios
        .get<OrderItem[]>('../api/orderItems')
        .then(response =>{
            if(response.data){
            setOrderItem(response.data)
            //console.log(orderItem)
        }})
        .catch((err) => console.log(err));
    },[orderItem]);

    
    
    return (
        <div className="relative isolate px-6 pt-14 lg:px-8">
          <div className="">
            <a href="../">back</a>
            <div className='mb-5 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900'>Orders</div>
          </div>
          <div className="mt-8">
            <div className="flow-root">
            <ul role="list" className="-my-6 divide-y divide-gray-200">
            {order?.map((o, index) => (
  <div key={index}>
    {(o.UserID === user) && (
      <>
        <div>Order ID: {o.OrderID}</div>
        <div>Order Date: {o.OrderDate.toString().substring(0, 10)}</div>
        <div>Total Price: {o.TotalPrice.toFixed(2)} $</div>
        {orderItem?.map((oi, oiIndex) => (
          <div key={oiIndex}>
            {o.OrderID === oi.OrderID && (
              <li key={oi.OrderID} className="flex py-6">
                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                  <img
                    src={oi.ProductDesc}
                    //alt={product.imageAlt}
                    className="h-full w-full object-cover object-center"
                  />
                </div>

                <div className="ml-4 flex flex-1 flex-col">
                  <div>
                    <div className="flex justify-between text-base font-medium text-gray-900">

                      <p className="ml-4">{oi.ProductName}</p>
                    </div>

                  </div>
                </div>
              </li>
            )}
          </div>
        ))}
      </>
    )}
  </div>
))}
          
            </ul>
            </div>
        </div>
          

         
        </div>
                
                    
    );
    
}
