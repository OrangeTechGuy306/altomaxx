"use client"
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import Image from 'next/image'
import Link from 'next/link'






const LoginPage = () => {
  return (
    <div className='min-h-screen flex justify-center items-center'>
        <Card>
            <CardHeader className='flex justify-center items-center'>
                <Image src={'/assets/logo.jpg'} alt='' width={50} height={50}/>
                <CardDescription className='text-xl text-center'>
                    Login
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

               

                   

                    <input type="submit" value={'Register'} className='py-2 px-10 rounded-lg bg-green text-white' />

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