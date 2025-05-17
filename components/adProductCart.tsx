'use client'
import { useUser } from "@clerk/nextjs"
import Image from "next/image"
import { useRouter } from "next/navigation"
import toast from "react-hot-toast"
import { CiHeart } from "react-icons/ci"
import { FaCartShopping } from "react-icons/fa6"
import { IoMdStar, IoMdStarHalf, IoMdStarOutline } from "react-icons/io"

const AdProductCart = () => {

    const router = useRouter()
    const { user } = useUser()

    const handleAddCart = () => {
        if (user?.id) {
            // router.push(`/cart`)
            toast.success("Product added to cart")
        } else {
            router.push(`/sign-in`)
        }
    }

    return (
        <div className="h-[120px] w-[100%]  border-2 border-gray-200 cursor-pointer rounded-lg p-2 flex flex-row gap-2 hover:scale-105 transition-all duration-300 ease-in-out">
            <Image src="/demo.jpg" alt="" height={100} width={100} className="rounded-lg" />
            <div className="flex flex-col gap-[5px] items-start justify-start p-2  w-full">
                <h4 className="font-bold text-black text-[15px] flex flex-row justify-between items-center w-full">Product Name
                    <FaCartShopping
                        onClick={() => handleAddCart()}
                        className="text-white cursor-pointer bg-black p-[7px] h-6 w-6 rounded-lg " /></h4>
                <h4 className="font-bold text-black text-[12px]">$ 23.34</h4>
                <div className="flex flex-row items-center justify-between w-full gap-2 ">
                    <div className="flex flex-row gap-2">
                        {[1, 2, 3, 4].map((num) => (
                            // <IoMdStarOutline className="text-yellow-400"/>
                            <IoMdStar key={num} className="text-yellow-400" />
                        ))}
                        <IoMdStarHalf className="text-yellow-400" />
                    </div>
                    <button
                        onClick={() => router.push(`/menu/${"jnejfnejfnjenf"}`)}
                        className="bg-green-400 whitespace-nowrap cursor-pointer text-white px-2 py-1 rounded-full hover:bg-green-500 transition duration-300 font-semibold text-[15px]">
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AdProductCart