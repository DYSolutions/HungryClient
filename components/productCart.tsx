'use client'
import { CiHeart } from "react-icons/ci";
import { FaCartShopping } from "react-icons/fa6";
import Image from "next/image";
import { useRouter } from "next/navigation";

const ProductCart = () => {

    const router =useRouter();
    return (
        <div className="flex flex-col items-center justify-end w-[200px] cursor-pointer h-[290px] p-4 relative transform transition duration-300 ease-in-out hover:scale-105">
            <div className="absolute w-[120px] h-[120px] border-4 border-green-400 rounded-full top-0">
                <Image src="/demo.jpg" alt="Product Image" width={120} height={120} className="rounded-full" />
            </div>
            <div className="flex flex-col items-center justify-between w-[200px] h-[220px] rounded-lg shadow-lg ">
                <div className="w-full flex flex-row justify-between items-center">
                    <CiHeart className="p-1 h-7 w-7 " />
                    <FaCartShopping className="text-white cursor-pointer bg-black p-2 h-7 w-7 rounded-tr-lg rounded-bl-lg" />
                </div>
                <div className="w-full h-[150px] flex flex-col items-center justify-center gap-2 rounded-lg">
                    <h3 className="font-medium">Product Name</h3>
                    <div className="flex flex-row justify-between items-center gap-2 text-[10px] font-semibold">
                        <span className="bg-pink-200 px-1 rounded-lg">category</span>
                        <span className="bg-blue-300 px-1 rounded-lg">cuisine</span>
                        <span className="bg-red-300 px-1 rounded-lg">kitchin</span>
                        <span className="bg-yellow-200 px-1 rounded-lg">M</span>
                    </div>
                    <p className="text-[10px] text-center">You can see the available snippets
                        for a language by running the Insert Snippet command in the </p>

                    <div className="w-[80%] flex flex-row justify-between items-center mb-4">
                        <span className="px-2 py-1 rounded-full border-2 border-gray-300 text-[15px] font-semibold">$ 20</span>
                        <button 
                        onClick={()=>router.push(`/menu/${"jnejfnejfnjenf"}`)}
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