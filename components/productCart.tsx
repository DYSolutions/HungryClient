'use client'
import { CiHeart } from "react-icons/ci";
import { FaCartShopping } from "react-icons/fa6";
import Image from "next/image";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { useUser } from "@clerk/nextjs";
import { Product } from "@/types";

interface ProductCartProps {
    product: Product
}

const ProductCart = ({ product }: ProductCartProps) => {

    const router = useRouter();

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
        <div className="flex flex-col items-center justify-end w-[200px] cursor-pointer h-[290px] p-4 relative transform transition duration-300 ease-in-out hover:scale-105">
            <div className="absolute w-[120px] h-[120px] border-4 border-green-400 rounded-full top-0">
                <Image src={typeof product?.images[0] === 'string' ? product.images[0] : product?.images[0]?.url} alt="Product Image" width={120} height={120} className="rounded-full" />
            </div>
            <div className="flex flex-col items-center justify-between w-[200px] h-[220px] rounded-lg shadow-lg ">
                <div className="w-full flex flex-row justify-end items-center">
                    {/* <CiHeart className="p-1 h-7 w-7 " /> */}
                    <FaCartShopping
                        onClick={() => handleAddCart()}
                        className="text-white cursor-pointer bg-black p-2 h-7 w-7 rounded-tr-lg rounded-bl-lg" />
                </div>
                <div className="w-full h-[150px] flex flex-col items-center justify-center gap-2 rounded-lg">
                    <h3 className="font-medium">{product?.name}</h3>
                    <div className="flex flex-row justify-center items-center gap-2 text-[8px] font-semibold whitespace-nowrap">
                        {product?.category && <span className="bg-pink-200 px-1 rounded-lg">{product?.category}</span>}
                        {product?.cuisine && <span className="bg-blue-300 px-1 rounded-lg">{product?.cuisine}</span>}
                        {product?.kitchen && <span className="bg-red-300 px-1 rounded-lg">{product?.kitchen}</span>}
                        {product?.size && <span className="bg-yellow-200 px-1 rounded-lg">{product?.size}</span>}
                    </div>
                    <p className="text-[10px] text-center">You can see the available snippets
                        for a language by running the Insert Snippet command in the </p>

                    <div className="w-[80%] flex flex-row justify-between items-center mb-4">
                        <span className="px-2 py-1 rounded-full  text-[15px] font-semibold">LKR {product?.price}</span>
                        <button
                            onClick={() => router.push(`/menu/${product?.id}`)}
                            className="bg-green-400 cursor-pointer text-white px-2 py-1 rounded-full hover:bg-green-500 transition duration-300 font-semibold text-[15px]">
                            Buy Now
                        </button>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default ProductCart;