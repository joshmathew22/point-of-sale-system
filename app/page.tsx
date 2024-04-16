"use client"

import { Products, Users, Manager, Category,userReport, restockItem} from "@/types";
import { useEffect, useState } from "react";
import { userStore } from "./pages/store";
import toast from "react-hot-toast";
import Popup from './components/Popup'
import React from 'react';
var cart:Products[] = []
import axios from "axios";

var inc:number = 0
let selectedProduct: Products | null = null
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

  
  /*
  if(products?.length ===0){
    return null
  }
*/
const[cat, setCategory] = useState<Category[]>()
    //get all categories from database
    useEffect(()=>{
        axios
        .get<Category[]>(`../api/category`)
        .then(response =>{
            if(response.data){
            setCategory(response.data)
        }})
        .catch((err) => console.log(err));
    },[cat]);

  //when product is clicked it gets added to cart in database
  const addToCart = async (p:Products) =>{
    //return early if stock Quantity is 0
    setButtonPopup(true)
    if (p.StockQuantity==0) {
      selectedProduct=null
      return;
    }
    selectedProduct= p
    console.log(selectedProduct)
    var length = cart.push(p)
    //let dateTime = new Date() //time created
    await axios.post('api/checkout', {
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

if(p.StockQuantity<=5){
  console.log("stock was updated")
}
    await axios.patch(`api/products?StockQuantity=${p.StockQuantity}&ProductID=${p.ProductID}`)
      .then(() => {
        console.log(p.StockQuantity)
        toast("user added!")
      }) 
    console.log(inc)


  };


  //check if user is admin, if so display dashboard
  var isManager:boolean =false;
  const[manager, setManager] = useState<Manager[]>()
  useEffect(()=>{
      axios
      .get<Manager[]>(`../api/manager?UserID=${user}`)
      .then(response =>{
          if(response.data){
          setManager(response.data)
      }})
      .catch((err) => console.log(err));
  },[manager]);
  if(manager?.length ===0){
     isManager=false
  }else{
    isManager=true
  }
const[buttonPopup, setButtonPopup] = useState(false)


const [showDropdown, setShowDropdown] = useState(false);

  // Mock notifications data (replace with your actual notifications data)
  const notifications = [
    { id: 1, text: 'Notification 1' },
    { id: 2, text: 'Notification 2' },
    { id: 3, text: 'Notification 3' },
  ];

  const[restock, setStock] = useState<restockItem[]>()
  useEffect(()=>{
    axios
    .get<restockItem[]>('../api/restock')
    .then(response =>{
        if(response.data){
        setStock(response.data)
        
        //console.log(restock)
    }})
    .catch((err) => console.log(err));
},[restock]);
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
          <Popup trigger={buttonPopup} setTrigger={setButtonPopup}>
            {selectedProduct!=null?
              <h3>{selectedProduct.ProductName} added to cart</h3>
              :
              <h3>No Stock</h3>
           } 
          </Popup>
          <div className='flex content-center '> 
            <div className='mb-5 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900 flex justify-center'>Grocery Store</div>
          </div>    
          
          <div className='flex justify-between '> 
                
                {(user==0)? //check if user is signed in 
                  <a href="pages/login" className="hover:text-gray-500">Log in</a>:<button className="hover:text-gray-500"onClick={() =>signOut(0)}>Sign Out</button>
                }
                {(isManager)?
                <a href="pages/dashboard" className="hover:text-gray-500">Dashboard</a>:null
                }
                <a href="pages/cart" className="hover:text-gray-500">Cart</a>
          </div>
          <div className="flex justify-between">
            <a href="pages/orders" className="hover:text-gray-500">Orders</a>
            {isManager && (
              <div className="relative">
                {/* Button to toggle dropdown visibility */}
                <button
                  className="relative z-10 p-2"
                  onClick={() => setShowDropdown(!showDropdown)}
                >
                  {/* Your SVG icon */}
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="h-10 w-10"
                  >
                    <path
                    fillRule="evenodd"
                    d="M5.25 9a6.75 6.75 0 0 1 13.5 0v.75c0 2.123.8 4.057 2.118 5.52a.75.75 0 0 1-.297 1.206c-1.544.57-3.16.99-4.831 1.243a3.75 3.75 0 1 1-7.48 0 24.585 24.585 0 0 1-4.831-1.244.75.75 0 0 1-.298-1.205A8.217 8.217 0 0 0 5.25 9.75V9Zm4.502 8.9a2.25 2.25 0 1 0 4.496 0 25.057 25.057 0 0 1-4.496 0Z"
                    clipRule="evenodd"
                  />
                    {/* SVG path */}
                  </svg>
                </button>

                {/* Dropdown content */}
                {showDropdown && (
                  <div className="absolute top-12 right-0 w-64 bg-white border border-gray-200 shadow-lg rounded-lg">
                    {/* Notifications list */}
                    <ul className="divide-y divide-gray-200">
                    {restock?.map((category) => (
                            (category.restockMSG==true) ? 
                              <li key={category.ProductID} className="p-4" >{category.ProductName} needs to be restocked</li>
                            :   
                                null
                        ))}
                    </ul>
                  </div>
                )}
              </div>
            )}



          </div>
          

      <div className="bg-black px-6 px-6 py-2.5 sm:px-3.5 sm:before:flex-1 bg-opacity-75 rounded-lg">
        <div className="flex flex-col items-center gap-y-2">
          <p className="text-sm leading-6 text-white text-center">Spend over 100$ get 20% off!</p>
        </div>
      </div>



      
      <div className=" ">
  <h2 className="text-2xl font-bold tracking-tight text-gray-900 "></h2>

  {cat?.map((category) => (
    <div key={category.CategoryID} className="mt-6">
      <h2 className="mb-3 text-2xl font-semi-bold  tracking-tight text-gray-900 ">{category.CategoryName}</h2>
      <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 object-contain ">
        {products?.filter(product => product.CategoryID === category.CategoryID && !product.isDeleted).map((product) => (
          <div key={product.ProductID} className="group relative">
            <div className=" aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200 lg:aspect-none group-hover:opacity-75 lg:h-80">
              <img
                src={product.ProductDesc}
                //alt={product.imageAlt}
                className="h-full w-full object-cover object-center lg:h-full lg:w-full"
                onClick={() => { addToCart(product) }}             
              />
            </div>
            
            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="text-sm text-gray-700">
                  {product.ProductName}    
                </h3>
                <h3 className="text-xs text-gray-300">   
                  stock: {product.StockQuantity}
                </h3>
              </div>
              <p className="text-sm font-medium text-gray-900">$ {product.Price}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  ))}
</div>
</div>
  
  )
}
//export{cart}

