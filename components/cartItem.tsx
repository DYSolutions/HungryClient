'use client'
import Image from "next/image"
import { useRouter } from "next/navigation"
import ServesSelector from "./servesSelector"
import { useState } from "react"
import { MdDeleteForever } from "react-icons/md"

const CartItem = () => {

    const router = useRouter()
    const [serves, setServes] = useState<number>(1)

    return (
        <div className="h-[120px] w-[100%] rounded-lg p-2 flex flex-row gap-2">
            <Image src="/demo.jpg" alt="" height={100} width={100} className="rounded-lg" />
            <div className="flex flex-row items-start justify-start  w-full ">
                <div className="flex flex-col w-[30%] items-start h-full justify-between p-2 ">
                    <h4 className="font-bold text-black text-[15px] flex flex-row justify-between items-center w-full">Product Name</h4>
                    <h4 className="font-bold text-black text-[12px]">$ 23.34</h4>
                    <div className="flex flex-row gap-1 text-[10px]">
                        <span className="bg-pink-200 px-1 rounded-lg">category</span>
                        <span className="bg-blue-300 px-1 rounded-lg">cuisine</span>
                        <span className="bg-red-300 px-1 rounded-lg">kitchin</span>
                        <span className="bg-yellow-200 px-1 rounded-lg">M</span>
                        
                    </div>
                </div>
                <div className="flex flex-col w-[60%] items-center h-full justify-center p-2 ">
                    <ServesSelector serves={serves} setServes={setServes} />
                </div>
                <div className="flex flex-col w-[10%] items-center h-full justify-center p-2">
                    <MdDeleteForever className="text-red-500 cursor-pointer w-6 h-6 hover:scale-125 transition-all duration-300 ease-in-out" />
                </div>
            </div>
        </div>
    )
}

export default CartItem