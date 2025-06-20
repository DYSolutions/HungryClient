'use client'
import CartItem from "@/components/cartItem"
import { useCart } from "@/providers/cartProvider"
import { Product, User } from "@/types"
import { useUser } from "@clerk/nextjs"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { FaDollarSign } from "react-icons/fa6"
import { TiTick } from "react-icons/ti"
import { useLoader } from "@/contacts/loaderContact"
import Loader from "@/components/loader"
import { set } from "react-hook-form"
import Processing from "@/components/processing"
import { setProducts } from "@/redux/slices/productSlice"
import { useDispatch } from "react-redux"
import ClearCartModel from "@/components/clearCartModel"

const CartPage = () => {

    const dispatch = useDispatch()
    const { isLoading, setIsLoading } = useLoader()
    const { user } = useUser()
    const { cartCount, refreshCart } = useCart()
    const router = useRouter()
    const [isView, setIsView] = useState<boolean>(false)
    const [cartProducts, setCartProducts] = useState<Product[]>([])
    const [selectedProducts, setSelectedProducts] = useState<Product[]>([])
    const [processing, setProcessing] = useState<boolean>(false)
    const [isClearCartModalOpen, setIsClearCartModalOpen] = useState<boolean>(false)

    useEffect(() => {
        if (!user?.id) {
            router.back()
        } else {
            setIsView(true)
        }
    }, [])

    const handleSelect = (product: Product) => {
        if (selectedProducts.find((item) => item.id === product.id)) {
            setSelectedProducts((prevSelectedProducts) => prevSelectedProducts.filter((item) => item.id !== product.id));
        } else {
            setSelectedProducts((prevSelectedProducts) => [...prevSelectedProducts, product]);
        }
    }

    const handleChange = (product: Product) => {
        setSelectedProducts(selectedProducts.map((item) => item.id === product.id ? { ...item, serves: product.serves } : item));

    }

    const handleBuyProduct = (products: Product[]) => {
        if (user?.id) {
            if (products.length === 0) {
                toast.error("Please select at least one product")
            } else {
                router.push(`/payment`)
                dispatch(
                    setProducts(products)
                )
            }
        } else {
            router.push(`/sign-in`)
        }
    }

    async function fetchCartItems() {
        try {
            setIsLoading(true)
            const user = await axios.get("/api/user");
            setCartProducts(user.data.cartProducts);
        } catch (error) {
            console.log("ERROR CONNECTING API", error);
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchCartItems();
        dispatch(
            setProducts([])
        )
    }, [cartCount])


    const total = selectedProducts.reduce((acc, product) => acc + (Number(product.price) * (product?.serves ?? 1)), 0);

    if (isLoading) return <Loader />

    return (
        <>
            {isClearCartModalOpen && <ClearCartModel setIsClearCartModalOpen={setIsClearCartModalOpen} setSelectedProducts={setSelectedProducts} />}
            {processing && <Processing />}
            {isView && (
                <div className="flex flex-col w-full h-auto p-4 min-h-[600px] mb-10">
                    <div className="w-full h-[50px] flex flex-row items-center justify-between">
                        <h4 className="font-bold text-black text-[20px]">Cart Items {"(" + cartProducts.length + ")"}</h4>
                        <button onClick={() => setIsClearCartModalOpen(true)}
                            className="bg-red-400 whitespace-nowrap cursor-pointer text-white px-2 py-1 rounded-[5px] hover:bg-red-500 transition duration-300 font-semibold text-[15px]">
                            Clear Cart
                        </button>
                    </div>
                    <div className="flex flex-row items-start justify-between">
                        <div className="flex flex-col gap-4 mt-4 w-[60%]">
                            {cartProducts?.length === 0 && <h4 className="text-black h-[400px] w-full text-[15px] flex flex-row items-center justify-center">Cart is empty</h4>}
                            {cartProducts.map((product) => (
                                <div
                                    key={product.id}
                                    className={`h-[120px] w-[100%] flex flex-row items-center justify-between rounded-lg `}>
                                    <div
                                        onClick={() => handleSelect(product)}
                                        className={`h-5 w-5 border-2 rounded-[5px] flex flex-row items-center justify-center cursor-pointer ${selectedProducts.find((item) => item.id === product.id) ? 'border-green-400' : 'border-gray-300'}`}>
                                        <TiTick className={`h-3 w-3 ${selectedProducts.find((item) => item.id === product.id) ? 'text-green-400' : 'text-gray-300'}`} />
                                    </div>
                                    <div className={`h-[120px] w-[95%] shadow-lg flex flex-row items-center justify-between rounded-lg border-2 ${selectedProducts.find((item) => item.id === product.id) ? 'border-green-400' : 'border-gray-100'}`}>
                                        <CartItem key={product.id} product={product} cartProducts={cartProducts} onClick={() => handleChange(product)} setProcessing={setProcessing} />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="w-[35%] flex flex-col mt-4  items-start justify-start p-7 rounded-lg bg-green-50">
                            <div className="text-black font-bold text-[15px]"><span className=" text-green-600">{selectedProducts.length} </span>Selected</div>
                            <div className="grid grid-cols-2 w-full gap-2 mt-4">
                                <h4 className="text-black font-bold text-[20px]">Total</h4>
                                <h4 className="text-black font-bold text-[20px]">LKR {total}</h4>
                            </div>
                            <button
                                onClick={() => handleBuyProduct(selectedProducts as Product[])}
                                className="bg-black text-white cursor-pointer h-10 px-2 w-full mt-4 whitespace-nowrap flex flex-row items-center justify-center gap-2 rounded-lg"
                            >
                                Pay Now</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}

export default CartPage