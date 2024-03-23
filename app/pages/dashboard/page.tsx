"use client";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Category } from "@/types";
const addProductsForm = {
    name:"",
    category:"",
    img:"",
    price: "",
    quantity:"",
    expiration: "",
    nutrition:""
};
function generateRandomProductId(length: number): number {
    const min = Math.pow(10, length - 1); // Minimum value based on the length
    const max = Math.pow(10, length) - 1; // Maximum value based on the length
    return Math.floor(Math.random() * (max - min + 1)) + min;
    const[id, setID] = useState<number>()
}
const Dashboard: NextPage = () => {
    var PID:number;
    var CID:number;
    CID = -1;
    const[formData, setFormData] = useState(addProductsForm)
    const{name,category,img,price,quantity,expiration,nutrition} = formData;

    const[cat, setCategory] = useState<Category[]>()

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

    const onChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setFormData((prevState)=>({
            ...prevState,
            [e.target.id]: e.target.value
        }));
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        
        var catID:number
        cat?.forEach((element)=>{
            if(element.CategoryName ==category){
                CID = element.CategoryID
            }
        })
        if(CID===-1){
            console.log("Category Doesnt Exist, Please create Category first")
            return
        }
        PID = generateRandomProductId(8);
        axios.post('../api/products', {
            ProductID: PID,
            CategoryID:CID,
            ProductName: name,
            ProductDesc: img,
            Price: Number(price),
            StockQuantity: Number(quantity),
            //ExpirationDate: new Date(expiration),
            ExpirationDate: expiration,
            NutritionValues: nutrition

        }) .then(()=>{
            toast("user added!")
            setFormData(addProductsForm);
            //UID= UID+1
        }) .catch(function(error){
            toast.error("something went wrong")
        })
    }
    return (
        <div className="relative isolate px-6 pt-14 lg:px-8 min-h-screen">
            <a href="../">back</a>
            <div className="mb-5 text-center">
                <h1 className="text-4xl font-extrabold leading-9 tracking-tight ">Dashboard</h1>
                <p className="mt-2 text-lg">Hello Admin!</p>
            </div>
            <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-6 shadow-lg rounded-lg bg-white border border-red-200">
                        <h2 className="text-xl font-semibold">Adding Products</h2>
                        <form onSubmit={onSubmit} className="mt-5 text-center text-lg leading-9 tracking-tight text-gray-900">
                            <label htmlFor="name">
                                Product Name <span className="text-red-500">*</span>
                            </label>
                            <br />
                            <input className="border-4 border-black rounded-lg" type="text" id="name" value={name} onChange={onChange} required />
                            <br />
                            <br />

                            <label htmlFor="category">
                                Product Category <span className="text-red-500">*</span>
                            </label>
                            <br />
                            <input className="border-4 border-black rounded-lg" type="text" id="category" value={category} onChange={onChange} required />
                            <br />
                            <br />
                            
                            <label htmlFor="img">
                                Product Image <span className="text-red-500">*</span>
                            </label>
                            <br />
                            <input className="border-4 border-black rounded-lg" type="testr" id="img" value={img} onChange={onChange} required />
                            <br />
                            <br />

                            <label htmlFor="price">
                                Product Price <span className="text-red-500">*</span>
                            </label>
                            <br />
                            <input className="border-4 border-black rounded-lg" type="number" id="price" value={price} onChange={onChange} required />
                            <br />
                            <br />
                            
                            <label htmlFor="quantity">
                                Product Quantity <span className="text-red-500">*</span>
                            </label>
                            <br />
                            <input className="border-4 border-black rounded-lg" type="number" id="quantity" value={quantity} onChange={onChange} required />
                            <br />
                            <br />
                
                            <label htmlFor="expiration">
                                Expiration Date <span className="text-red-500">*</span>
                            </label>
                            <br />
                            <input className="border-4 border-black rounded-lg" type="date" id="expiration" value={expiration} onChange={onChange} required />
                            <br />
                            <br />
                
                            <label htmlFor="nutrition">
                                Nutrition <span className="text-red-500">*</span>
                            </label>
                            <br />
                            <input className="border-4 border-black rounded-lg" type="text" id="nutrition" value={nutrition} onChange={onChange} required />
                            <br />
                            <br />
                
                            <button type="submit" className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                                Add Product
                            </button>
                            <br />
                        </form>
                    </div>
                    <div className="p-6 shadow-lg rounded-lg bg-white border border-red-200">
                        <h2 className="text-xl font-semibold">Creating Category</h2>
                        <p className="mt-2 text-gray-600">Please Note you need to create a category before you add different products</p>
                    </div>
                    <div className="p-6 shadow-lg rounded-lg bg-white border border-red-200">
                        <h2 className="text-xl font-semibold">Modify Stock Quantity</h2>
                        <p className="mt-2 text-gray-600">This is a placeholder for the second section of your dashboard.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;