"use client"
import Image from "next/image";
import SignUpPage from "./signup/page";
import { BsCashStack } from "react-icons/bs";
import { BiMoneyWithdraw } from "react-icons/bi";
import { RiContactsLine } from "react-icons/ri";
import { FaRegCalendarAlt } from "react-icons/fa";
import { Card } from "@/components/ui/card";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Footer from "@/comps/footer";
import axios from "axios";
import { APIROUTE } from "@/utils/apiroutes";
import { useUser } from "@/utils/getUser";
import { useWallet } from "@/utils/wallet";





interface walletType{
    wallet: any
}


export default function Home() {

    const [wallet, setWallet] = useState<walletType>()
    // const {user} = useUser()
    const {user, balance} = useWallet()
    const [investment, setInvestment] = useState(0)
    // const {}

    const fetInvestmentReturn = async()=>{
        const currentUser = JSON.parse(localStorage.getItem("altomaxx") as any)
        const {data} = await axios.get(`${APIROUTE}/invests/${currentUser?.username}`) 
        setInvestment(data.msg)
    }

      useEffect(()=>{
        fetInvestmentReturn()
      },[])
    


  return (
      <section>
          <div className="homeHeroSection min-h-[50vh] ">

          </div>
          <div className="flex justify-around items-center flex-wrap gap-3 py-2 mt-[-60px] menuIconsContainer">
              <Link href={"/deposit"} className="flex flex-col justify-center items-center gap-2">
                  <BsCashStack size={20} className="text-white" />
                  <small className="text-white text-sm">Make <br /> Deposit</small>
              </Link>
              <Link href={"/withdraw"} className="flex flex-col justify-center items-center gap-2">
                  <BiMoneyWithdraw size={20} className="text-white"/>
                  <small className="text-white">Withdraw <br /> Money</small>
              </Link>
              <Link href={"/customer"} className="flex flex-col justify-center items-center gap-2">
                  <RiContactsLine size={20} className="text-white" />
                  <small className="text-white">Customer <br /> service</small>
              </Link>
              <Link href={"/checkin"} className="flex flex-col justify-center items-center gap-2">
                  <FaRegCalendarAlt size={20} className="text-white"/>
                  <small className="text-white">Daily <br /> Check-in</small>
              </Link>
          </div>

          {/* USER ACCOUNTS */}
          <div className=" my-10">
              <h1 className="text-xl text-center">My Account</h1>
              <div className="my-5 flex flex-wrap justify-center items-center gap-2">
               
                    <Card className="homeAccountCard text-center w-[120px] h-[120px] rounded-md">
                        <h1 className="text-lg font-bold text-white">&#8358;{Intl.NumberFormat().format(parseInt(balance as any))}</h1>
                        <small className="text-md text-white">Account Balance</small>
                        <div className="acOverlay"></div>
                    </Card>

              
                  <Card className="homeAccountCard1 text-center w-[120px] h-[120px] rounded-md">
                      <h1 className="text-lg font-bold text-white">&#8358;{Intl.NumberFormat().format(investment)}</h1>
                      <small className="text-md text-white">Today&apos;s Earnings</small>
                      <div className="acOverlay"></div>
                  </Card>
                  {/* <Card className="homeAccountCard2 text-center w-[120px] h-[120px] rounded-md">
                      <h1 className="text-lg font-bold text-white">&#8358;20,000</h1>
                      <small className="text-md text-white">Total Earnings</small>
                      <div className="acOverlay"></div>
                  </Card> */}
              </div>
          </div>

        {/* EARNING SCROLLING */}


        {/* VIP SECTION */}
       
       <div>
        <Link href={''}>
          <Card className="vipCard text-center w-[80%] h-[150px] rounded-md mx-auto my-5">
                <h1 className="text-xl font-bold text-white">MD.TC Group</h1>
                <small className="text-md text-white">VIP can participate</small>
                <Badge className="bg-red text-white w-[50px] vipBadge">Hot</Badge>
                <div className="acOverlay"></div>
            </Card>

          <Card className="vipCard text-center w-[80%] h-[150px] rounded-md mx-auto my-5">
                <h1 className="text-xl font-bold text-white">Big Winners</h1>
                <small className="text-md text-white">VIP can participate,Bonuses up to ₦9,800,000 are available</small>
                <Badge className="bg-red text-white w-[50px] vipBadge">Hot</Badge>
                <div className="acOverlay"></div>
            </Card>
        </Link>
       
       </div>

       {/* BOTTOM FLYER SECTION */}

       <Link href={""} className="flex justify-center items-center bottomFlyerContainer text-center w-[80%] h-[150px] mx-auto mb-10">
          <div className="  text-white">
              <h1 className="text-2xl font-bold">ALTOMAXX DRONE SERIES</h1>
              <h2 className="text-xl font-bold">The most trustworth platform</h2>
          </div>
       </Link>

       <Footer/>
      </section>
  );
}
