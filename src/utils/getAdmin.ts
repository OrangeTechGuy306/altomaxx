"use client"

import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'


type adminType ={
  email:String
}

const useGetAdmin = () => {

    const navigate = useRouter()
    const [superAdmin, setSuperAdmin] = useState<adminType>()

    const isAdmin = ()=>{
        const storage = JSON.parse(localStorage.getItem("altomaxx_admin") as any) 
        if(!storage){
          navigate.push("/altomaxx/admin/login")
        }else{
          setSuperAdmin(storage)
        }
      }
    
      useEffect(()=>{
        isAdmin()
      },[])
  return {isAdmin, superAdmin}
}

export default useGetAdmin