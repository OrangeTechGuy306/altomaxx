"use client"
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

const SignUpPage = () => {
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
                <form action="">
                    <div className='flex justify-start items-center my-3'>
                        <h3 className='bg-silver py-2 px-3'>+234</h3>
                        <Input type='text' placeholder='Enter your mobile NO.' name='mobile' className='w-[235px]' onChange={()=>{}}/>
                    </div>
                    <Input type='password' placeholder='Enter your password' name='password' className='w-[300px] my-3' onChange={()=>{}}/>

                    <Input type='password' placeholder='Confirm password' name='cpass' className='w-[300px] my-3' onChange={()=>{}}/>

                    <Input type='text' placeholder='Referral Code' name='cpass' className='w-[300px] my-3' onChange={()=>{}}/>

                    <div className='flex justify-start items-center my-3'>
                        <Input type='text' placeholder='Verification Code' name='mobile' className='w-[235px]' onChange={()=>{}}/>
                        <h3 className='bg-silver py-2 px-3'>2399</h3>
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