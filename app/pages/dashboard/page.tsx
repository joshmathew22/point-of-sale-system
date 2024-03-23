"use client";
import { NextPage } from "next";
import { useEffect, useState } from "react";
import axios from "axios";

const Dashboard: NextPage = () => {
    return (
        <div className="relative isolate px-6 pt-14 lg:px-8 min-h-screen">
            <a href="../">back</a>
            <div className="mb-5 text-center">
                <h1 className="text-4xl font-extrabold leading-9 tracking-tight ">Dashboard</h1>
                <p className="mt-2 text-lg">Welcome to your control panel.</p>
            </div>
            <div className="max-w-4xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="p-6 shadow-lg rounded-lg bg-white border border-red-200">
                        <h2 className="text-xl font-semibold">Section 1</h2>
                        <p className="mt-2 text-gray-600">This is a placeholder for the first section of your dashboard.</p>
                    </div>
                    <div className="p-6 shadow-lg rounded-lg bg-white border border-red-200">
                        <h2 className="text-xl font-semibold">Section 2</h2>
                        <p className="mt-2 text-gray-600">This is a placeholder for the second section of your dashboard.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;