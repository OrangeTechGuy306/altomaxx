"use client"
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import Footer from '@/comps/footer'
import { APIROUTE } from '@/utils/apiroutes'
import { userType } from '@/utils/userType'
import axios from 'axios'
import React, { useEffect, useState } from 'react'

const TeamPage = () => {

    const [user, setUser] = useState<userType>()
    const [refer, setRefer] = useState(0)
    
    const getUser =  async()=>{
        const currentUser = JSON.parse(localStorage.getItem("altomaxx") as any)
        setUser(currentUser)
    }

    const getReferrals = async()=>{
        const currentUser = JSON.parse(localStorage.getItem("altomaxx") as any)
        const {data} = await axios.get(`${APIROUTE}/referrals/${currentUser?.referral_code}`)

        if(data.status === true){
            setRefer(data.msg[0].total || 0)
            // console.log(data.msg[0].total)
        }   
    }

    useEffect(()=>{
        getUser()
        getReferrals()
    },[])

  return (
    <div className=''>
        <div className='teamHero'>
            <section className='teamHeroOverlay'></section>
            <div>
                <h1 className='text-3xl'>Invite Friends</h1>
                <small>Manage your team, get higher profits</small>
            </div>
            <div className='flex justify-start items-center gap-5 my-10'>
                <div>
                    <h1>{user?.referral_code}</h1>
                    <small>Invitation Code</small> <br />
                    <Button>Copy</Button>
                </div>
               
            </div>
        </div>

        <div className=''>

            <div>

                <div>
                    <h1 className='text-center text-xl font-bold my-5'>My Team</h1>
                </div>

                <div className='flex justify-center items-center gap-5 my-5'>
                    <Card className='w-[max-content] bg-black'>
                        <h1 className='text-white p-2'>LV1</h1>
                    </Card>
                    <div className='text-center'>
                        <small>20%</small> <br />
                        <small>Commission rate</small>
                    </div>
                    <div className='text-center'>
                        <small>10</small> <br />
                        <small>Quantity</small>
                    </div>
                    <div className='text-center'>
                        <small>0</small> <br />
                        <small>Bonus</small>
                    </div>
                </div>
                <div className='flex justify-center items-center gap-5 my-5'>
                    <Card className='w-[max-content] bg-black'>
                        <h1 className='text-white p-2'>LV2</h1>
                    </Card>
                    <div className='text-center'>
                        <small>2%</small> <br />
                        <small>Commission rate</small>
                    </div>
                    <div className='text-center'>
                        <small>0</small> <br />
                        <small>Quantity</small>
                    </div>
                    <div className='text-center'>
                        <small>0</small> <br />
                        <small>Bonus</small>
                    </div>
                </div>
                <div className='flex justify-center items-center gap-5 my-5'>
                    <Card className='w-[max-content] bg-black'>
                        <h1 className='text-white p-2'>LV3</h1>
                    </Card>
                    <div className='text-center'>
                        <small>1%</small> <br />
                        <small>Commission rate</small>
                    </div>
                    <div className='text-center'>
                        <small>0</small> <br />
                        <small>Quantity</small>
                    </div>
                    <div className='text-center'>
                        <small>0</small> <br />
                        <small>Bonus</small>
                    </div>
                </div>

            </div>

            <div className='flex justify-center gap-3 my-10'>
                <Card className='text-center flex flex-col justify-center items-center w-[150px] py-10'>
                    <h1>{refer}</h1>
                    <small>No of People</small>
                </Card>
                <Card className='text-center flex flex-col justify-center items-center w-[150px] py-10'>
                    <h1>&#8358;0</h1>
                    <small>Total Revenue</small>
                </Card>
            </div>

            <div className='flex justify-center flex-col items-start w-[80%] mx-auto mb-20'>
                <h1>Invitation award</h1>
                <small>When the friends you invite sign up and invest, you will get 20% or 15% cashback instantly depending on the amount invested.</small> <br />
                <small>You will get 2% cash back when your level 2 team members invest.</small> <br />
                <small>You will get 1% cash back when your level 3 team members invest.</small> <br />
                <small>Cash rewards will be sent to your account balance once your team members invest. You can withdraw it immediately.</small>
            </div>

        </div>
        <Footer/>
    </div>
  )
}

export default TeamPage