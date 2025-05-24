'use client'
import { useCart } from "@/providers/cartProvider"
import { Product } from "@/types"
import { useUser } from "@clerk/nextjs"
import axios from "axios"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import toast from "react-hot-toast"
import { CiHeart } from "react-icons/ci"
import { FaCartShopping } from "react-icons/fa6"
import { IoMdStar, IoMdStarHalf, IoMdStarOutline } from "react-icons/io"

interface AdProductCartProps {
    product: Product
    setAdding: (adding: boolean) => void
}

const AdProductCart = ({ product, setAdding }: AdProductCartProps) => {

    const router = useRouter()
    const { user } = useUser()
    const { cartCount, refreshCart } = useCart()

    const handleAddCart = async (product: Product) => {
        if (user?.id) {
            try {
                setAdding(true)
                let userExists = true;
                try {
                    await axios.get("/api/user"); // will throw 404 if user doesn't exist
                } catch (err: any) {
                    if (err.response?.status === 404) {
                        userExists = false;
                    }
                }

                if (!userExists) {
                    await axios.post('/api/user', {
                        clerkUserId: user.id,
                        userName: user.fullName,
                        userEmail: user.emailAddresses[0].emailAddress,
                        isAdmin: false,
                        isActive: true,
                        soldProducts: [],
                        cartProducts: [product],
                        createdAt: new Date().toISOString(),
                    });
                    refreshCart()
                    toast.success("Product added to cart");
                }
                else {
                    const user = await axios.get("/api/user");
                    const alreadyExists = user.data.cartProducts.some((item: Product) => item.id === product.id);
                    if (alreadyExists) {
                        toast.error("Product already in cart");
                        return;
                    }
                    await axios.patch('/api/user', {
                        cartProducts: [...user.data.cartProducts, product],
                        updatedAt: new Date().toISOString(),
                    });
                }
                refreshCart()
                toast.success("Product added to cart");
            } catch (error) {
                console.log("ERROR ADDING PRODUCT TO CART", error);
                toast.error("Failed to add product");
            } finally {
                setAdding(false)
            }
        } else {
            router.push(`/sign-in`);
        }
    };

    useEffect(() => {
        product?.serves === 1
    }, [product?.serves])

    return (
        <div className="h-[120px] w-[100%]  border-2 border-gray-200 cursor-pointer rounded-lg p-2 flex flex-row gap-2 hover:scale-105 transition-all duration-300 ease-in-out">
            <Image src={product?.images[0]?.url} alt="" height={100} width={100} className="rounded-lg" />
            <div className="flex flex-col gap-[5px] items-start justify-start p-2  w-full">
                <h4 className="font-bold text-black text-[15px] flex flex-row justify-between items-center w-full">{product?.name}
                    <FaCartShopping
                        onClick={() => handleAddCart({ ...product, serves: 1 } as Product)}
                        className="text-white cursor-pointer bg-black p-[7px] h-6 w-6 rounded-lg " /></h4>
                <h4 className="font-bold text-black text-[12px]">LKR {product?.price}</h4>
                <div className="flex flex-row items-center justify-between w-full gap-2 ">
                    <div className="flex flex-row gap-2">
                        {[1, 2, 3, 4].map((num) => (
                            // <IoMdStarOutline className="text-yellow-400"/>
                            <IoMdStar key={num} className="text-yellow-400" />
                        ))}
                        <IoMdStarHalf className="text-yellow-400" />
                    </div>
                    <button
                        onClick={() => router.push(`/menu/${product?.id}`)}
                        className="bg-green-400 whitespace-nowrap cursor-pointer text-white px-2 py-1 rounded-full hover:bg-green-500 transition duration-300 font-semibold text-[15px]">
                        Buy Now
                    </button>
                </div>
            </div>
        </div>
    )
}

export default AdProductCart