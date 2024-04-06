"use client"
import Sidebar from "@/app/components/sidebar";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { userReport, Users } from "@/types";
import axios from "axios";

const addUserReportForm = {
    email:""
}
const Reports: NextPage = () => {

    const[userReport, setUserReport] = useState<userReport[]>()
    
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
  const[users, setProducts] = useState<Users[]>()
  useEffect(()=>{
    axios
      .get<Users[]>('../../api/users')
      .then(response =>{
        if(response.data){
          setProducts(response.data)
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
  const userSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
    e.preventDefault();   
    try {
        const response = await axios.get<userReport[]>(`../../api/reportUser?email=${email}`);
        setUserReport(response.data);
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
                                            {users?.map((user, index) => (
                                                <option key={index} value={user.Email}>{user.Email}</option>
                                            ))}

                                            {/* Add more options as needed */}
                                        </select>
                                    
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
                                            {new Date(report.OrderDate).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            {report.TotalPrice}
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

                 </div>
            </div>
        </div>
    )
}

export default Reports;