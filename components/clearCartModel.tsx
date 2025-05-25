import { useCart } from "@/providers/cartProvider"
import { Address, Product, User } from "@/types"
import { useUser } from "@clerk/nextjs"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { set } from "react-hook-form"
import toast from "react-hot-toast"
import { ImCross } from "react-icons/im"

interface ClearCartModelProps {
    setIsClearCartModalOpen: (value: boolean) => void
    setSelectedProducts: (value: Product[]) => void
}

const ClearCartModel = ({ setIsClearCartModalOpen, setSelectedProducts }: ClearCartModelProps) => {

    const [animate, setAnimate] = useState(false)
    const [isUpdating, setIsUpdating] = useState(false)
    const { cartCount, refreshCart } = useCart()

    useEffect(() => {
        setAnimate(true)
    }, [])

    const handleClearCart = async () => {
        try {
            setIsUpdating(true)
            await axios.patch("/api/user", {
                cartProducts: [],
                updatedAt: new Date().toISOString(),
            })
            refreshCart()
            setSelectedProducts([])
            toast.success("Cart cleared")
        } catch (error) {
            console.log("ERROR CONNECTING API", error);
        } finally {
            setIsUpdating(false)
        }
        setIsClearCartModalOpen(false)
    }


    return (
        <div className={`fixed inset-0 z-50 bg-[#0000007c] transition-opacity duration-300 ease-in-out ${animate ? 'opacity-100' : 'opacity-0'}`}>
            <div
                className={`w-[30%]  fixed top-[35%] left-[35%] bg-white rounded-md shadow-md p-5 transform transition-all duration-300 ease-in-out ${animate ? 'scale-100 translate-z-0' : 'scale-95 translate-z-10'
                    }`}
            >

                <div className="w-full  bg-white mt-4 flex flex-col items-center justify-center">
                    <span>Are you sure you want to clear your cart ?</span>
                    <div className="flex flex-row items-center justify-center gap-2 mt-5">
                        <button
                            onClick={() => setIsClearCartModalOpen(false)}
                            className="bg-red-400 text-white font-bold text-[15px] p-3 w-[20vh] rounded-md cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleClearCart}
                            className="bg-green-400 text-white font-bold text-[15px] w-[20vh] p-3 rounded-md cursor-pointer"
                        >
                            {isUpdating ? "Processing..." : "Clear"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ClearCartModel
