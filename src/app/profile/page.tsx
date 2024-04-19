"use client"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"
import { Button } from "@/components/ui/button"
import Footer from "@/comps/footer"
import { useRouter } from "next/navigation"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { SelectTrigger, Select, SelectContent, SelectGroup, SelectItem, SelectValue} from '@/components/ui/select'
import { useEffect, useState } from "react"
import { useUser } from "@/utils/getUser"
import { userType } from "@/utils/userType"
import { useWallet } from "@/utils/wallet"
import { APIROUTE } from "@/utils/apiroutes"
import axios from "axios"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import Image from "next/image"


type cartType = {
  product_name: String,
  product_price: String,
  income:String,
  image:String,
  rev:String,
  username:String,
  cart_id:String
}


const ProfilePage = () => {

  const [invest, setInvest] = useState([])
  const navigate = useRouter()
  const [cart, setCart] = useState([])
  const {user} = useUser()
  // const {balance} = useWallet()


  const logout = ()=>{
    localStorage.removeItem("altomaxx")
    navigate.push("/login")
  }

  const userCart = async()=>{
    const currentUser = JSON.parse(localStorage.getItem("altomaxx") as any)
    const {data} = await axios.get(`${APIROUTE}/cart/${currentUser?.username}`)
    if(data.status === true){
        setCart(data.msg)
        console.log(data)
    }  else{
        return
    }
}

      useEffect(()=>{
        userCart()
      },[])

  return (
    <div>
        <div className="min-h-[50vh] profileHeroSection">
            <div className="p-10">
             
                <ul>
                  <li className="my-3"> <span className="font-bold">Username: </span><small>{user?.username}</small> <br /> </li>
                  <li className="my-3"> <span className="font-bold">Email: </span><small>{user?.email}</small> <br /> </li>
                  <li className="my-3"><span className="font-bold">Mobile:</span> <small>{user?.mobile}</small> <br /> </li>
                  <li className="my-3"> <span className="font-bold">Referral Code:</span> <small>{user?.username}</small> <br /> </li>
                </ul>

              
               <Button onClick={logout}>Logout</Button>
            </div>
        </div>

          <div className="px-10">
              <h1 className="text-center  my-5 ">My Devices</h1>
             { cart ? cart.map((c: cartType, i)=>(
              <Card key={i} className="w-[300px] my-3 flex justify-between items-center">
                  <CardHeader>
                      <Image src={"/assets/d3.png"} alt="" width={100} height={100}/>
                  </CardHeader>
                  <CardContent>
                      <h3>{c.product_name}</h3>
                      <small>{c.product_price}</small>
                      <small>{c.income}</small>
                  </CardContent>
              </Card>
             )) : <div><h1>No Device</h1></div>}
          </div>

        <Footer/>
    </div>
  )
}

export default ProfilePage