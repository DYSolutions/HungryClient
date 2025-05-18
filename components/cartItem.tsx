'use client'
import Image from "next/image"
import { useRouter } from "next/navigation"
import ServesSelector from "./servesSelector"
import { useEffect, useState } from "react"
import { MdDeleteForever } from "react-icons/md"
import { Product } from "@/types"
import axios from "axios"
import toast from "react-hot-toast"
import { useCart } from "@/providers/cartProvider"

interface CartItemProps {
    product: Product
    cartProducts: Product[]
    onClick: () => void
}
const CartItem = ({ product, cartProducts, onClick }: CartItemProps) => {

    const router = useRouter()
    const [serves, setServes] = useState<number>(product?.serves || 1)
    const { refreshCart } = useCart()

    const handleDeleteProduct = async (id: string) => {
        try {
            await axios.patch("/api/users", {
                cartProducts: cartProducts.filter((item: Product) => item.id !== id),
                updatedAt: new Date().toISOString(),
            })
            refreshCart()
            toast.success("Product removed from cart")
        } catch (error) {
            console.log("ERROR CONNECTING API", error);

        }
    }

    return (
        <div className="h-[120px] w-[100%] rounded-lg p-2 flex flex-row gap-2">
            <Image src={product?.images[0].url} alt="" height={100} width={100} className="rounded-lg" />
            <div className="flex flex-row items-start justify-start  w-full ">
                <div className="flex flex-col w-[30%] items-start h-full justify-between p-2 ">
                    <h4 className="font-bold text-black text-[15px] flex flex-row justify-between items-center w-full">{product?.name}</h4>
                    <h4 className="font-bold text-black text-[12px]">LKR {product?.price}</h4>
                    <div className="flex flex-row gap-1 text-[8px]">
                        {product?.category && <span className="bg-pink-200 px-1 rounded-lg">{product?.category}</span>}
                        {product?.cuisine && <span className="bg-blue-300 px-1 rounded-lg">{product?.cuisine}</span>}
                        {product?.kitchen && <span className="bg-red-300 px-1 rounded-lg">{product?.kitchen}</span>}
                        {product?.size && <span className="bg-green-300 px-1 rounded-lg">{product?.size}</span>}
                    </div>
                </div>
                <div className="flex flex-col w-[60%] items-center h-full justify-center p-2 ">
                    <ServesSelector serves={serves} setServes={setServes} product={product} onClick={onClick} />
                </div>
                <div className="flex flex-col w-[10%] items-center h-full justify-center p-2">
                    <MdDeleteForever
                        onClick={() => handleDeleteProduct(product?.id)}
                        className="text-red-500 cursor-pointer w-6 h-6 hover:scale-125 transition-all duration-300 ease-in-out" />
                </div>
            </div>
        </div>
    )
}

export default CartItem