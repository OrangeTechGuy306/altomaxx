"use client"
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { APIROUTE } from '@/utils/apiroutes'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Toaster, toast } from 'sonner'





const LoginPage = () => {


    const navigate = useRouter()
    const [user, setUser] = useState({
        username:"",
        password:"",
    })

    const {username,  password} = user

    const validateUser = async()=>{  
        if(username.trim() === "" || password.trim() === ""){
            toast.error('All fields are required!')
        }else{
            const {data} = await axios.post(`${APIROUTE}/get/user`, {username, password})
            if(data.status === false){
                toast.error(data.msg)
            }else{
                toast.success("Login successful")
                console.log(data.msg)
                localStorage.setItem("altomaxx", JSON.stringify(
                    data.msg.user[0]))

                setTimeout(()=>{
                    navigate.push("/")
                },3000)
            }
        }
    }

    const handleChange = (e: any)=>{
        setUser({...user, [e.target.name]: e.target.value})
    }

   

    const loginUser = (e: any)=>{
        e.preventDefault()
        validateUser()
    }



  return (


    <div className='min-h-screen flex justify-center items-center lFormContainer'>
        <Card className='lformCard '>
            <CardHeader className='flex justify-center items-center'>
                <Image src={'/assets/logo.jpg'} alt='' width={50} height={50}/>
                <CardDescription className='text-xl text-center'>
                    Login
                </CardDescription>
            </CardHeader>
            <CardContent>

                <form action="" onSubmit={loginUser}>

                   <Toaster position='top-right' richColors />

                    <Input type='text' placeholder='Enter your mobile NO.' name='username' className='w-[300px]' onChange={handleChange}/>

                    <Input type='password' placeholder='Enter your password' name='password' className='w-[300px] my-3' onChange={handleChange}/>

                    <input type="submit" value={'Login'} className='py-2 px-10 rounded-lg bg-green text-white' />

                    <div className='my-3'>
                        <small>Don&apos;t have an Account? <Link href={'/signup'}>Sign up</Link> </small>
                    </div>
                    
                </form>
            </CardContent>
        </Card>
    </div>
  )
}

export default LoginPage