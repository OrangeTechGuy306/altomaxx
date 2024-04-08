"use client"
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card'
import { Input } from '@/components/ui/input'



const IssuePage = () => {

  

  const handleChange = ()=>{}

  return (
    <div className='flex justify-center items-center min-h-screen'>
        <Card className='w-[max-content]'>
            <CardHeader className='text-red font-bold text-2xl'>
                !!! Important Hint !!!
                <CardDescription className='text-red my-3'>
                Be sure to fill in your name carefully <br /> and upload the correct deposit receipt
                </CardDescription>
            </CardHeader>
            <CardContent>
              <form action="">
                  <div className='my-3'>
                      <small>* Name</small>
                      <Input type='text' name='' onChange={handleChange} className='w-[300px]' placeholder='Enter your name'/>
                  </div>
                  <div className='my-3'>
                      <small>* Deposit amount</small>
                      <Input type='text' name='' onChange={handleChange} className='w-[300px]' placeholder='Enter deposit amount'/>
                  </div>
                  <div className='my-3'>
                      
                      <input type='submit' name='' onChange={handleChange} className='w-[300px] bg-red py-2 rounded-xl text-white' value={"Submit"}/>
                  </div>
              </form>
            </CardContent>
            <CardFooter className='grid text-red'>
                <small>If you have a recharge order that has not arrived, <br /> please submit the recharge information.</small>
                <ul>
                  <li><small>1. Your name</small> </li>
                  <li><small>2. Deposit Certificate</small></li>
                </ul>
            </CardFooter>
        </Card>
    </div>
  )
}

export default IssuePage