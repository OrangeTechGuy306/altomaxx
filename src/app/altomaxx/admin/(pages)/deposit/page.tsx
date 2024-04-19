"use client"



import Sidebar from '@/comps/sidebar'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { useEffect, useState } from 'react'
import { Toaster, toast } from 'sonner'
import axios from 'axios'
import { APIROUTE } from '@/utils/apiroutes'

type TransactionType={
  amount: String,
  mobile:String,
  createdAt:String,
  username: String
  wallet_id: String
}

const DepositPage = () => {

  const [pay, setPay] = useState({
    mobile:"",
    username:"",
    amount:"",
  })

  const [transaction, setTransaction] = useState([])
  const [total, setTotal] = useState([])

  const {mobile, username, amount} = pay

  const handleChange = (e:any)=>{
    setPay({...pay, [e.target.name]: e.target.value})
  }

  const validate = async()=>{
    if(mobile.trim() === "" || username.trim() === "" || amount.trim() === ""){
      toast.error("Please fill all the required fields")
    }else{
        const {data} = await axios.post(`${APIROUTE}/deposit`,{username, amount, mobile})
        if(data.status === false){
          console.log(data.msg)
        }else{
            toast.success(data.msg)
        }
    }
  }

  const getAllDeposit = async()=>{
    const {data} = await axios.get(`${APIROUTE}/wallet`)
    console.log(data)
    if(data.status != false){
      setTransaction(data.msg)
    }else{
      return
    }
  }

  const getTotalDeposit = async()=>{
    const {data} = await axios.get(`${APIROUTE}/wallets`)
    console.log(data)
    if(data.status != false){
      setTotal(data.msg[0].total)
    }else{
      return
    }
  }

const deposit = (e:any)=>{
  e.preventDefault()
  validate()
  getAllDeposit()
  getTotalDeposit()
}

useEffect(()=>{
  getAllDeposit()
  getTotalDeposit()
},[])

  return (
    <Sidebar>
       {/* 
            DEPOSIT: depId userId, amount Date
        */}
      <div className='my-10 mx-3 depositSection'>
          <Toaster position='top-right' richColors/>
        <div className='flex justify-between flex-wrap'>
          <div className='flex justify-start gap-2 flex-wrap'>
            <Card className='w-[250px]'>
              <CardHeader className='text-xl font-bold'>
                  &#8358; {total}
                <CardDescription>
                  DEPOSIT
                </CardDescription>
              </CardHeader>
              {/* <CardContent>
                  <h1></h1>
              </CardContent> */}
            </Card>

          </div>

          <div className='my-5'>
                <Dialog>
                    <DialogTrigger>
                    <input type='submit' value={'Add new Payment'} className='py-2 px-5 bg-green w-[100%] my-5 rounded-xl cursor-pointer text-white' />
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                        <DialogTitle  className='my-5'>Add Payment</DialogTitle>
                        <DialogDescription>
                            Add new payment for user
                        </DialogDescription>
                        </DialogHeader>

                        <form className='my-10' onSubmit={deposit}>

                            <Input type='text' name='username' onChange={handleChange} placeholder='username' className='my-3'/>

                            <Input type='number' name='mobile' onChange={handleChange} placeholder='Enter mobile NO.' className='my-3'/>
                            
                            <Input type='number' name='amount' onChange={handleChange} placeholder='Enter Amount.' className='my-3'/>

                          <Button type='submit' className='bg-green'>Add Payment</Button>
                        </form>
                       
                    </DialogContent>
                </Dialog>
            </div>

        </div>

          <Table className='my-5'>
              <TableHeader>
                  <TableRow>
                      <TableHead>S/NO</TableHead>
                      <TableHead>USERNAME</TableHead>
                      <TableHead>MOBILE NO.</TableHead>
                      <TableHead>AMOUNT</TableHead>
                      <TableHead>DATE</TableHead>
                      <TableHead>MODIFY</TableHead>
                  </TableRow>
              </TableHeader>
              <TableBody>
              { transaction.map((t: TransactionType, i)=>(
                <TableRow key={i}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>{t.username}</TableCell>
                    <TableCell>{t.mobile}</TableCell>
                    <TableCell>{t.amount}</TableCell>
                    <TableCell>{t.createdAt}</TableCell>
                    <TableCell><Button onClick={async()=>{
                      const {data} = await axios.delete(`${APIROUTE}/delete/wallet/${t.wallet_id}`)
                      if(data.status === true){
                        toast.success(data.msg)
                        getAllDeposit()
                        getTotalDeposit()
                      }else{
                          return
                      }
                     
                    }}>Delete</Button></TableCell>
                  </TableRow>

              )) 
                }
              </TableBody>
          </Table>

      </div>
    </Sidebar>
  )
}

export default DepositPage