"use client"
import { NextPage } from "next";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { Category, Products,restockItem } from "@/types";
import { useRouter } from "next/navigation";
import Sidebar from "@/app/components/sidebar";
const addProductsForm = {
    name:"",
    category:"",
    img:"",
    price: "",
    quantity:"",
    expiration: "",
    nutrition:""
};

const addCategorysForm = {
    catName:""
}

const addStockForm = {
    stockName:"",
    stock:""
}

const deleteForm = {
    deleteName:""
}

function generateRandomId(length: number): number {
    const min = Math.pow(10, length - 1); // Minimum value based on the length
    const max = Math.pow(10, length) - 1; // Maximum value based on the length
    return Math.floor(Math.random() * (max - min + 1)) + min;
}


const Modify: NextPage = () => {
    var PID:number;
    var CID:number;
    CID = -1;
    const[addProductsFormData, setFormData] = useState(addProductsForm)
    const{name,category,img,price,quantity,expiration,nutrition} = addProductsFormData;

    const[addCategoriesFormData, setCategoriesFormData] = useState(addCategorysForm)
    const{catName} = addCategoriesFormData;

    const[addStockFormData,setStockFormData]=useState(addStockForm)
    const{stockName,stock} =addStockFormData

    const[deleteFormData, setDeleteFormData]=useState(deleteForm)
    const{deleteName} =deleteFormData

    const[products, setProducts] = useState<Products[]>()

    const[restock, setStock] = useState<restockItem[]>()
    //const[update, setUpdate] = useState(0)
    //const router = useRouter();

    useEffect(()=>{
        axios
        .get<restockItem[]>('../../api/restock')
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
          .get<Products[]>(`../../api/products`)
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
        .get<Category[]>(`../../api/category`)
        .then(response =>{
            if(response.data){
            setCategory(response.data)
        }})
        .catch((err) => console.log(err));
    },[cat]);
   //console.log(cat)


    const onProductChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setFormData((prevState)=>({
            ...prevState,
            [e.target.id]: e.target.value
            //name: e.target.value
        }));
    };
    const onProductCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>)=>{
        setFormData((prevState)=>({
            ...prevState,
            [e.target.id]: e.target.value
            //name: e.target.value
        }));
    };
    const onCategoryChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setCategoriesFormData((prevState)=>({
            ...prevState,
            [e.target.id]: e.target.value
       }));
    };

    const onStockChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setStockFormData((prevState)=>({
            ...prevState,
            [e.target.id]: e.target.value
       }));
    };

    const onDeleteChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setDeleteFormData((prevState)=>({
            ...prevState,
            [e.target.id]: e.target.value
       }));
    };

    const AddProductSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();   
        var catID:number
        cat?.forEach((element)=>{
            if(element.CategoryName ==category){
                CID = element.CategoryID
            }
        })
        console.log(category)
        if(CID===-1){
            console.log("Category Doesnt Exist, Please create Category first")
            return
        }
        PID = generateRandomId(8);
        axios.post('../../api/products', {
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

    const AddCategorySubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        CID = generateRandomId(8);
        axios.post('../../api/category', {
            CategoryID: CID,
            CategoryName:catName

        }) .then(()=>{
            toast("Category added!")
            setCategoriesFormData(addCategorysForm);
            //UID= UID+1
        }) .catch(function(error){
            toast.error("something went wrong")
        })
    }

    const deleteSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        axios.delete(`../../api/products?ProductName=${deleteName}`)
          .then(() => {
              toast.success('Removed track from album')
              setDeleteFormData(deleteForm)
          })
          .catch(Error => console.error(Error))
    }

    //modify restockMSG
    products?.forEach((product) => {
        if(product.StockQuantity>3){
            axios.patch(`../../api/restock?restockMSG=${0}`)
        }
        else{
            axios.patch(`../../api/restock?restockMSG=${1}}`)
        }
    })

    
    const AddStockSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        var StockQuantity = -1
        var stockID = -1
        products?.forEach((product) => {
            if (product.ProductName === stockName) {
                stockID = product.ProductID;
                StockQuantity = product.StockQuantity

            }
            
            
        });
        if (stockID === -1) {
            console.log("item not found");
            // Exit function or return appropriate JSX
            return null; // For example, returning null to render nothing
          }
          
        console.log(Number(stock)+StockQuantity,stockID)
        await axios.patch(`../../api/products?StockQuantity=${Number(stock)+StockQuantity+1}&ProductID=${stockID}`)
        .then(() => {
            //console.log(p.StockQuantity)
            setStockFormData(addStockForm)
            toast("user added!")
        }) 
        //router.refresh();
        //setUpdate(update+1)
        //window.location.href = "/pages/dashboard";
    }
    return(
        <div className="flex min-h-screen">
            <Sidebar/>
            <div className="flex-1 flex justify-center items-center">
            <div className="relative isolate px-6 pt-14 lg:px-8 min-h-screen">
        
            <div className="mb-5 text-center">
                <h1 className="text-4xl font-extrabold leading-9 tracking-tight">Modify Data</h1>
            </div>
            <div className="max-w-4xl mx-auto">
                <div className="flex flex-wrap justify-center">
                <div className="p-6 shadow-lg rounded-lg bg-white border border-red-200 m-4">
                <h2 className="text-xl font-semibold">Adding Products</h2>
                <form onSubmit={AddProductSubmit} className="mt-5 text-lg leading-9 tracking-tight text-gray-900">
                    <div className="flex flex-wrap justify-between">
                        <div className="w-full md:w-1/2 pr-4">
                            <label htmlFor="name">
                                Product Name <span className="text-red-500">*</span>
                            </label>
                            <input className="border-4 border-black rounded-lg w-full" type="text" id="name" value={name} onChange={onProductChange} required />
                        </div>
                            <div className="w-full md:w-1/2 pl-4">
                            <label htmlFor="category">
                                Product Category <span className="text-red-500">*</span>
                            </label>
                            <select
                                id="category"
                                className="border-4 border-black rounded-lg w-full"
                                value={category}
                                onChange={onProductCategoryChange}
                                required
                            >
                                {cat?.map((categoryItem, index) => (
                                    <option key={index} value={categoryItem.CategoryName}>{categoryItem.CategoryName}</option>
                                ))}

                                {/* Add more options as needed */}
                            </select>
                        </div>

                        <div className="w-full md:w-1/2 pr-4">
                            <label htmlFor="img">
                                Product Image <span className="text-red-500">*</span>
                            </label>
                            <input className="border-4 border-black rounded-lg w-full" type="text" id="img" value={img} onChange={onProductChange} required />
                        </div>
                        <div className="w-full md:w-1/2 pl-4">
                            <label htmlFor="price">
                                Product Price <span className="text-red-500">*</span>
                            </label>
                            <input className="border-4 border-black rounded-lg w-full" type="number" id="price" value={price} onChange={onProductChange} required />
                        </div>
                        <div className="w-full md:w-1/2 pr-4">
                            <label htmlFor="quantity">
                                Product Quantity <span className="text-red-500">*</span>
                            </label>
                            <input className="border-4 border-black rounded-lg w-full" type="number" id="quantity" value={quantity} onChange={onProductChange} required />
                        </div>
                        <div className="w-full md:w-1/2 pl-4">
                            <label htmlFor="expiration">
                                Expiration Date <span className="text-red-500">*</span>
                            </label>
                            <input className="border-4 border-black rounded-lg w-full" type="date" id="expiration" value={expiration} onChange={onProductChange} required />
                        </div>
                        <div className="w-full">
                            <label htmlFor="nutrition">
                                Nutrition <span className="text-red-500">*</span>
                            </label>
                            <input className="border-4 border-black rounded-lg w-full" type="text" id="nutrition" value={nutrition} onChange={onProductChange} required />
                        </div>
                    </div>
                    <button type="submit" className="bg-black text-white font-bold py-2 px-4 rounded mt-4">
                        Add Product
                    </button>
                </form>
            </div>
            <div className="p-6 shadow-lg rounded-lg bg-white border border-red-200 m-4">
                <h2 className="text-xl font-semibold">Categories</h2>
                <form onSubmit={AddCategorySubmit} className="mt-5 text-center text-lg leading-9 tracking-tight text-gray-900">
                            <label htmlFor="catName">
                                Category Name <span className="text-red-500">*</span>
                            </label>
                            <br />
                            <input className="border-4 border-black rounded-lg" type="text" id="catName" value={catName} onChange={onCategoryChange} required />
                            <br />
                            <br />
                           
                            <button type="submit" className="bg-black text-white font-bold py-2 px-4 rounded">
                                Add Category
                            </button>
                            <br />
                        </form>

            </div>
            <div className="p-6 shadow-lg rounded-lg bg-white border border-red-200 m-4">
                <h2 className="text-xl font-semibold">Delete Product</h2>
                <form onSubmit={deleteSubmit} className="mt-5 text-center text-lg leading-9 tracking-tight text-gray-900">
                            <label htmlFor="deleteName">
                                Product Name <span className="text-red-500">*</span>
                            </label>
                            <br />
                            <input className="border-4 border-black rounded-lg" type="text" id="deleteName" value={deleteName} onChange={onDeleteChange} required />
                            <br />
                            <br />
                           
                            <button type="submit" className="bg-black text-white font-bold py-2 px-4 rounded">
                                Delete Product
                            </button>
                            <br />
                        </form>
            </div>
            <div className="p-6 shadow-lg rounded-lg bg-white border border-red-200 m-4">
                <h2 className="text-xl font-semibold">Modify Stock Quantity</h2>
                <form onSubmit={AddStockSubmit} className="mt-5 text-center text-lg leading-9 tracking-tight text-gray-900">
                            <label htmlFor="stockName">
                                Product Name <span className="text-red-500">*</span>
                            </label>
                            <br />
                            <input className="border-4 border-black rounded-lg" type="text" id="stockName" value={stockName} onChange={onStockChange} required />
                            <br />
                            <br />

                            <label htmlFor="stock">
                                Add # of stock? <span className="text-red-500">*</span>
                            </label>
                            <br />
                            <input className="border-4 border-black rounded-lg" type="text" id="stock" value={stock} onChange={onStockChange} required />
                            <br />
                            <br />
                           
                            <button type="submit" className="bg-black text-white font-bold py-2 px-4 rounded">
                                Add Stock
                            </button>
                            <br />
                        </form>
            </div>
        </div>
    </div>
    </div>
    </div>
    </div>
    )
}

export default Modify;