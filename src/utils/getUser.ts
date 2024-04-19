"use client"
import { useEffect, useState } from "react"
import { userType } from "./userType"




export const useUser = ()=>{

    const [user, setUser] = useState<userType>()
    
   
    
    useEffect(()=>{
         const currentUser = JSON.parse(localStorage.getItem("altomaxx") as any)
         console.log(currentUser)
         setUser(currentUser)
    },[])



    return {user}
}