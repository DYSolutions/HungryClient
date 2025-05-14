
import { HomeIcon } from "lucide-react";
import Link from "next/link"
import ImageSlider from "@/components/imageSlider";
import { FaCartShopping } from "react-icons/fa6";
import ProductCart from "@/components/productCart";
import { FaDollarSign } from "react-icons/fa";
import AdProductCart from "@/components/adProductCart";


const ProductPage = async ({ params }: { params: { productId: string } }) => {
    const { productId } = await params;

    return (
        <div className="flex flex-col w-full h-auto">
            <div className="flex flex-row items-center justify-start gap-2 p-4 text-gray-600">
                <HomeIcon className="h-5 w-5" />
                <Link href="/" className="hover:text-green-400">Main menu </Link>
                <span>{">"}</span>
                <Link href="/menu" className="hover:text-green-400">Products</Link>
                <span>{">"}</span>
                <span className="text-gray-500">{productId}</span>
            </div>

            <div className="flex flex-row items-center justify-start w-full h-[600px] gap-2 p-4 text-gray-600">
                <ImageSlider />

                <div className=" w-[50%] h-full p-5 flex flex-col items-start justify-start gap-4">
                    <h4 className="font-bold text-black text-[20px]">Product Name</h4>
                    <p className=" text-black text-[15px] min-h-[60px]"> We offer a wide variety of cuisines, fast delivery, and excellent customer service.
                        You can see the available snippets
                        for a language by running the Insert Snippet command in the
                    </p>
                    <span className="text-black text-[14px] px-2 rounded-[5px] bg-pink-200 font-semibold">Category</span>
                    <div className="grid grid-cols-2 grid-rows-2 gap-4 w-[50%] ">
                        <h4 className="text-black text-[16px]">Price</h4>
                        <span className="text-black text-[18px] font-bold">$16.56</span>

                        <h4 className="text-black text-[16px]">Serves</h4>
                        <div className="flex flex-col items-start gap-2">
                            <div className="flex flex-row items-center gap-2">
                                {[1, 2, 3, 4, 5, 6].map((num) => (
                                    <div key={num} className="h-8 w-8 rounded-full border-2 flex flex-row items-center justify-center border-green-500 font-semibold text-black">
                                        {num}
                                    </div>
                                ))}

                                <label className="text-white ml-10 bg-green-500 rounded-lg flex flex-row items-center justify-center font-semibold h-8 w-8">1</label>
                                <button className="h-8 w-8 rounded-full border-2 border-green-500 flex flex-row items-center justify-center bg-white font-bold text-black cursor-pointer">
                                    +
                                </button>
                            </div>
                        </div>
                    </div>

                    <button className="bg-black text-white cursor-pointer h-10 px-2 w-[400px] whitespace-nowrap flex flex-row items-center justify-center gap-2 rounded-lg">Add to Cart <FaCartShopping /></button>
                </div>

                <div className="w-[30%] h-[600px] p-5 flex flex-col gap-2 rounded-lg bg-[#f8faf8d0]">
                    <div className="grid grid-cols-2 gap-2">
                        <h4 className="font-bold text-black text-[16px]">Serves</h4>
                        <span className="text-black text-[18px] font-bold">3</span>

                        <h4 className="font-bold text-black text-[16px]">Per Item</h4>
                        <span className="text-black text-[18px] font-bold">$16.56</span>
                    </div>

                    <hr />

                    <div className="grid grid-cols-2 gap-2">
                        <h4 className="font-bold text-black text-[16px]">Total</h4>
                        <span className="text-black text-[18px] font-bold">$46.56</span>
                    </div>
                    <button className="bg-black text-white cursor-pointer h-10 px-2 w-full mt-4 whitespace-nowrap flex flex-row items-center justify-center gap-2 rounded-lg">Pay & Buy Now <FaDollarSign /> {"23.3"}</button>

                    <div className="flex flex-col items-center justify-center h-[70%] w-full gap-2">
                        {[1, 2, 3].map((num) => (
                            <div key={num} className="w-full">
                                <AdProductCart />
                            </div>
                        ))}
                    </div>
                </div>
            </div>


            {/* Releted products */}
            <div className="w-full">
                <h4 className="font-bold text-black text-[20px]">Releted Products</h4>
                <div className="w-full p-4 grid grid-cols-6 gap-4">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((item) => (
                        <div key={item} >
                            <ProductCart />
                        </div>
                    ))}
                </div>
            </div>

        </div>
    )
}

export default ProductPage;