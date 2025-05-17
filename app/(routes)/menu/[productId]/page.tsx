'use client'
import { HomeIcon } from "lucide-react";
import Link from "next/link"
import ImageSlider from "@/components/imageSlider";
import { FaCartShopping } from "react-icons/fa6";
import ProductCart from "@/components/productCart";
import { FaDollarSign } from "react-icons/fa";
import AdProductCart from "@/components/adProductCart";
import ServesSelector from "@/components/servesSelector";
import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useUser } from "@clerk/nextjs";
import toast from "react-hot-toast";
import { Product } from "@/types";
import axios from "axios";


const ProductPage = () => {

    const [serves, setServes] = useState<number>(1)
    const router = useRouter();
    const params = useParams()
    const { user } = useUser()
    const [product, setProduct] = useState<Product>();
    const [products, setProducts] = useState<Product[]>([]);

    const handleAddCart = () => {
        if (user?.id) {
            // router.push(`/cart`)
            toast.success("Product added to cart")
        } else {
            router.push(`/sign-in`)
        }
    }

    const handleBuyProduct = () => {
        if (user?.id) {
            // router.push(`/cart`)
            toast.success("Product Purchessed")
        } else {
            router.push(`/sign-in`)
        }
    }

    async function fetchProducts() {
        try {
            const { productId } = await params;
            const res = await axios.get("/api/products");
            setProducts(res.data);
            const filteredProduct = res.data.find((product: Product) => product.id === productId);
            setProduct(filteredProduct)
        } catch (error) {
            console.log("ERROR CONNECTING API", error);
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    return (
        <div className="flex flex-col w-full h-auto">
            <div className="flex flex-row items-center justify-start gap-2 p-4 text-gray-600">
                <HomeIcon className="h-5 w-5" />
                <Link href="/" className="hover:text-green-400">Main menu </Link>
                <span>{">"}</span>
                <Link href="/menu" className="hover:text-green-400">Products</Link>
                <span>{">"}</span>
                <span className="text-gray-500">{product?.name}</span>
            </div>

            <div className="flex flex-row items-center justify-start w-full h-[600px] gap-2 p-4 text-gray-600">
                {product?.images && product.images.length > 0 && <ImageSlider images={product.images} />}

                <div className=" w-[50%] h-full p-5 flex flex-col items-start justify-start gap-4">
                    <h4 className="font-bold text-black text-[20px]">{product?.name}</h4>
                    <p className=" text-black text-[15px] min-h-[60px]"> We offer a wide variety of cuisines, fast delivery, and excellent customer service.
                        You can see the available snippets
                        for a language by running the Insert Snippet command in the
                    </p>
                    <span className="text-black text-[14px] px-2 rounded-[5px] bg-pink-200 font-semibold">{product?.category}</span>
                    <div className="grid grid-cols-2 grid-rows-2 gap-4 w-[50%] ">
                        <h4 className="text-black text-[16px]">Price</h4>
                        <span className="text-black text-[18px] font-bold">LKR {product?.price}</span>

                        <h4 className="text-black text-[16px]">Serves</h4>
                        <div className="flex flex-col items-start gap-2">
                            <ServesSelector serves={serves} setServes={setServes} />
                        </div>
                    </div>

                    <button
                        onClick={() => handleAddCart()}
                        className="bg-black text-white cursor-pointer h-10 px-2 w-[400px] whitespace-nowrap flex flex-row items-center justify-center gap-2 rounded-lg">
                        Add to Cart <FaCartShopping />
                    </button>
                </div>

                <div className="w-[30%] h-[600px] p-5 flex flex-col gap-2 rounded-lg bg-[#f8faf8d0]">
                    <div className="grid grid-cols-2 gap-2">
                        <h4 className="font-bold text-black text-[16px]">Serves</h4>
                        <span className="text-black text-[18px] font-bold">{serves}</span>

                        <h4 className="font-bold text-black text-[16px]">Per Item</h4>
                        <span className="text-black text-[18px] font-bold">LKR {product?.price}</span>
                    </div>

                    <hr />

                    <div className="grid grid-cols-2 gap-2">
                        <h4 className="font-bold text-black text-[16px]">Total</h4>
                        <span className="text-black text-[18px] font-bold">
                            LKR {(Number(product?.price) || 0) * serves}
                        </span>
                    </div>
                    <button
                        onClick={() => handleBuyProduct()}
                        className="bg-black text-white cursor-pointer h-10 px-2 w-full mt-4 whitespace-nowrap flex flex-row items-center justify-center gap-2 rounded-lg">
                        Pay & Buy Now <FaDollarSign /> {"23.3"}</button>

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
                    {products.filter((item: Product) => item.category === product?.category).map((product: Product) => (
                        <ProductCart key={product.id} product={product}
                        />
                    ))}
                </div>
            </div>

        </div>
    )
}

export default ProductPage;