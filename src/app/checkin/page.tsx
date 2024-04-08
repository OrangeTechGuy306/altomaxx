import { Button } from '@/components/ui/button'
import { Card, CardFooter } from '@/components/ui/card'
import { BsCashCoin } from "react-icons/bs";







const page = () => {
  return (
    <div className='min-h-screen flex justify-center items-center checkinSection'>
        <Card className='w-[300px] bg-overlay-black text-white'>
            <div className='text-center my-5'>
                <h1 className='text-2xl'>₦ 100</h1>
                <small> Daily check-in rewards</small>
            </div>
            <div className='text-center my-5'>
                <h1 className='text-2xl'>₦ 100</h1>
                <small>Check-in revenue</small>
            </div>
            <div className='text-center my-5 flex justify-center'>
                <Button className='flex gap-3'>Check in <BsCashCoin /></Button>
            </div>
            <CardFooter className='flex justify-center'>
                <small >Description of the rule</small>
            </CardFooter>
        </Card>
    </div>
  )
}

export default page