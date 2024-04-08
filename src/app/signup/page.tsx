"use client"
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Toaster, toast } from 'sonner'




const SignUpPage = () => {

    const navigate = useRouter()
    const [random, setRandom] = useState(0)
    const [user, setUser] = useState({
        mobile:"",
        password:"",
        cpass:"",
        ref:"",
        ver:"",
    })

    const handleChange = (e:any)=>{
        setUser({...user, [e.target.name]: e.target.value})
    }

    const {mobile, password, cpass, ref, ver} = user

    const getRandom= ()=>{
        // const verRandom = Math.floor(Math.random() * 900 + 99)
        setRandom(Math.floor(Math.random() * 900 + 99))
    }
    const validateUser = ()=>{  
        if(mobile.trim() === "" || password.trim() === "" || cpass.trim() === "" || ver.trim() === ""){
            toast.error('All fields are required!')
            // console.log("All fields are required!")
        }else if(mobile.length < 10 || mobile.length > 10){
            toast.error("Invalid Mobile number")
            // console.log("Invalid Mobile number")
        }else if(password.length <= 5){
            toast.error("Password should be more than 5 character")
        }else if(password !== cpass){
            toast.error("Password do not match")
        }else if(parseInt(ver)  !==  random){
            toast.error("Invalid Verification Code")
        }else{
            localStorage.setItem("user",JSON.stringify({mobile}))
            toast.success("Registration successful")
            setTimeout(()=>{
                navigate.push("/")
            },3000)
        }
    }

    const addUser =(e: any)=>{
        e.preventDefault()
        validateUser()
    }

    useEffect(()=>{
        getRandom()
    },[])


  return (
    <div className='min-h-screen flex justify-center items-center'>
        <Card>
            <CardHeader className='flex justify-center items-center'>
                <Image src={'/assets/logo.jpg'} alt='' width={50} height={50}/>
                <CardDescription className='text-xl text-center'>
                    Account Registration
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form action="" onSubmit={addUser}>
                    <Toaster position='top-right' richColors />
                    <div className='flex justify-start items-center my-3'>
                        <h3 className='bg-silver py-2 px-3'>+234</h3>
                        <Input type='text' placeholder='Enter your mobile NO.' name='mobile' className='w-[235px]' onChange={handleChange}/>
                    </div>
                    <Input type='password' placeholder='Enter your password' name='password' className='w-[300px] my-3' onChange={handleChange}/>

                    <Input type='password' placeholder='Confirm password' name='cpass' className='w-[300px] my-3' onChange={handleChange}/>

                    <Input type='text' placeholder='Referral Code' name='ref' className='w-[300px] my-3' onChange={handleChange}/>

                    <div className='flex justify-start items-center my-3'>
                        <Input type='text' placeholder='Verification Code' name='ver' className='w-[235px]' onChange={handleChange}/>
                        <h3 className='bg-silver py-2 px-3'>{random}</h3>
                    </div>

                    <input type="submit" value={'Register'} className='py-2 px-10 rounded-lg bg-green text-white' />

                    <div className='my-3'>
                        <small>Already have an Account? <Link href={'/login'}>Login</Link> </small>
                    </div>
                    
                </form>
            </CardContent>
        </Card>
    </div>
  )
}

export default SignUpPage