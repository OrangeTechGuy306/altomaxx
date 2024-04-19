"use client"
import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardHeader } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Sidebar from "@/comps/sidebar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { APIROUTE } from "@/utils/apiroutes";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useEffect, useState } from "react";

import { Toaster, toast } from 'sonner'
import axios from "axios"
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { storage } from "@/utils/firebase";


type productType ={
  name: String,
  price: String,
  income: String,
  revenue: String,
  product_id: String,
}

const ProductsPage = () => {

    const [value, setValue] = useState({
        name:"",
        price: "",
        income:"",
        rev:""
    })

    const [products, setProducts] = useState([])
    const [total, setTotal] = useState([])

    const {name, price, income, rev} = value

    const [dev, setDev] = useState("")
    const [img, setImg] = useState("")

    const handleImg = (e: any)=>{
        const filename = e.target.files[0]
        const storageRef = ref(storage, `${Date.now()}-${filename.name}`)
        const uploadTask = uploadBytesResumable(storageRef, filename)

        uploadTask.on("state_changed", (snapshot)=>{
          const prog = Math.round((snapshot.bytesTransferred / snapshot.totalBytes)*100)
          console.log(prog)
        }, (e)=>{
                console.log(e)
        },()=>{
            getDownloadURL(uploadTask.snapshot.ref).then((url)=>{
              setImg(url)
            })
        })
    }

    const handleChange = (e:any)=>{
        setValue({...value, [e.target.name]:e.target.value})
    }

    const validateUser = async()=>{  
        if(name.trim() === "" || price.trim() === "" || income.trim() === "" || rev.trim() === ""){
            toast.error('All fields are required!')
        }
        else{
            const {data} = await axios.post(`${APIROUTE}/add/product`,{name, price, income,rev, img})
            if(data.status === false){
                toast.success(data.msg)
            }else{
                toast.success(data.msg)
                getAllProducts()
                totalProducts()
            }
        }
    }

    const addProduct = (e:any)=>{
      e.preventDefault()
      validateUser()
     
    }

    const getAllProducts = async ()=>{
        const {data} = await axios.get(`${APIROUTE}/products`)
      if(data.status === false){
        toast.error(data.msg)
      }else{
        setProducts(data.msg)
      }
    }

    const totalProducts = async ()=>{
        const {data} = await axios.get(`${APIROUTE}/total/products`)
      if(data.status === false){
        toast.error(data.msg)
      }else{
        setTotal(data.msg[0].total)
      }
    }


    const deleteProduct = async(id: Number)=>{
      const {data} = await axios.delete(`${APIROUTE}/delete/product/${id}`)
      if(data.status === true){
        toast.success(data.msg)
        getAllProducts()
        totalProducts()
      }else{
        toast.error("Something went wrong")
      }
    }

    useEffect(()=>{
      getAllProducts()
      totalProducts()
    },[])


  return (
    <div>
      <Sidebar>
        <div className="my-10 mx-3">
        <Toaster position="top-right" richColors />
          <div className="flex justify-between items-center gap-2 flex-wrap">

            <Card className="w-[250px]">
              <CardHeader className="text-xl font-bold">
               {total}
                <CardDescription>TOTAL PRODUCTS</CardDescription>
              </CardHeader>
            </Card>

            <div className="">
              <Dialog>
                <DialogTrigger className="bg-green text-white py-2 px-5 rounded-xl">Add New Product</DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New Product</DialogTitle>
                  </DialogHeader>
                 <form action="" onSubmit={addProduct}>
                        <div>
                            <label htmlFor="droneImg" className="flex justify-center items-center gap-3 bg-silver h-[100px] cursor-pointer rounded-xl">
                                <FaCloudUploadAlt size={40} />
                                <small>Upload Image</small>
                            </label>
                            <Input type="file" name="img" id="droneImg" className="hidden" onChange={handleImg}/>
                        </div>

                    <Input type="text" name="name" placeholder=" Device name" className="w-[100%] my-3" onChange={handleChange}/>

                    <Input type="number" name="price" placeholder=" Device Price " className="w-[100%] my-3" onChange={handleChange}/>

                    <Input type="number" name="income" placeholder=" Daily Income " className="w-[100%] my-3" onChange={handleChange}/>

                    <Input type="number" name="rev" placeholder="Total Revenue" className="w-[100%] my-3" onChange={handleChange}/>

                    <input type="submit" value={"Add Product"} className="py-2 px-5 bg-green my-3 rounded-xl text-white" />
                 </form>
                </DialogContent>
              </Dialog>
            </div>
          </div>

          <Table className="my-5">
            <TableHeader>
              <TableRow>
                <TableHead>S/NO</TableHead>
                <TableHead>DEVICE NAME</TableHead>
                <TableHead>EQUIPMENT PRICE</TableHead>
                <TableHead>DAILY INCOME</TableHead>
                <TableHead>TOTAL REVENUE</TableHead>
                <TableHead>MODIFY</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                products&&products.map((product:productType, i)=>(
                  <TableRow key={i}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>{product.name}</TableCell>
                    <TableCell>&#8358; {product.price}</TableCell>
                    <TableCell>&#8358; {product.income}</TableCell>
                    <TableCell>&#8358; {product.revenue}</TableCell>
                    <TableCell>
                      <Button onClick={()=>{deleteProduct(product.product_id as any)}}>Delete</Button>
                    </TableCell>
                  </TableRow>
                ))
              }
            </TableBody>
          </Table>
        </div>
      </Sidebar>
    </div>
  );
};

export default ProductsPage;
