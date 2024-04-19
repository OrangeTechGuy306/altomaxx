"use client"
import Sidebar from '@/comps/sidebar'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Card, CardContent, CardDescription, CardHeader } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { SelectTrigger, Select, SelectContent, SelectGroup, SelectItem, SelectValue} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useEffect, useState } from 'react'
import { Toaster, toast } from 'sonner'
import axios from 'axios'
import { APIROUTE } from '@/utils/apiroutes'
import { useRouter } from 'next/navigation'

type adminType = {
  email: String,
  password: String,
  createdAt: String,
  admin_id: String
}

const DepositPage = () => {

  const navigate = useRouter()

  const [admin, setAdmin] = useState({
      email:"",
      password:""
  })

  const [admins, setAdmins] = useState([])

  const {email, password}= admin

  const validate = async()=>{
    if(email.trim() === "" || password.trim()===""){
      toast.error("all fields required!")
    }else{
        const {data} = await axios.post(`${APIROUTE}/add/admin`, {email, password})
        if(data.status === true){
          toast.success(data.msg)
          navigate.push("/altomaxx/admin/admins")
        }else{
          return
        }
    }
  }



  const getAllAdmins = async()=>{
    const {data} = await axios.get(`${APIROUTE}/admins`)
    console.log(data)
    if(data.status === true){
      setAdmins(data.msg)
    }else{
      return
    }
  }

  const handleChange = (e:any)=>{
    setAdmin({...admin, [e.target.name]:e.target.value})
  }
  const addAdmin = (e:any)=>{
    e.preventDefault()
    validate()
    getAllAdmins()
  }


  const isAdmin = ()=>{
    const storage = localStorage.getItem("altomaxx_admin")
    if(storage === ""){
      navigate.push("/altomaxx/admin/login")
    }else{
      return
    }
  }

  useEffect(()=>{
    getAllAdmins()
    isAdmin()
  },[])


  return (
    <Sidebar>
       
      <div className='my-10 mx-3 adminSection'>

        <Toaster position='top-right' richColors/>

        <div className='flex justify-between flex-wrap'>

          <Card className='w-[250px]'>
            <CardHeader className='text-xl font-bold'>
                4
              <CardDescription>
                Admins
              </CardDescription>
            </CardHeader>

          </Card>

          <div className='my-5'>
                <Dialog>
                    <DialogTrigger>
                    <input type='submit' value={'Add new Admin'} className='py-2 px-5 bg-green w-[100%] my-5 rounded-xl cursor-pointer text-white' />
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                        <DialogTitle  className='my-5'>Add Payment</DialogTitle>
                        <DialogDescription>
                            Add new admin
                        </DialogDescription>
                        </DialogHeader>

                        <form className='my-10' onSubmit={addAdmin}>

                            <Input type='email' name='email' onChange={handleChange} placeholder='username' className='my-3'/>

                            <Input type='password' name='password' onChange={handleChange} placeholder='Enter password' className='my-3'/>
                      

                          <Button type='submit' className='bg-green'>Add new admin</Button>
                        </form>
                       
                    </DialogContent>
                </Dialog>
          </div>

        </div>
       

          <Table className='my-5'>
              <TableHeader>
                  <TableRow>
                      <TableHead>S/NO</TableHead>
                      <TableHead>EMAIL</TableHead>
                      <TableHead>DATE</TableHead>
                      <TableHead >MODIFY</TableHead>
                  </TableRow>
              </TableHeader>
              <TableBody>
               {admins.map((admin:adminType, i)=>(
                <TableRow key={i}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>{admin.email}</TableCell>
                    <TableCell>{admin.createdAt}</TableCell>
                    <TableCell><Button onClick={async()=>{
                        const {data} = await axios.get(`${APIROUTE}/delete/admin/${admin?.admin_id}`)
                        if(data.status === true){
                            toast.success(data.msg)
                            getAllAdmins()
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