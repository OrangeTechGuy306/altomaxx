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
import axios from 'axios'
import { APIROUTE } from '@/utils/apiroutes'
import { Toaster, toast } from 'sonner'
import { useEffect, useState } from 'react'
import { useUser } from '@/utils/getUser'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'


type userType = {
  username: String,
  mobile: String,
  email: String,
  referral_code: String,
}


const DepositPage = () => {

  const [users, setUsers] = useState([])
  const [total, setTotal] = useState([])
  const [search, setSearch] = useState('')
  const [result, setResult] = useState([])
  const [show, setShow] = useState(false)
  const [investment, setInvestment] = useState('')


  const getUsers = async()=>{

      const {data} = await axios.get(`${APIROUTE}/users`)
      if(data.status === false){
          toast.error(data.msg)
      }else{
        setUsers(data.msg)
      }
  }

  const getUserBalance = async(id:String)=>{
    const {data} = await axios.get(`${APIROUTE}/user/wallet/${id}`) 
    setInvestment(data.msg)
  }

 
  const totalUsers = async()=>{

      const {data} = await axios.get(`${APIROUTE}/total/users`)

      if(data.status === false){
          toast.error(data.msg)
      }else{
        setTotal(data.msg[0].total)
      }
  }


  const handleSearch = async(e:any)=>{
    e.preventDefault()

    if(search.trim() === ""){
      toast.error("Enter username to search")
      setShow(false)
    }else{
      const {data} = await axios.get(`${APIROUTE}/search/user/${search}`)
      if(data.status !== false){
        setResult(data.msg)
        setShow(true)
      }else{
        toast.error(data.msg)
        setShow(false)
      }
    }
  }

   useEffect(() => {
    getUsers()
    totalUsers()
  }, [])
  


  return (
    <Sidebar>
   
      <div className='my-10 mx-3'>
          <Toaster richColors position='top-right'/>
        <div className='flex justify-between items-center gap-2 flex-wrap'>
          <Card className='w-[250px]'>
            <CardHeader className='text-xl font-bold'>
                {total}
              <CardDescription>
                USERS
              </CardDescription>
            </CardHeader>
          </Card>

          
          <form action="" className='flex' onSubmit={handleSearch}>
            <Input onChange={(e:any)=>{
                setSearch(e.target.value)
            }} type="search" placeholder='Search User'/>
            <Button className='bg-green'>Search</Button>
          </form>
      
            
        </div>

         {show ? 
         <Table className='my-5'>
              <TableHeader>
                  <TableRow>
                      <TableHead>S/NO</TableHead>
                      <TableHead>USERNAME</TableHead>
                      <TableHead>MOBILE</TableHead>
                      <TableHead>EMAIL</TableHead>
                      <TableHead>REFERAL CODE</TableHead>
                      <TableHead>MODIFY</TableHead>
                  </TableRow>
              </TableHeader>
              <TableBody>
                { result.map((r:userType, i)=>(
                  <TableRow key={i}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>{r?.username}</TableCell>
                    <TableCell>{r.mobile}</TableCell>
                    <TableCell>{r.email}</TableCell>
                    <TableCell>{r.referral_code}</TableCell>
                    <TableCell>
                    <div className="">
              <Dialog>
                <DialogTrigger className="bg-green text-white py-2 px-5 rounded-xl" onClick={()=>{getUserBalance(r?.username)}}>View</DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>User Profile</DialogTitle>
                  </DialogHeader>

                  <div>
                      <h1>{r?.username}</h1>
                      <div className='flex justify-between my-3 font-bold text-green'>
                          <small>Total Earnings</small>
                          <small>&#8358; {Intl.NumberFormat().format(investment as any)}</small>
                      </div>
                  </div>
                 
                </DialogContent>
              </Dialog>
            </div>
                    </TableCell>
                  </TableRow>

                ))
                }
              </TableBody>
          </Table>
          :
          <Table className='my-5'>
              <TableHeader>
                  <TableRow>
                      <TableHead>S/NO</TableHead>
                      <TableHead>USERNAME</TableHead>
                      <TableHead>MOBILE</TableHead>
                      <TableHead>EMAIL</TableHead>
                      <TableHead>REFERAL CODE</TableHead>
                      <TableHead>MODIFY</TableHead>
                  </TableRow>
              </TableHeader>
              <TableBody>
                { users.map((user:userType, i)=>(
                  <TableRow key={i}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>{user?.username}</TableCell>
                    <TableCell>{user.mobile}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell>{user.referral_code}</TableCell>
                    <TableCell>
                    <div className="">
              <Dialog>
                <DialogTrigger className="bg-green text-white py-2 px-5 rounded-xl" onClick={()=>{getUserBalance(user?.username)}}>View</DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>User Profile</DialogTitle>
                  </DialogHeader>

                  <div>
                      <h1>{user?.username}</h1>
                      <div className='flex justify-between my-3 font-bold text-green'>
                          <small>Total Earnings</small>
                          <small>&#8358; {Intl.NumberFormat().format(investment as any)}</small>
                      </div>
                  </div>
                 
                </DialogContent>
              </Dialog>
            </div>
                    </TableCell>
                  </TableRow>

                ))
                }
              </TableBody>
          </Table>}

      </div>
    </Sidebar>
  )
}

export default DepositPage