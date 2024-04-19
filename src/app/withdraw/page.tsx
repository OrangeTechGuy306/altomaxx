"use client";
import { BiSolidWallet } from "react-icons/bi";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useEffect, useState } from "react";
import { Toaster, toast } from "sonner";
import { useWallet } from "@/utils/wallet";
import axios from "axios";
import { APIROUTE } from "@/utils/apiroutes";
import { useUser } from "@/utils/getUser";





const WithdrawalPage = () => {


  const banks = [
    {
      id: "1",
      name: "Access Bank",
      code: "044",
    },
    {
      id: "2",
      name: "Citibank",
      code: "023",
    },
    {
      id: "3",
      name: "Diamond Bank",
      code: "063",
    },
    {
      id: "4",
      name: "Dynamic Standard Bank",
      code: "",
    },
    {
      id: "5",
      name: "Ecobank Nigeria",
      code: "050",
    },
    {
      id: "6",
      name: "Fidelity Bank Nigeria",
      code: "070",
    },
    {
      id: "7",
      name: "First Bank of Nigeria",
      code: "011",
    },
    {
      id: "8",
      name: "First City Monument Bank",
      code: "214",
    },
    {
      id: "9",
      name: "Guaranty Trust Bank",
      code: "058",
    },
    {
      id: "10",
      name: "Heritage Bank Plc",
      code: "030",
    },
    {
      id: "11",
      name: "Jaiz Bank",
      code: "301",
    },
    {
      id: "12",
      name: "Keystone Bank Limited",
      code: "082",
    },
    {
      id: "25",
      name: "Kuda",
      code: "112",
    },
    {
      id: "28",
      name: "Moniepoint",
      code: "116",
    },
    {
      id: "24",
      name: "Opay",
      code: "111",
    },
    {
      id: "13",
      name: "Providus Bank Plc",
      code: "101",
    },
    {
      id: "26",
      name: "Palmpay",
      code: "114",
    },
    {
      id: "14",
      name: "Polaris Bank",
      code: "076",
    },
    {
      id: "15",
      name: "Stanbic IBTC Bank Nigeria Limited",
      code: "221",
    },
    {
      id: "16",
      name: "Standard Chartered Bank",
      code: "068",
    },
    {
      id: "17",
      name: "Sterling Bank",
      code: "232",
    },
    {
      id: "18",
      name: "Suntrust Bank Nigeria Limited",
      code: "100",
    },
    {
      id: "19",
      name: "Union Bank of Nigeria",
      code: "032",
    },
    {
      id: "20",
      name: "United Bank for Africa",
      code: "033",
    },
    {
      id: "21",
      name: "Unity Bank Plc",
      code: "215",
    },
    {
      id: "22",
      name: "Wema Bank",
      code: "035",
    },
    {
      id: "23",
      name: "Zenith Bank",
      code: "057",
    },
  ];

  // const {user} = useUser()

  const [info, setInfo] = useState({
    amount:0,
    acc_name: "",
    account:0,
  })

  const [bankType, setBankType] = useState("")

  const {amount, account, acc_name} = info
  // const [balance, setBalance] = useState(0)
  const {user, balance} = useWallet()



    const validateWithdrawal = (e:any)=>{
        setInfo({...info,[e.target.name]:e.target.value})
    }

    const handleWithdrawal = async(e:any)=>{
      if(bankType.trim() === "" || amount === 0 || account === 0 || acc_name.trim() === "" ){
        toast.error("all field are required to make withdrawal")
      }else if(amount < 2000 ){
        toast.error("Minimum withdrawal is N2,000")
      }else if(balance && amount > balance){
        toast.error("Insufficient Fund")
      }else{
        const {data} = await axios.post(`${APIROUTE}/withdrawal`, {amount, acc_name, account, bankType, username:user?.username })
        if(data.status === true){
            toast.success(data.msg)
        }else{
          toast.error("something went wrong")
        }
      }
  
    }
   

    useEffect(() => {
        // getUserWallet()
    }, [])

  return (
    <div>
      <div className="withdrawalHeroSection min-h-[50vh] text-white">
        <div className="flex justify-start items-center gap-3">
          <BiSolidWallet size={40} color="white" />
          <div>
            <h1 className="text-xl font-bold">&#8358;{balance} </h1>
            <small>Account Balance</small>
          </div>
        </div>
      </div>

      <div className="my-10 flex justify-center">
        <div>
          <Toaster richColors position="top-right" />
          <Select name="bankType" onValueChange={(e:any)=>setBankType(e)}>
            <SelectTrigger className="w-[300px]">
              <SelectValue placeholder="Choose bank to transfer" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Choose your bank</SelectLabel>
                {banks.map((bank, i) => (
                  <SelectItem value={bank["name"]} key={i} >
                    {bank["name"]}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        
            <div className="flex justify-start items-center my-3">
              <h3 className="bg-silver py-2 px-3">&#8358;</h3>
              <Input
                type="number"
                placeholder="Enter Amount to withdraw"
                name="amount"
                className="w-[265px]"
                onChange={validateWithdrawal}
              />
            </div>
            <Input
                type="text"
                placeholder="Enter Account Name"
                name="acc_name"
                className="w-[300px] my-3"
                onChange={validateWithdrawal}
              />
            <Input
                type="number"
                placeholder="Enter Account NO."
                name="account"
                className="w-[300px] my-3"
                onChange={validateWithdrawal}
              />
            <Button onClick={handleWithdrawal}>Withdraw now</Button>
   
        </div>
      </div>

      <div className="w-[450px] mx-auto my-10 p-3 withInstructionContainer">
        <h1 className="font-bold my-3">Withdrawal instructions</h1>
        <small>
          1. Minimum withdrawal amount ₦1500 <br />
          2. The withdrawal fee is 10% of the
          withdrawal amount <br /> 3. Withdrawal time is from 9:00 to 24:00, you can
          withdraw money at any time.<br /> 4. Withdrawals will be credited within 24
          hours. The Finance Department will review and process the funds
          submitted by users of the Fund Supervision Department within 12 hours.
          The remittance will be made only after approval.<br /> 5. The platform has a
          complete risk management system and strictly reviews and monitors
          every transaction to ensure the safety and compliance of your funds. <br />
          6. In order to protect the interests of the platform and members, you
          must have at least one device to activate the withdrawal function.
        </small>
      </div>
    </div>
  );
};

export default WithdrawalPage;
