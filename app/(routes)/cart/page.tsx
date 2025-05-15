'use client'
import CartItem from "@/components/cartItem"
import { useState } from "react"
import { FaDollarSign } from "react-icons/fa6"
import { SiTicktick } from "react-icons/si"
import { TiTick } from "react-icons/ti"

const data = [
    {
        id: 1,
        selected: false,
    },
    {
        id: 2,
        selected: false,
    },
    {
        id: 3,
        selected: false,
    },
    {
        id: 4,
        selected: false,
    },
]

const CartPage = () => {

    const [selectedCount, setSelectedCount] = useState<number>(0)

    const handleSelect = (id: number) => {

        data.map((item) => item.id === id ? item.selected = !item.selected : item.selected = item.selected)

        setSelectedCount(data.filter((item) => item.selected).length)
    }

    return (
        <div className="flex flex-col w-full h-auto p-4 min-h-[600px] mb-10">
            <div className="w-full h-[50px] flex flex-row items-center justify-between">
                <h4 className="font-bold text-black text-[20px]">Cart Items</h4>
                <button className="bg-red-400 whitespace-nowrap cursor-pointer text-white px-2 py-1 rounded-[5px] hover:bg-red-500 transition duration-300 font-semibold text-[15px]">Clear Cart</button>
            </div>
            <div className="flex flex-row items-start justify-between">
                <div className="flex flex-col gap-4 mt-4 w-[60%]">
                    {data.map((data) => (
                        <div
                            key={data.id}
                            className={`h-[120px] w-[100%] flex flex-row items-center justify-between rounded-lg `}>
                            <div
                                onClick={() => handleSelect(data.id)}
                                className={`h-5 w-5 border-2 rounded-[5px] flex flex-row items-center justify-center cursor-pointer ${data.selected ? 'border-green-400' : 'border-gray-300'}`}>
                                <TiTick className={`h-3 w-3 ${data.selected ? 'text-green-400' : 'text-gray-300'}`} />
                            </div>
                            <div className={`h-[120px] w-[95%] shadow-lg flex flex-row items-center justify-between rounded-lg border-2 ${data.selected ? 'border-green-400' : 'border-gray-100'}`}>
                                <CartItem />
                            </div>
                        </div>
                    ))}
                </div>
                <div className="w-[35%] flex flex-col mt-4  items-start justify-start p-7 rounded-lg bg-green-50">
                    <div className="text-black font-bold text-[15px]"><span className=" text-green-600">{selectedCount} </span>Selected</div>
                    <div className="grid grid-cols-2 w-full gap-2 mt-4">
                        <h4 className="text-black font-bold text-[20px]">Total</h4>
                        <h4 className="text-black font-bold text-[20px]">$ 0</h4>
                    </div>
                    <button className="bg-black text-white cursor-pointer h-10 px-2 w-full mt-4 whitespace-nowrap flex flex-row items-center justify-center gap-2 rounded-lg">Pay Now <FaDollarSign /> {0}</button>
                </div>
            </div>
        </div>
    )
}

export default CartPage