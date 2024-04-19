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

import { Input } from "@/components/ui/input";
import { APIROUTE } from "@/utils/apiroutes";
import { FaCloudUploadAlt } from "react-icons/fa";
import { useEffect, useState } from "react";

import { Toaster, toast } from 'sonner'
import axios from "axios"


type withType ={
    with_id: String,
    amount: String,
    status: String,
    username: String,
    acc_name: String,
    acc_no: String,
    bank_name: String,
}

const ProductsPage = () => {


    const [withdrawal, setWithdrawal] = useState([])

    const fetchWithdrawals = async()=>{
        const {data} = await axios.get(`${APIROUTE}/withdrawals`)
        if(data.status === true){
            setWithdrawal(data.msg)
        }else{
            return
        }

    }

    const updateWithdrawal = async(id: String)=>{
        const {data} = await axios.post(`${APIROUTE}/update/withdrawal`,{with_id:id} as any)
        if(data.status === true){
            toast.success(data.msg)
            fetchWithdrawals()
        }else{
            toast.error(data.msg)
        }

    }

    useEffect(()=>{
        fetchWithdrawals()
    },[])


  return (
    <div>
      <Sidebar>
        <div className="my-10 mx-3">
        <Toaster position="top-right" richColors />
          <div className="flex justify-between items-center gap-2 flex-wrap">

            <Card className="w-[250px]">
              <CardHeader className="text-xl font-bold">
                    82743
                <CardDescription>Total Money Left</CardDescription>
              </CardHeader>
            </Card>

            <Card className="w-[250px]">
              <CardHeader className="text-xl font-bold">
                    82743
                <CardDescription>Total Money Withdraw</CardDescription>
              </CardHeader>
            </Card>


          </div>

          <Table className="my-5">
            <TableHeader>
              <TableRow>
                <TableHead>S/NO</TableHead>
                <TableHead>USERNAME</TableHead>
                <TableHead>AMOUNT</TableHead>
                <TableHead>ACCOUNT NO</TableHead>
                <TableHead>ACCOUNT NAME</TableHead>
                <TableHead>BANK NAME</TableHead>
                <TableHead>STATUS</TableHead>
                <TableHead>MODIFY</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {
                withdrawal&&withdrawal.map((w: withType, i)=>(
                  <TableRow key={i}>
                    <TableCell>{i + 1}</TableCell>
                    <TableCell>{w?.username}</TableCell>
                    <TableCell> {w?.amount}</TableCell>
                    <TableCell> {w?.acc_no}</TableCell>
                    <TableCell> {w?.acc_name}</TableCell>
                    <TableCell> {w?.bank_name}</TableCell>
                    <TableCell> {w?.status}</TableCell>
                    <TableCell>
                      <Button onClick={()=>{updateWithdrawal(w?.with_id)}}>Update</Button>
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
