import Link from "next/link";
import { MdHomeFilled } from "react-icons/md";
import { FaBox } from "react-icons/fa";
import { FaUsersLine } from "react-icons/fa6";
import { FaUserTie } from "react-icons/fa";


const Footer = () => {
  return (
    <div className="footer flex justify-around items-center gap-10 w-[100%]">
        <Link href={'/'}  className="flex flex-col justify-center items-center gap-2">
            <MdHomeFilled size={20}/>
            <small>Home</small>
        </Link>
        <Link href={'/'}  className="flex flex-col justify-center items-center gap-2">
            <FaBox size={20} />
            <small>Products</small>
        </Link>
        <Link href={'/'}  className="flex flex-col justify-center items-center gap-2">
            <FaUsersLine size={20} />
            <small>Team</small>
        </Link>
        <Link href={'/'} className="flex flex-col justify-center items-center gap-2">
            <FaUserTie size={20} />
            <small>Profile</small>
        </Link>
    </div>
  )
}

export default Footer