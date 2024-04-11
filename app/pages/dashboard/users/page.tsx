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

const addAdminForm = {
    UserID:"",
    ManagerID: ""
}
const Users: NextPage = () => {
    var PID:number;
    var CID:number;
    CID = -1;
    var ID:number;


    const[users, setUsers] = useState<Users[]>()

    const[admin, setAdmin] = useState<Manager[]>()

    const[addAdminFormData,setAdminFormData]=useState(addAdminForm)
    const{UserID} =addAdminFormData

    //get all categories from database


    useEffect(()=>{
        axios
        .get<Users[]>('../../api/users')
        .then(response =>{
            if(response.data){
            setUsers(response.data)
            
            //console.log(restock)
        }})
        .catch((err) => console.log(err));
    },[users]);
   
    useEffect(()=>{
        axios
        .get<Manager[]>('../../api/admin')
        .then(response =>{
            if(response.data){
            setAdmin(response.data)
            
            //console.log(restock)
        }})
        .catch((err) => console.log(err));
    },[admin]);
    //modify restockMSG

    
    const onAdminChange = (e: React.ChangeEvent<HTMLSelectElement>)=>{
        setAdminFormData((prevState)=>({
            ...prevState,
            [e.target.id]: e.target.value
            //name: e.target.value
        }));
    };
    const AddAdminSubmit = async (e: React.FormEvent<HTMLFormElement>) =>{
        e.preventDefault();
        
        ID = generateRandomId(8);
        axios.post('../../api/admin', {
            ManagerID: ID,
            UserID: UserID,

        }) .then(()=>{
            toast("user added!")
            setAdminFormData(addAdminForm);
            //UID= UID+1
        }) .catch(function(error){
            toast.error("something went wrong")
        })
    }
   
    return (
        <div className="flex min-h-screen">
    <Sidebar/>
    <div className="flex-1 flex justify-center items-center">
        <div className="relative isolate px-6 pt-14 lg:px-8 min-h-screen">
    
    <div className="mb-5 text-center">
        <h1 className="text-4xl font-extrabold leading-9 tracking-tight">Dashboard</h1>
        <p className="mt-2 text-2xl">Users</p>
    </div>
    <div className="max-w-4xl mx-auto">
        <div className="flex flex-wrap justify-center">
            

        <div className="max-w-4xl mx-auto">
             <div className="p-6 shadow-lg rounded-lg bg-white border border-red-200 m-4">
                    <h2 className="text-xl font-semibold">Grant Admin Role To User</h2>
                    <form onSubmit={AddAdminSubmit} className="mt-5 text-center text-lg leading-9 tracking-tight text-gray-900">
                                <label htmlFor="UserID">
                                    User Email <span className="text-red-500">*</span>
                                </label>
                            

                                <select
                                    id="UserID"
                                    className="border-4 border-black rounded-lg w-full"
                                    value={UserID}
                                    onChange={onAdminChange}
                                    required
                                >
                                    <option>Select One</option>
                                    {users?.map((user, index) => {
                                        console.log(users,admin)
                                        let isAdmin = false;
                                        for (const adminItem of admin || []) {
                                            if (adminItem?.UserID === user.UserID) {
                                                isAdmin = true;
                                                break;
                                            }
                                        }
                                        if (!isAdmin) {
                                            return (
                                                <option key={index} value={user.UserID}>{user.Email}</option>
                                            );
                                        }
                                        return null; // or you can render an alternative if desired
                                    })}



                                    {/* Add more options as needed */}
                                    
                                </select>

                                
                                <button type="submit" className="bg-black text-white font-bold py-2 px-4 rounded">
                                    Add Admin
                                </button>
                                <br />
                            </form>
                </div>
                <div className="flex justify-center">
    <div className="flex flex-wrap">
        <div className="p-6 shadow-lg rounded-lg bg-white border border-red-200 m-4">
            <h2 className="text-xl font-semibold">Users</h2>
            {users?.map((user, index) => {
                console.log(users,admin)
                let isAdmin = false;
                for (const adminItem of admin || []) {
                    if (adminItem?.UserID === user.UserID) {
                        isAdmin = true;
                        break;
                    }
                }
                if (!isAdmin) {
                    return (
                        <option key={index} value={user.UserID}>{user.Email}</option>
                    );
                }
                return null;
            })}
        </div>
        <div className="p-6 shadow-lg rounded-lg bg-white border border-red-200 m-4">
            <h2 className="text-xl font-semibold">Admin</h2>
            {users?.map((user, index) => {
                console.log(users,admin)
                let isAdmin = false;
                for (const adminItem of admin || []) {
                    if (adminItem?.UserID === user.UserID) {
                        isAdmin = true;
                        break;
                    }
                }
                if (isAdmin) {
                    return (
                        <option key={index} value={user.UserID}>{user.Email}</option>
                    );
                }
                return null;
            })}
        </div>
    </div>
</div>

            
            
           
                </div>
    </div>
</div>
</div>
</div>
</div>
                    
                    
    );
};

export default Users;