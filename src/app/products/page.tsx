"use client"
import { Button } from '@/components/ui/button'
import Footer from '@/comps/footer'
import { APIROUTE } from '@/utils/apiroutes'
import { useUser } from '@/utils/getUser'
import { useWallet } from '@/utils/wallet'
import axios from 'axios'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Toaster, toast } from 'sonner'



type productType = {
    image:any,
    product_id: String,
    name:String,
    price: String,
    income: String,
    revenue:String 
}

const ProductPage = () => {

    const [products, setProducts] = useState([])
    // const {user} = useUser()
    const {balance, user} = useWallet()
    
    const [total, setTotal] = useState(0)

    const fetchProducts = async()=>{
        const {data} = await axios.get(`${APIROUTE}/products`)
        if(data.status === true){
            setProducts(data.msg)
            console.log(data)
        }  else{
            return
        }
    }

    const getSingleProduct = async(id:String)=>{
        const {data} = await axios.get(`${APIROUTE}/products/${id}`)
        if(data.status === true){
            setProducts(data.msg)
            console.log(data)
        }  else{
            return
        }
    }

    // console.log(user?.username)
    

    const totalCart = async()=>{
        const currentUser = JSON.parse(localStorage.getItem("altomaxx") as any)
        const {data} = await axios.get(`${APIROUTE}/total/cart/${currentUser?.username}`)
        if(data.status === true){
            setTotal(data.msg[0].total)
            console.log(data)
        }  else{
            return
        }
    }

    const buyProduct = async(username: any, rev:any, price:any, name:any, income:any, image: any)=>{
        if( parseInt(price) > parseInt(balance as any)){
            toast.error("Deposit more to Invest")
        }else{
            const {data} = await axios.post(`${APIROUTE}/add/cart`,{username:username, rev:rev, price:price, name:name, income:income, image:image})
            if(data.status === true){
                toast.success(data.msg)
            }else{
                toast.error(data.msg)
            }
        }
    }
    

    useEffect(()=>{
        fetchProducts()
        totalCart()
    },[])

  return (
    <div>
        <div className='productHero'>
            <div className='flex justify-center items-center'>
                <div className='text-center bg-white shadow-lg  py-3 px-10  rounded-l-3xl '>
                    <h1>{total}</h1>
                    <small>My Device</small>            
                </div>
                {/* <div className='text-center bg-white shadow-lg py-3 px-10 rounded-r-3xl'>
                    <h1>0</h1>
                    <small>My Device</small>            
                </div> */}
            </div>
        </div>
        <Toaster position='top-right' richColors/>
        <div className='flex justify-center items-center gap-3 flex-wrap my-10'>
           { products.map((p: productType, i)=>(
            <div className='productCard flex justify-center items-center w-[350px] gap-4 my-3 bg-white shadow-md' key={i}>
                <Image src={`${p?.image}`} unoptimized alt="" width={100} height={100}/>
                <div>
                    <h3 className='font-bold text-sm'>{p.name}</h3>
                    <small>Price: &#8358;{p.price}</small> <br />
                    <small>Expiration Days:50 Days</small> <br />
                    <small>Daily Income: &#8358;{p.income}</small> <br />
                    <small>Total Revenue: &#8358;{p.revenue}</small> <br />
                </div>
                <Button onClick={()=>{
                    buyProduct(user?.username, p.revenue, p.price, p.name, p.income, p.image)
                }}>Buy</Button>
            </div>
           ))
          }
          
        </div>
        <Footer/>
    </div>
  )
}

export default ProductPage