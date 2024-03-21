"use client";

import { NextPage } from "next";
import { useState } from "react";
import { Users } from "@/types";
import axios from "axios";
import toast from "react-hot-toast";

const defaultFormData = {
    fn: "",
    ln: "",
    un: "",
    pass: "",
    address: "",
    number: "",
    email: ""
};

function generateRandomUserId(length: number): number {
    const min = Math.pow(10, length - 1); // Minimum value based on the length
    const max = Math.pow(10, length) - 1; // Maximum value based on the length
    return Math.floor(Math.random() * (max - min + 1)) + min;
}



//const createAccount: NextPage = () => {
export default function createAccount(){
    var UID:number;
    const[formData, setFormData] = useState(defaultFormData)
    const{fn,ln,un,pass,address,number,email} = formData;

    const onChange = (e: React.ChangeEvent<HTMLInputElement>)=>{
        setFormData((prevState)=>({
            ...prevState,
            [e.target.id]: e.target.value
        }));
    };

    const onSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        //console.log(formData);

        const userIdLength = 8; // You can adjust the length of the user ID as needed
        UID = generateRandomUserId(userIdLength);
        //console.log(UID);

        //creating user and sending data to database
        axios.post('../../api/users', {
            UserID: UID,
            FirstName: fn,
            LastName: ln,
            Username: un,
            Pass: pass,
            Address: address,
            Email: email,
            PhoneNumber:number
        }) .then(()=>{
            toast("user added!")
            setFormData(defaultFormData);
            UID= UID+1
        }) .catch(function(error){
            toast.error("something went wrong")
        })


        //setFormData(defaultFormData);
    };

    return (
        <>
            <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                Create Account
            </h2>
            <form onSubmit={onSubmit} className="mt-5 text-center text-lg leading-9 tracking-tight text-gray-900">
                <label htmlFor="fn">
                    First Name <span className="text-red-500">*</span>
                </label>
                <br />
                <input className="border-4 border-black rounded-lg" type="text" id="fn" value={fn} onChange={onChange} required />
                <br />
                <br />
    
                <label htmlFor="ln">
                    Last Name <span className="text-red-500">*</span>
                </label>
                <br />
                <input className="border-4 border-black rounded-lg" type="text" id="ln" value={ln} onChange={onChange} required />
                <br />
                <br />
                
                <label htmlFor="un">
                    Username <span className="text-red-500">*</span>
                </label>
                <br />
                <input className="border-4 border-black rounded-lg" type="text" id="un" value={un} onChange={onChange} required />
                <br />
                <br />
    
                <label htmlFor="pass">
                    Password <span className="text-red-500">*</span>
                </label>
                <br />
                <input className="border-4 border-black rounded-lg" type="password" id="pass" value={pass} onChange={onChange} required />
                <br />
                <br />
    
                <label htmlFor="address">
                    Address <span className="text-red-500">*</span>
                </label>
                <br />
                <input className="border-4 border-black rounded-lg" type="text" id="address" value={address} onChange={onChange} required />
                <br />
                <br />
    
                <label htmlFor="number">
                    Number <span className="text-red-500">*</span>
                </label>
                <br />
                <input className="border-4 border-black rounded-lg" type="text" id="number" value={number} onChange={onChange} required />
                <br />
                <br />
    
                <label htmlFor="email">
                    E-mail <span className="text-red-500">*</span>
                </label>
                <br />
                <input className="border-4 border-black rounded-lg" type="email" id="email" value={email} onChange={onChange} required />
                <br />
                <br />
    
                <button type="submit" className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded">
                    Create Profile
                </button>
                <br />
                <a href="/pages/login" className="inline-block bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded shadow">
                    Back
                </a>
            </form>
        </>
    );

}
