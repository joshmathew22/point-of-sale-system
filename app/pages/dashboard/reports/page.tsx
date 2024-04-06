import Sidebar from "@/app/components/sidebar";
import { NextPage } from "next";
import { useEffect, useState } from "react";

const Reports: NextPage = () => {
    return(
        <div className="flex min-h-screen">
            <Sidebar/>
            <div className="flex-1 flex justify-center items-center">
            <div className="relative isolate px-6 pt-14 lg:px-8 min-h-screen">
        
            <div className="mb-5 text-center">
                <h1 className="text-4xl font-extrabold leading-9 tracking-tight">Reports</h1>
            </div>
            </div>
            </div>
        </div>
    )
}

export default Reports;