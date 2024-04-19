"use client"
import axios from "axios"
import { APIROUTE } from "./apiroutes"
import { useUser } from "./getUser"
import { userType } from "./userType"
import { useEffect, useState } from "react"


export const useWallet = ()=>{

    // const {user} = useUser()
    
   const [user, setUser] = useState<userType>()
    const [balance, setBalance] = useState()
   
   

   const getUserWallet = async()=>{
    const currentUser = JSON.parse(localStorage.getItem("altomaxx") as any)
    setUser(currentUser)
    const {data} = await axios.get(`${APIROUTE}/user/wallet/${currentUser?.username}`)
    if(data.status != false){
        setBalance(data.msg)
    }else{
        setBalance(data.msg[0].total)
    }
}


useEffect(()=>{
    getUserWallet()
},[])

    return{
        user, balance
    }

}