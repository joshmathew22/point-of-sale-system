"use client"
import Sidebar from "@/app/components/sidebar";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { productReport, userReport, Users, Category, sellerReport} from "@/types";
import axios from "axios";

const addUserReportForm = {
    email:"",
    orderDateStart: "",
    orderDateEnd: ""
}

const addProductReportForm = {
    category:"",
    expirationDate: ""
}

const addSellerReportForm = {
    seller:""
}
const Reports: NextPage = () => {

    const[userReport, setUserReport] = useState<userReport[]>()
    const[productReport, setProductReport] = useState<productReport[]>()
    const[sellerReport, setSellerReport] = useState<sellerReport[]>()
  //console.log(userReport)
 
  //console.log(userReport)
/*
  useEffect(()=>{
    axios
      .get<userReport[]>(`../../api/reportUser?email=${email}`)
      
      .then(response =>{
        if(response.data){
          setUserReport(response.data)
      }})
      .catch((err) => console.log(err));
  },[userReport]);
  */

 //users
  const[users, setUsers] = useState<Users[]>()
  useEffect(()=>{
    axios
      .get<Users[]>('../../api/users')
      .then(response =>{
        if(response.data){
          setUsers(response.data)
      }})
      .catch((err) => console.log(err));
  },[users]);

  const[userReportData, setUserReportData]=useState(addUserReportForm)
  const{email} =userReportData

  const onUserReportChange = (e: React.ChangeEvent<HTMLSelectElement>)=>{
    setUserReportData((prevState)=>({
        ...prevState,
        [e.target.id]: e.target.value
   }));
};

const[userReportDateData, setUserReportDateData]=useState(addUserReportForm)
  const{orderDateStart,orderDateEnd} =userReportDateData
const onUserReportDateChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    setUserReportDateData((prevState)=>({
        ...prevState,
        [e.target.id]: e.target.value
   }));
};
  const userSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();   
    try {
        console.log(orderDateStart,orderDateEnd)
        const response = await axios.get<userReport[]>(`../../api/reportUser?email=${email}&startDate=${orderDateStart}&endDate=${orderDateEnd}`);
        setUserReport(response.data);
    } catch (error) {
        console.error(error);
    }

  }

//products
    const[cat, setCategory] = useState<Category[]>()
    useEffect(()=>{
        axios
        .get<Category[]>(`../../api/category`)
        .then(response =>{
            if(response.data){
            setCategory(response.data)
        }})
        .catch((err) => console.log(err));
    },[cat]);

  const[productReportData, setProductReportData]=useState(addProductReportForm)
  const{category} =productReportData

  const onProductReportChange = (e: React.ChangeEvent<HTMLSelectElement>)=>{
    setProductReportData((prevState)=>({
        ...prevState,
        [e.target.id]: e.target.value
   }));
};

const[productDateReportData, setProductDateReportData]=useState(addProductReportForm)
  const{expirationDate} =productDateReportData

  const onProductDateChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
    setProductDateReportData((prevState)=>({
        ...prevState,
        [e.target.id]: e.target.value
   }));
};

  const productSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();   
    try {
        const response = await axios.get<productReport[]>(`../../api/reportProduct?category=${category}&expirationDate=${expirationDate}`);
        setProductReport(response.data);
    } catch (error) {
        console.error(error);
    }
  }

//sellers
    const[supplier, setSupplier] = useState<sellerReport[]>()
        useEffect(()=>{
            axios
            .get<sellerReport[]>(`../../api/supplier`)
            .then(response =>{
                if(response.data){
                setSupplier(response.data)
            }})
            .catch((err) => console.log(err));
        },[supplier]);

    const[sellerReportData, setSellerReportData]=useState(addSellerReportForm)
    const{seller} =sellerReportData

    const onSellerReportChange = (e: React.ChangeEvent<HTMLSelectElement>)=>{
        setSellerReportData((prevState)=>({
            ...prevState,
            [e.target.id]: e.target.value
    }));
    };
    const sellerSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();   
        try {
            const response = await axios.get<sellerReport[]>(`../../api/reportSeller?seller=${seller}`);
            setSellerReport(response.data);
        } catch (error) {
            console.error(error);
        }
    }


    return(
        <div className="flex min-h-screen">
            <Sidebar/>
            <div className="flex-1 flex justify-center items-center">
                <div className="relative isolate px-6 pt-14 lg:px-8 min-h-screen">
                    <div className="mb-5 text-center">
                        <h1 className="text-4xl font-extrabold leading-9 tracking-tight">Dashboard</h1>
                        <p className="mt-2 text-2xl">Reports</p>
                    </div>
                    <div className="relative overflow-x-auto">
                        <div className="p-6 shadow-lg rounded-lg bg-white border border-red-200 m-4">
                            <h2 className="text-xl font-semibold">User Report</h2>
                            <form onSubmit={userSubmit} className="mt-5 text-center text-lg leading-9 tracking-tight text-gray-900">
                                        <label htmlFor="email">
                                            Email<span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            id="email"
                                            className="border-4 border-black rounded-lg w-full"
                                            value={email}
                                            onChange={onUserReportChange}
                                            required
                                        >
                                            <option>Select One</option>
                                            {users?.map((user, index) => (
                                                <option key={index} value={user.Email}>{user.Email}</option>
                                            ))}

                                            {/* Add more options as needed */}
                                        </select>
                                        <div className="flex justify-center mt-5">
                                            <div className="text-center text-lg leading-9 tracking-tight text-gray-900 mr-4">
                                                <label htmlFor="orderDateStart">
                                                    Order Date From<span className="text-red-500">*</span>
                                                </label>
                                                <input className="border-4 border-black rounded-lg w-full" type="date" id="orderDateStart" value={orderDateStart} onChange={onUserReportDateChange} required />
                                            </div>
                                            <div className="text-center text-lg leading-9 tracking-tight text-gray-900">
                                                <label htmlFor="orderDateEnd">
                                                    Order Date To <span className="text-red-500">*</span>
                                                </label>
                                                <input className="border-4 border-black rounded-lg w-full" type="date" id="orderDateEnd" value={orderDateEnd} onChange={onUserReportDateChange} required />
                                            </div>
                                        </div>
                                        <button type="submit" className="bg-black text-white font-bold py-2 px-4 rounded">
                                            Generate User Report
                                        </button>
                                        <br />
                                    </form>
                                    

                        </div>
                        
                    {userReport ?(
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Email
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        UserID
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        OrderDate
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        TotalPrice
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        QuantityTotal
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {userReport?.map((report, index) => (
                                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {report.Email}
                                        </td>
                                        <td className="px-6 py-4">
                                            {report.Name}
                                        </td>
                                        <td className="px-6 py-4">
                                            {report.UserID}
                                        </td>
                                        <td className="px-6 py-4">
                                            {(() => {
                                                const orderDate = new Date(report.OrderDate);
                                                orderDate.setDate(orderDate.getDate() + 1); // Advance the date by one day
                                                return orderDate.toLocaleDateString();
                                            })()}
                                            </td>
                                        <td className="px-6 py-4">
                                             {report.TotalPrice.toFixed(2)} $
                                        </td>
                                        <td className="px-6 py-4">
                                            {report.QuantityTotal}
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )
                    :
                    null}
                    </div>
                    
                    <div className="relative overflow-x-auto">
                        <div className="p-6 shadow-lg rounded-lg bg-white border border-red-200 m-4">
                            <h2 className="text-xl font-semibold">Product Report</h2>
                            <form onSubmit={productSubmit} className="mt-5 text-center text-lg leading-9 tracking-tight text-gray-900">
                                        <label htmlFor="category">
                                            Category<span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            id="category"
                                            className="border-4 border-black rounded-lg w-full"
                                            value={category}
                                            onChange={onProductReportChange}
                                            required
                                        >
                                            <option>Select One</option>
                                            {cat?.map((category, index) => (
                                                <option key={index} value={category.CategoryName}>{category.CategoryName}</option>
                                            ))}

                                            {/* Add more options as needed */}
                                        </select>
                                        <div className="flex justify-center mt-5">
                                            <div className="text-center text-lg leading-9 tracking-tight text-gray-900 mr-4">
                                                <label htmlFor="expirationDate">
                                                    Expiration Date Before<span className="text-red-500">*</span>
                                                </label>
                                                <input className="border-4 border-black rounded-lg w-full" type="date" id="expirationDate" value={expirationDate} onChange={onProductDateChange} required />
                                            </div>
                                        </div>
                                        <button type="submit" className="bg-black text-white font-bold py-2 px-4 rounded">
                                            Generate User Report
                                        </button>
                                        <br />
                                    </form>

                        </div>
                    {productReport ?(
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        ID
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Price
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Expiration Date
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Amount Sold
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Stock Quantity
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        ProductsValue
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {productReport?.map((report, index) => (
                                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {report.ProductID}
                                        </td>
                                        <td className="px-6 py-4">
                                            {report.ProductName}
                                        </td>
                                        <td className="px-6 py-4">
                                            {report.Price}
                                        </td>
                                        <td className="px-6 py-4">
                                            {new Date(report.ExpirationDate).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            {report.AmountSoldLifeTime}
                                        </td>
                                        <td className="px-6 py-4">
                                            {report.StockQuantity}
                                        </td>
                                        <td className="px-6 py-4">
                                            {report.ProductsValue}
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )
                    :
                    null}
                    </div>


                 <div className="relative overflow-x-auto">
                        <div className="p-6 shadow-lg rounded-lg bg-white border border-red-200 m-4">
                            <h2 className="text-xl font-semibold">Supplier Report</h2>
                            <form onSubmit={sellerSubmit} className="mt-5 text-center text-lg leading-9 tracking-tight text-gray-900">
                                        <label htmlFor="seller">
                                            Seller<span className="text-red-500">*</span>
                                        </label>
                                        <select
                                            id="seller"
                                            className="border-4 border-black rounded-lg w-full"
                                            value={seller}
                                            onChange={onSellerReportChange}
                                            required
                                        >
                                            <option>Select One</option>
                                            {supplier?.map((user, index) => (
                                                <option key={index} value={user.SupplierName}>{user.SupplierName}</option>
                                            ))}

                                            {/* Add more options as needed */}
                                        </select>
                                    
                                        <button type="submit" className="bg-black text-white font-bold py-2 px-4 rounded">
                                            Generate Supplier Report
                                        </button>
                                        <br />
                                    </form>

                        </div>
                    {sellerReport ?(
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Supplier Name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Supplies
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Unit Price
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Stock Quantity
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Total Value
                                    </th>
                                   
                                    
                                </tr>
                            </thead>
                            <tbody>
                                {sellerReport?.map((report, index) => (
                                    <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                            {report.SupplierName}
                                        </td>
                                        <td className="px-6 py-4">
                                            {report.Supplies}
                                        </td>
                                        <td className="px-6 py-4">
                                            {report.UnitPrice}
                                        </td>
                                        <td className="px-6 py-4">
                                            {report.StockQuantity}
                                        </td>
                                        <td className="px-6 py-4">
                                            {report.TotalValue}
                                        </td>
                                      

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )
                    :
                    null}
                    </div>            
                </div>


            </div>
        </div>
    )
}

export default Reports;