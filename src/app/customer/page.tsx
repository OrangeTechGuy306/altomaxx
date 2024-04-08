import Image from "next/image";
import Link from "next/link";
import { MdKeyboardArrowRight } from "react-icons/md";






const page = () => {
  return (
    <section>
        <div className='ccareHero'>
            <div>
                <h1 className="text-2xl font-bold">Customer care</h1>
                <h1 className="font-bold text-xl">9:00 - 21:00 <br />
                    Customer service time online</h1>
            </div>
        </div>
        <div className="flex flex-col items-center">
            <Link href={""} className='flex justify-between items-center w-[300px] my-3 shadow-md py-3 px-2'>
                <div className="flex gap-3 items-center">
                    <Image src={"/assets/s3.png"} alt="" width={40} height={40}/>
                    <p className="text-lg">Telegram</p>
                </div>
                <MdKeyboardArrowRight size={40} />
            </Link>
            <Link href={""} className='flex justify-between items-center w-[300px] my-3 shadow-md py-3 px-2'>
                <div className="flex gap-3 items-center">
                    <Image src={"/assets/s2.webp"} alt="" width={50} height={50}/>
                    <p className="text-lg">Whatsapp</p>
                </div>
                <MdKeyboardArrowRight size={40} />
            </Link>
            <Link href={""} className='flex justify-between items-center w-[300px] my-3 shadow-md py-3 px-2'>
                <div className="flex gap-3 items-center">
                    <Image src={"/assets/s3.png"} alt="" width={40} height={40}/>
                    <p className="text-lg">Telegram Channel</p>
                </div>
                <MdKeyboardArrowRight size={40} />
            </Link>
            <Link href={""} className='flex justify-between items-center w-[300px] my-3 shadow-md py-3 px-2'>
                <div className="flex gap-3 items-center">
                    <Image src={"/assets/s3.png"} alt="" width={40} height={40}/>
                    <p className="text-lg">Telegram Group</p>
                </div>
                <MdKeyboardArrowRight size={40} />
            </Link>
        </div>
    </section>
  )
}

export default page