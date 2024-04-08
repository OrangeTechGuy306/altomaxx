"use client"

import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import Link from 'next/link'
import React, { useState } from 'react'
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import Footer from '@/comps/footer'





const DepositPage = () => {

    const [price, setPrice] = useState([])

    const prices: Array<String> = [
        "7500", "2000", "4000", "8000", "12000", "17500", "25000", "60000", "100000", "250000", "350000", "500000" 
      ]

      const [choose, setChoose] = useState(false)

    const handleChange = ()=>{}
    const handlePrice = ()=>{}


  return (
    <section>
       <div className='depositionHeroSection min-h-[50vh]'>
        <h1>Deposit amount（ Minimum deposit is ₦ 2,000 ）</h1>
       </div>

       <div className='flex justify-center items-center my-5'>

        <div className='bg-black w-[max-content] rounded-xl flex justify-center items-center p-3'>
            <Link href={'/issue'} className='text-white text-center'><small className='text-center'> If the deposit is not credited <br /> please click this button to submit the deposit voucher</small></Link>
        </div>

       </div>


        <div className='flex flex-col justify-center items-center gap-5'>
            <div className='flex gap-3'>
                <Button className='w-[100px]' onClick={()=>{
                    setPrice(prices[0] as any)
                    setChoose(true)
                }}>7500</Button>
                <Button className='w-[100px]'onClick={()=>{
                    setPrice(prices[1] as any)
                    setChoose(true)
                }}>2000</Button>
                <Button className='w-[100px]' onClick={()=>{
                    setPrice(prices[2] as any)
                    setChoose(true)
                }}>4000</Button>
                <Button className='w-[100px]'onClick={()=>{
                    setPrice(prices[3] as any)
                    setChoose(true)
                }}>8000</Button>
            </div>
            <div  className='flex gap-3'>
                <Button className='w-[100px]' onClick={()=>{
                    setPrice(prices[4] as any)
                    setChoose(true)
                }}>12000</Button>
                <Button className='w-[100px]' onClick={()=>{
                    setPrice(prices[5] as any)
                    setChoose(true)
                }}>17500</Button>
                <Button className='w-[100px]' onClick={()=>{
                    setPrice(prices[6] as any)
                    setChoose(true)
                }}>25000</Button>
                <Button className='w-[100px]' onClick={()=>{
                    setPrice(prices[7] as any)
                    setChoose(true)
                }}>60000</Button>
            </div>
            <div  className='flex gap-3'>
                <Button className='w-[100px]' onClick={()=>{
                    setPrice(prices[8] as any)
                    setChoose(true)
                }}>100000</Button>
                <Button className='w-[100px]' onClick={()=>{
                    setPrice(prices[9] as any)
                    setChoose(true)
                }}>250000</Button>
                <Button className='w-[100px]' onClick={()=>{
                    setPrice(prices[10] as any)
                    setChoose(true)
                }}>350000</Button>
                <Button className='w-[100px]' onClick={()=>{
                    setPrice(prices[11] as any)
                    setChoose(true)
                }}>500000</Button>
            </div>
        </div>

        <div className=' flex justify-center items-center my-10'>
            <form action="" onSubmit={(e:any)=>{e.preventDefault()}}>
                <div className='flex items-center'>
                    <small className='text-xl font-bold bg-silver py-1 px-3'>&#8358;</small>
                   { choose ? <Input type='number' name='' onChange={handleChange} className='w-[300px]' placeholder='Enter Deposit amount here...'  value={price}/> : <Input type='number' name='' onChange={handleChange} className='w-[300px]' placeholder='Enter Deposit amount here...'/>}
                </div>
                <div className='my-5'>
                    <h2>Deposit Channels</h2>
                <Dialog>
                    <DialogTrigger>
                    <input type='submit' value={'Deposit Now'} className='py-2 px-5 bg-green w-[100%] my-5 rounded-xl cursor-pointer text-white' />
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                        <DialogTitle  className='my-5'>Amount: &#8358; 12000 </DialogTitle>
                        <DialogDescription>
                            <Input type='text' placeholder='Enter the sender name'/>
                        </DialogDescription>
                        </DialogHeader>
                        <div className='my-10'>
                            <div className='flex justify-between items-center my-3'>
                                <h1>Acount Number</h1>
                                <h1>892892742</h1>
                            </div>
                            <div className='flex justify-between items-center my-3'>
                                <h1>Bank Name</h1>
                                <h1>Moniepoint</h1>
                            </div>
                            <div className='flex justify-between items-center my-3'>
                                <h1>Account Name</h1>
                                <h1>altomaxx</h1>
                            </div>
                        </div>
                        <hr />
                        <ul className='text-red'>
                            <li>Open your bank app and make the transfer</li>
                            <li>Copy the bank account shown below</li>
                            <li>Enter the amount shown above</li>
                        </ul>
                        <Button>I have Paid</Button>
                    </DialogContent>
                </Dialog>
                    {/* <input type='submit' value={'Deposit Now'} className='py-2 px-5 bg-green w-[100%] my-5 rounded-xl cursor-pointer text-white' /> */}
                </div>
            </form>
        </div>

        <div className='mb-20'>
            <h1 className='text-center font-bold my-5'>Deposit instructions</h1>
            <ol className='w-[40%] mx-auto bg-silver p-3 rounded-xl'>
                <li className='text-sm my-2'>.The recharge order amount must be consistent with the final payment amount. Inconsistency will result in failure.</li>
                <li className='text-sm my-2'>The minimum recharge amount is ₦2000. If the amount is lower than the minimum amount, it will not be credited.</li>
                <li className='text-sm my-2'> Please check the account information carefully when transferring money to avoid payment errors.</li>
                <li className='text-sm my-2'>Please operate according to the recharge rules. If you fail to recharge in accordance with the platform rules and cause property damage, the company will not be held responsible.</li>
                <li className='text-sm my-2'>After the transfer is successful, please upload the payment voucher and wait for 20-30 minutes. If your payment does not arrive for a long time, please contact online customer service.</li>
                <li className='text-sm my-2'>Do not transfer money to strangers. Official personnel will not proactively ask you for your account number and password.</li>
            </ol>
        </div>

        <Footer/>
    </section>
  )
}

export default DepositPage