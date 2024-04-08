import { Button } from '@/components/ui/button'
import Footer from '@/comps/footer'
import Image from 'next/image'
import React from 'react'

const ProductPage = () => {
  return (
    <div>
        <div className='productHero'>
            <div className='flex justify-center items-center'>
                <div className='text-center bg-white shadow-lg  py-3 px-10  rounded-l-3xl '>
                    <h1>0</h1>
                    <small>My Device</small>            
                </div>
                <div className='text-center bg-white shadow-lg py-3 px-10 rounded-r-3xl'>
                    <h1>0</h1>
                    <small>My Device</small>            
                </div>
            </div>
        </div>
        <div className='flex justify-center items-center gap-3 flex-wrap my-10'>
            <div className='productCard flex justify-center items-center w-[350px] gap-4 my-3 bg-white shadow-md'>
                <Image src={"/assets/d4.png"} alt="" width={100} height={100}/>
                <div>
                    <h3 className='font-bold text-sm'>Withdrawal Fast Track</h3>
                    <small>Price: &#8358;7,500</small> <br />
                    <small>Expiration Days:50 Days</small> <br />
                    <small>Daily Income: &#8358;2,100</small> <br />
                    <small>Total Revenue: &#8358;105,000</small> <br />
                </div>
                <Button>Buy</Button>
            </div>
            <div className='productCard flex justify-center items-center w-[350px] gap-4 my-3 bg-white shadow-md'>
                <Image src={"/assets/d1.png"} alt="" width={100} height={100}/>
                <div>
                    <h3 className='font-bold text-sm'>Withdrawal Fast Track</h3>
                    <small>Price: &#8358;7,500</small> <br />
                    <small>Expiration Days:50 Days</small> <br />
                    <small>Daily Income: &#8358;2,100</small> <br />
                    <small>Total Revenue: &#8358;105,000</small> <br />
                </div>
                <Button>Buy</Button>
            </div>
            <div className='productCard flex justify-center items-center w-[350px] gap-4 my-3 bg-white shadow-md'>
                <Image src={"/assets/d2.png"} alt="" width={100} height={100}/>
                <div>
                    <h3 className='font-bold text-sm'>Withdrawal Fast Track</h3>
                    <small>Price: &#8358;7,500</small> <br />
                    <small>Expiration Days:50 Days</small> <br />
                    <small>Daily Income: &#8358;2,100</small> <br />
                    <small>Total Revenue: &#8358;105,000</small> <br />
                </div>
                <Button>Buy</Button>
            </div>
        </div>
        <Footer/>
    </div>
  )
}

export default ProductPage