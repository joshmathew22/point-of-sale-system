"use client";

import { NextPage } from "next";
import { useEffect, useState } from "react";
import axios from "axios";
//import { cart } from "@/app/page";
import { Checkout, Products,discount } from "@/types";
import { userStore } from "../store";
import toast from "react-hot-toast";
import Popup from "@/app/components/Popup";
function generateRandomUserId(length: number): number {
  const min = Math.pow(10, length - 1); // Minimum value based on the length
  const max = Math.pow(10, length) - 1; // Maximum value based on the length
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
var OID:number
OID = generateRandomUserId(8);
var inc:number = 0
var stock:number
//const CheckoutPage: NextPage = () => {
export default function CheckoutPage(){
    var stockNum:number
    const[products, setProducts] = useState<Checkout[]>()
    const {user} = userStore();
    var total:number
    total = 0;
    var num = user
    var noItems:boolean
    noItems=false
    //getting products from cart in database
    const[buttonPopup, setButtonPopup] = useState(false)

    useEffect(()=>{
        axios
        .get<Checkout[]>(`../api/checkout?UserID=${user}`)
        .then(response =>{
            if(response.data){
            setProducts(response.data)
        }})
        .catch((err) => console.log(err));
    },[products]);
    //console.log(products)
    
    if(products?.length ===0){
        noItems=true
    }
    

    const[p, setP] = useState<Products[]>()
    //get all products from database
    useEffect(()=>{
        axios
          .get<Products[]>(`../api/products`)
          .then(response =>{
            if(response.data){
              setP(response.data)
          }})
          .catch((err) => console.log(err));
      },[p]);

    //removing product from cart
    const removeItem = async (CartID:number, ProductID:number) =>{
        axios.delete(`../api/checkout?CartID=${CartID}`)
          .then(() => {
              toast.success('Removed track from album')
          })
          .catch(Error => console.error(Error))
          p?.map((prod) =>{
            if (prod.ProductID == ProductID){
              stock = prod.StockQuantity
            }
          })
          await axios.patch(`../api/products?StockQuantity=${++stock}&ProductID=${ProductID}`)
              .then(() => {
                console.log(stock)
                toast("user added!")
              }) 
              console.log(stockNum)
    }

    //adds everything in cart to order
    //var OID:number
    //console.log(p)
    const userIdLength = 8; // You can adjust the length of the user ID as needed
    
    //console.log(OID)
    const addOrder = async(price:number)=>{
      setButtonPopup(true)
      console.log(products)
      console.log(p)
      const date = new Date();
      const dateWithoutTime = date.toISOString().split('T')[0];
      
      let x:number
      x=0
      if(products==null){
        x=0
      }else{
        x=products.length
      }

      //check quantity


      //create order
      await axios.post('../api/order', {
          OrderID: OID,
          UserID: user,
          OrderDate:dateWithoutTime,
          TotalAmount:products?.length,
          OrderStatus:"Placed",
          TotalPrice: price
      }) .then(()=>{
          toast("user added!")
          console.log("order id:",OID)
      }) .catch(function(error){
          toast.error("something went wrong")
      })
      //add each items to order
      
      products?.map((product)=>{
        //subtract quantity by one
    /*
        p?.map((prod) =>{
          if (prod.ProductID == product.ProductID){
            //stockNum = prod.StockQuantity -1
            axios.patch(`../api/products?StockQuantity=${--prod.StockQuantity}&ProductID=${product.ProductID}`)
            .then(() => {
              console.log(prod.StockQuantity)
              toast("user added!")
            }) 
            console.log(stockNum)
          }
        })*/
        
        console.log(OID)
          axios.post('../api/orderItems', {
            OrderItemID: inc,
            OrderID: OID,
            ProductID: product.ProductID,
            Quantity: product.Quantity,
            PricePerUnit: product.TotalPrice / product.Quantity

        }) .then(()=>{
            toast("user added!")
            console.log("order id for orderItems:",OID)
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
      //window.location.href = "../";
    }

    products?.map((product)=>{
        total = total+ Number(product.TotalPrice)
    })

    const[discount, setDiscount] = useState<discount[]>()
    useEffect(()=>{
        axios
        .get<discount[]>('../api/discount')
        .then(response =>{
            if(response.data){
            setDiscount(response.data)
  
        }})
        .catch((err) => console.log(err));
    },[discount]);
    //console.log(discount)

    

    return (
        <div className="relative isolate px-6 pt-14 lg:px-8">
          <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
            {products!=null?
              <h3>Sucesfully Added Order!</h3>
              :
              <h3>No items in cart. Please add items to cart.</h3>
           } 
          </Popup>
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
                                  className="font-medium text-red-500 hover:text-red-600"
                                  onClick={()=>{removeItem(product.CartID,product.ProductID)}}
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

            {( total>100)? //discount
              <div>
                <p className="mt-8">Congrats your order was over 100 dollars, coupon applied!</p>
                <p className="mt-1">Price without discount: {total}</p>
                <p className="mt-1">Final Price: (20 percent off): {total*.8}</p>
              </div>
              : 
              <p className="mt-8">Total Price: {total}</p>
            }
                <button  
                  type = "submit"
                  className="bg-black text-white font-bold py-2 px-4 rounded"
                  onClick={() =>{addOrder(total)}}>
                          Checkout
                </button>
              </div>}   
          </div>            
    );
    
}

//export default CheckoutPage;