"use client";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Category, Products,restockItem,Users, Manager} from "@/types";
import { useRouter } from "next/navigation";
import Sidebar from "@/app/components/sidebar";

function generateRandomId(length: number): number {
    const min = Math.pow(10, length - 1); // Minimum value based on the length
    const max = Math.pow(10, length) - 1; // Maximum value based on the length
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const Dashboard: NextPage = () => {
    var CID:number;
    CID = -1;

    const[products, setProducts] = useState<Products[]>()

    const[restock, setStock] = useState<restockItem[]>()

    const[users, setUsers] = useState<Users[]>()

    const[admin, setAdmin] = useState<Manager[]>()

 
    //const[update, setUpdate] = useState(0)
    //const router = useRouter();

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
    //console.log(restock)

    //get all products from database
    useEffect(()=>{
        axios
          .get<Products[]>(`../api/products`)
          .then(response =>{
            if(response.data){
              setProducts(response.data)
          }})
          .catch((err) => console.log(err));
      },[products]);
      //console.log(products)

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
    //console.log(cat)

    useEffect(()=>{
        axios
        .get<Users[]>('../api/users')
        .then(response =>{
            if(response.data){
            setUsers(response.data)
            
            //console.log(restock)
        }})
        .catch((err) => console.log(err));
    },[users]);
   
    useEffect(()=>{
        axios
        .get<Manager[]>('../api/admin')
        .then(response =>{
            if(response.data){
            setAdmin(response.data)
            
            //console.log(restock)
        }})
        .catch((err) => console.log(err));
    },[admin]);
    //modify restockMSG
    products?.forEach((product) => {
        if(product.StockQuantity>3){
            axios.patch(`../api/restock?restockMSG=${0}`)
        }
        else{
            axios.patch(`../api/restock?restockMSG=${1}}`)
        }
    })

 
    return (
        <div className="flex min-h-screen">
    <Sidebar/>
    <div className="flex-1 flex justify-center items-center">
        <div className="relative isolate px-6 pt-14 lg:px-8 min-h-screen">
    
    <div className="mb-5 text-center">
        <h1 className="text-4xl font-extrabold leading-9 tracking-tight">Dashboard</h1>
        <p className="mt-2 text-2xl">Inventory</p>
    </div>
    <div className="max-w-4xl mx-auto">
        <div className="flex flex-wrap justify-center">
            


            <div className="p-6 shadow-lg rounded-lg bg-white border border-red-200 m-4">
                <h2 className="text-xl font-semibold">Products/Stock Numbers</h2>
                {products?.map((product) => (
                            (product.isDeleted==false)?(
                            <div key={product.ProductID}>{product.ProductName}: {product.StockQuantity}</div>
                            )
                            :null
                        ))}
                
            </div>
            <div className="p-6 shadow-lg rounded-lg bg-white border border-red-200 m-4">
                <h2 className="text-xl font-semibold">Current Categories</h2>
                {cat?.map((category) => (
                    <div key={category.CategoryID}>{category.CategoryName}</div>
                ))}
            </div>

            <div className="p-6 shadow-lg rounded-lg bg-white border border-red-200 m-4">
                <h2 className="text-xl font-semibold">Admin Restock Warnings</h2>
                {restock?.map((category) => (
                    (category.restockMSG==true) ? 
                        <div key={category.ProductID}>{category.ProductName} needs to be restocked</div>
                    :   
                        null
                    ))}

        
            </div>
        </div>
        
    </div>
</div>
</div>
</div>

                    
                    
    );
};

export default Dashboard;
