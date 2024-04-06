"use client"
import Sidebar from "@/app/components/sidebar";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import { userReport } from "@/types";
import axios from "axios";
const Reports: NextPage = () => {

    const[userReport, setUserReport] = useState<userReport[]>()
  useEffect(()=>{
    axios
      .get<userReport[]>('../../api/reportUser')
      
      .then(response =>{
        if(response.data){
          setUserReport(response.data)
      }})
      .catch((err) => console.log(err));
  },[userReport]);
  //console.log(userReport)
 
  //console.log(userReport)
    return(
        <div className="flex min-h-screen">
            <Sidebar/>
            <div className="flex-1 flex justify-center items-center">
                <div className="relative isolate px-6 pt-14 lg:px-8 min-h-screen">
                    <div className="mb-5 text-center">
                        <h1 className="text-4xl font-extrabold leading-9 tracking-tight">Reports</h1>
                    </div>
                    <div className="relative overflow-x-auto">
                        <div>User Report</div>
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
                                        Last Purchased Amount
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Number of Orders
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        Average Spend
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
                                            {new Date(report.LastPurchasedDate).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            {report.NumberOfOrders}
                                        </td>
                                        <td className="px-6 py-4">
                                            {report.AverageSpend}
                                        </td>

                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>

                 </div>
            </div>
        </div>
    )
}

export default Reports;