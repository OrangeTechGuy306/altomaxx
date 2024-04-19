"use client"
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { APIROUTE } from '@/utils/apiroutes'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import { Toaster, toast } from 'sonner'




const SignUpPage = () => {

    const navigate = useRouter()
    const [random, setRandom] = useState(0)
    const [user, setUser] = useState({
        username:"",
        mobile:"",
        email:"",
        password:"",
        cpass:"",
        ref:"",
        ver:"",
    })

    const handleChange = (e: any)=>{
        setUser({...user, [e.target.name]: e.target.value})
    }

    const {username, email, mobile, password, cpass, ref, ver} = user

    const getRandom= ()=>{
        setRandom(Math.floor(Math.random() * 900 + 99))
    }

    const validateUser = async()=>{  
        //   console.log(refer)
        if(username.trim() === "" || mobile.trim() === "" || password.trim() === "" || email.trim() === "" || cpass.trim() === "" || ver.trim() === ""){
            toast.error('All fields are required!')
        }else if(username.length < 3){
            toast.warning('username can not be less than 3 characters')
        }else if(mobile.length < 10 || mobile.length > 10){
            toast.warning("Invalid Mobile number")
        }else if(password.length <= 5){
            toast.warning("Password should be more than 5 character")
        }else if(password !== cpass){
            toast.error("Password do not match")
        }else if(parseInt(ver)  !==  random){
            toast.error("Invalid Verification Code")
        }else{
            const {data} = await axios.post(`${APIROUTE}/add/user`, {username, mobile, password, cpass, ref, email})
            if(data.status === false){
                toast.error(data.msg)
            }else{
                toast.success(data.msg)
                toast.success("Registration successful")
                setTimeout(()=>{
                    navigate.push("/login")
                },3000)
            }
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
    <div className='min-h-screen flex justify-center items-center rFormContainer'>
        <Card className='rformCard'>
            <CardHeader className='flex justify-center items-center'>
                <Image src={'/assets/logo.jpg'} alt='' width={50} height={50}/>
                <CardDescription className='text-xl text-center text-black'>
                    Account Registration
                </CardDescription>
            </CardHeader>
            <CardContent>

                <form action="" onSubmit={addUser}>

                    <Toaster position='top-right' richColors />

                    <Input type='text' placeholder='Enter your Username' name='username' className='w-[300px] my-3' onChange={handleChange}/>

                    <div className='flex justify-start items-center my-3'>
                        <h3 className='bg-silver py-2 px-3'>+234</h3>
                        <Input type='text' placeholder='Enter your mobile NO.' name='mobile' className='w-[235px]' onChange={handleChange}/>
                    </div>

                    <Input type='email' placeholder='Enter your Email' name='email' className='w-[300px] my-3' onChange={handleChange}/>

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