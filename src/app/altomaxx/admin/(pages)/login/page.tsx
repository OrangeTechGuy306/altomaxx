"use client"
import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { APIROUTE } from '@/utils/apiroutes'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { Toaster, toast } from 'sonner'

const AdminLogin = () => {

    const [admin, setAdmin] = useState({
        email:"",
        password:""
    })
    const navigate = useRouter()

    const {email, password} = admin

    const handleChange = (e:any)=>{
        setAdmin({...admin, [e.target.name]:e.target.value})
    }

    const validateAdmin = async()=>{  
        if(email.trim() === "" || password.trim() === ""){
            toast.error('All fields are required!')
        }else{
            const {data} = await axios.post(`${APIROUTE}/get/admin`, {email, password})
            if(data.status === false){
                toast.error(data.msg)
            }else{
                toast.success("Login successful")
                setTimeout(()=>{
                    navigate.push("/altomaxx/admin/users")
                }, 3000)
                
                localStorage.setItem("altomaxx_admin", JSON.stringify(
                    data.msg[0]))
            }
        }
    }

    const handleSubmit = (e:any)=>{
        e.preventDefault()
        validateAdmin()
    }


  return (
    <div className='flex min-h-screen justify-center items-center'>
        <Card>
            <CardHeader>
                Admin Login
            </CardHeader>
            <CardContent>
                <form action="" onSubmit={handleSubmit}>
                    <Toaster richColors position='top-right'/>
                    <div className='my-5'>
                        <label htmlFor="">Email</label>
                        <Input type='email' placeholder='Enter admin email' className='w-[300px]' name='email' onChange={handleChange} /> 
                    </div>
                    <div className='my-5'>
                        <label htmlFor="">Password</label>
                        <Input type='password' placeholder='Enter Password' className='w-[300px]' name='password' onChange={handleChange}/> 
                    </div>
                    <input type="submit" value={"Login"} className='bg-green py-1 px-3 text-white rounded-md' />
                </form>
            </CardContent>
        </Card>
    </div>
  )
}

export default AdminLogin