import { create } from "zustand"
import { persist } from "zustand/middleware"

interface userState{
    user:number
    updateUser:(user:number) =>void
    signOut:(user:number) =>void
}

export const userStore = create<userState>()(persist((set)=>({
    user:0,
    updateUser: (user:number)=>set({user}),
    signOut:(user:number)=>set({user})
}),{
    name:"user store"
}))
