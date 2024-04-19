"use client"
import Link from 'next/link'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import useGetAdmin from '@/utils/getAdmin';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';




type ContainerProps = {
    children: React.ReactNode; 
  };

  
  

const Sidebar: React.FC<ContainerProps> = ({children}) => {

    const {isAdmin, superAdmin} = useGetAdmin()
    const navigate = useRouter()
    
  return (

    
    <div className='sidebar'>
       
        <div className='sidebarContainer bg-green'>
            <ul>
                <li className='my-3 p-2 text-white' ><Link href={'/altomaxx/admin/dash'}>Dashboard</Link></li>
                <li className='my-3 p-2 text-white'><Link href={'/altomaxx/admin/users'} >Users</Link></li>
                <li className='my-3 p-2 text-white'><Link href={'/altomaxx/admin/products'} >Products</Link></li>
                <li className='my-3 p-2 text-white'><Link href={'/altomaxx/admin/deposit'} >Deposit</Link></li>
                <li className='my-3 p-2 text-white'><Link href={'/altomaxx/admin/withdrawals'} >Withdrawals</Link></li>
                <li className='my-3 p-2 text-white'><Link href={'/altomaxx/admin/admins'} >Admins</Link></li>
            </ul>
        </div>

        <div className='dashRight'>
            <nav className='adminNav flex justify-around flex-wrap items-center py-2 shadow-md'>
                <div>
                    {/* <form action="">
                        <input type="text" placeholder='Search user' name='' className='w-[300px] h-[35px] bg-silver px-2 rounded-lg mr-2 '/>
                        <input type="submit" value="Search" className='py-1 px-5 bg-green text-white rounded-lg' />
                    </form> */}
                </div>

                <div className='flex justify-start gap-3 items-center'>
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <h3>{superAdmin?.email}</h3>
                    <Button onClick={()=>{
                        localStorage.removeItem("altomaxx_admin")
                        navigate.push("/altomaxx/admin/login")
                    }}>Logout</Button>
                </div>
            </nav>
            <div >
                {children}
            </div>
        </div>
    </div>
  )
}

export default Sidebar