'use client'
import { useAppSelector } from "@/redux/hooks";
import { Order, Product } from "@/types";
import React, { useEffect, useState } from "react";
import { FaProductHunt, FaShoppingCart } from "react-icons/fa";
import AddressModel from "@/components/addressModel";
import { DeleteIcon, Edit, } from "lucide-react";
import { RiDeleteBinLine } from "react-icons/ri";
import { FaAddressCard, FaUser } from "react-icons/fa6";
import { IoCheckmarkDoneCircleSharp } from "react-icons/io5";
import { ImCross } from "react-icons/im";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { useLoader } from "@/contacts/loaderContact";
import Loader from "@/components/loader";
import axios from "axios";
import { User } from "@/types"
import toast from "react-hot-toast";
import RemoveAddressModel from "@/components/removeAddressModel";
import { useCart } from "@/providers/cartProvider";
import PaymentSuccessModel from "@/components/paymentSucsessModel";


type CardForm = {
    name: string;
    number: string;
    expiry: string;
    cvv: string;
};

const Page = () => {

    // const { user } = useUser();
    const router = useRouter();
    const { isLoading, setIsLoading } = useLoader()
    const { cartCount, refreshCart } = useCart()
    const [isPaymentLoading, setIsPaymentLoading] = useState(false)
    const products: Product[] = useAppSelector((state) => state.productSlice.products);

    // useEffect(() => {
    //     setIsLoading(true)
    //     if (!user?.id) {
    //         router.push('/sign-in')
    //     }
    //     setIsLoading(false)
    // }, [])

    const [form, setForm] = useState<CardForm>({
        name: "",
        number: "",
        expiry: "",
        cvv: "",
    });

    const [errors, setErrors] = useState<Partial<CardForm>>({});
    const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
    const [isRemoveAddressModalOpen, setIsRemoveAddressModalOpen] = useState(false);
    const [isPaymentSuccessModalOpen, setIsPaymentSuccessModalOpen] = useState(false);
    const [userData, setUserData] = useState<User>();
    const [cartProducts, setCartProducts] = useState<Product[]>([])

    const validate = () => {
        const errs: Partial<CardForm> = {};
        if (!form.name.trim()) errs.name = "Cardholder name is required.";
        if (!/^\d{16}$/.test(form.number)) errs.number = "Card number must be 16 digits.";
        if (!/^\d{2}\/\d{2}$/.test(form.expiry)) errs.expiry = "Expiry must be in MM/YY format.";
        if (!/^\d{3,4}$/.test(form.cvv)) errs.cvv = "CVV must be 3 or 4 digits.";
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    async function fetchUser() {
        try {
            const user = await axios.get("/api/user");
            console.log("user", user.data);

            setUserData(user.data)
        } catch (error) {
            console.log("ERROR CONNECTING API", error);
        } finally {
        }
    }

    useEffect(() => {
        if (!isAddressModalOpen || !isRemoveAddressModalOpen) {
            fetchUser();
        }
    }, [isAddressModalOpen, isRemoveAddressModalOpen]);


    const total = products.reduce((acc, product) => acc + Number(product.price) * Number(product.serves || 1), 0);

    const handlePay = async () => {
        if (!userData?.shippingAddress) {
            toast.error("Please add shipping address")
            return
        }

        if (products.length === 0) {
            toast.error("Please add products to cart")
            return
        }

        if (!validate()) return;

        const order: Order = {
            id: crypto.randomUUID(),
            userId: userData.id,
            status: {
                name: "PENDING",
                pending: "bg-yellow-500"
            },
            shippingAddress: userData.shippingAddress,
            orderItems: products,
            totalPrice: total,
            paymentMethod: "cart",
            createdAt: new Date().toString(),
            updatedAt: new Date().toString(),
        }

        try {
            setIsPaymentSuccessModalOpen(true)
            setIsPaymentLoading(true)
            await axios.patch("/api/user", {
                soldProducts: [...userData.soldProducts, order],
                updatedAt: new Date().toString(),
            })

            try {

                let cartProducts = userData.cartProducts
                {
                    products.map(async (product: Product) => {
                        cartProducts = cartProducts.filter((item: Product) => item.id !== product.id)
                    })
                    await axios.patch("/api/user", {
                        cartProducts: cartProducts,
                        updatedAt: new Date().toISOString(),
                    })
                }

                refreshCart()
            } catch (error) {
                console.log("ERROR CONNECTING CART API", error);
                setIsPaymentLoading(false)
                setIsPaymentSuccessModalOpen(false)
            }

            toast.success("Payment successful");
        } catch (error) {
            console.log("ERROR CONNECTING PAYMENT API", error);
            toast.error("Payment failed")
            setIsPaymentLoading(false)
            setIsPaymentSuccessModalOpen(false)
        } finally {
            setIsPaymentLoading(false)
        }
    };


    if (isLoading) return <Loader />

    return (
        <div className="w-full  min-h-[80vh] flex flex-col justify-start items-center mt-4">
            {isAddressModalOpen &&
                <AddressModel
                    setIsAddressModalOpen={setIsAddressModalOpen}
                    userData={userData}
                />
            }

            {isPaymentSuccessModalOpen &&
                <PaymentSuccessModel
                    isPaymentloading={isPaymentLoading}
                />
            }

            {isRemoveAddressModalOpen &&
                <RemoveAddressModel
                    setIsRemoveAddressModalOpen={setIsRemoveAddressModalOpen}
                    userData={userData}
                />
            }
            <div className="w-full   p-5 rounded-md flex flex-row gap-1">
                <div className="w-[30vh] min-h-[20vh] p-5 border-1 border-gray-400 border-dashed rounded-md bg-white">
                    {userData?.shippingAddress ?
                        <>
                            <h3 className="text-[12px] font-bold mb-2 flex flex-row justify-between">
                                Shipping Address
                                <div className="flex flex-row items-center justify-center gap-2">
                                    <Edit onClick={() => setIsAddressModalOpen(true)} className="w-4 text-green-400 cursor-pointer" />
                                    <RiDeleteBinLine onClick={() => setIsRemoveAddressModalOpen(true)} className="w-4 h-4 text-red-400 cursor-pointer" />
                                </div>
                            </h3>
                            <ul className="text-[10px] font-semibold flex flex-col gap-1">
                                <li>{userData?.shippingAddress.shippingName || "Name Not Found"}</li>
                                <li>{userData?.shippingAddress.shippingAddress || "Address Not Found"}</li>
                                <li>{userData?.shippingAddress.shippingCity || "City Not Found"}, {userData?.shippingAddress.shippingCode || "Code Not Found"}</li>
                                <li>{userData?.shippingAddress.shippingCountry || "Country Not Found"}</li>
                                <li>{userData?.shippingAddress.shippingPhone || "Phone Not Found"} </li>
                                <li>{userData?.shippingAddress.shippingEmail || "Email Not Found"}</li>
                            </ul>
                        </>
                        :
                        <div
                            onClick={() => setIsAddressModalOpen(true)}
                            className="w-full h-full text-gray-400 flex items-center justify-center font-bold cursor-pointer">
                            Add Address
                        </div>
                    }
                </div>

                <div className="w-[calc(100%-30vh)] min-h-[20vh] p-5 flex flex-row items-center justify-center gap-2">
                    <div className="w-[15vh] h-[15vh]  flex flex-col items-center justify-center">
                        <FaUser className="p-5 bg-green-400 w-20 h-20 rounded-full text-white shadow-md" />
                        <span className="font-semibold text-md text-green-400 whitespace-nowrap ">User Verified</span>
                    </div>

                    <div className="w-[15vh] h-[5px] bg-green-400 rounded-2xl"></div>

                    <div className="w-[15vh] h-[15vh] flex flex-col items-center justify-center">
                        <FaProductHunt className="p-5 bg-green-400 w-20 h-20 rounded-full text-white shadow-md" />
                        <span className="font-semibold text-md text-green-400 whitespace-nowrap ">Product Selected</span>
                    </div>

                    <div className={`w-[15vh] h-[5px]  ${userData?.shippingAddress ? "bg-green-400" : "bg-red-300"} rounded-2xl`}></div>

                    <div className="w-[15vh] h-[15vh] flex flex-col items-center justify-center">
                        <FaAddressCard className={`p-5  ${userData?.shippingAddress ? "bg-green-400" : "bg-red-300"} w-20 h-20 rounded-full text-white shadow-md`} />
                        <span className={`font-semibold text-md ${userData?.shippingAddress ? "text-green-400" : "text-red-300"} whitespace-nowrap`}> {userData?.shippingAddress ? "Address Added" : "Address Not Added"}</span>
                    </div>

                    <div className={`w-[15vh] h-[5px]  ${userData?.shippingAddress ? "bg-green-400" : "bg-red-300"} rounded-2xl`}></div>

                    <div className="w-[15vh] h-[15vh] flex flex-col items-center justify-center">
                        {/* <ImCross /> */}
                        <IoCheckmarkDoneCircleSharp className={`p-5 ${userData?.shippingAddress ? "bg-green-400" : "bg-red-300"} w-20 h-20 rounded-full text-white shadow-md`} />
                        <span className={`font-semibold text-md ${userData?.shippingAddress ? "text-green-400" : "text-red-300"} whitespace-nowrap`}>{userData?.shippingAddress ? "You can Pay Now" : "You can't Pay Now"}</span>
                    </div>
                </div>

            </div>
            <div className="w-full p-10 flex flex-row items-center justify-center gap-10">
                <div className="flex flex-col items-center justify-between h-[50vh] gap-2">
                    <div className="w-[400px] h-full max-w-md mx-auto mt-10 p-6  ">
                        <div className="w-full h-[30vh] flex flex-col justyfy-start items-center gap-2 overflow-auto">
                            {products.map((product) => (
                                <div key={product.id} className="w-full h-[10vh] flex flex-row justify-between items-center">
                                    <div className="w-[10vh] h-[10vh] rounded-md ">
                                        <img
                                            src={product.images[0].url}
                                            alt={product.name}
                                            className="w-full h-full object-cover rounded-md"
                                        />
                                    </div>
                                    <div className="w-[15vh] h-[10vh] flex flex-col justify-end items-start gap-2 font-semibold text-sm pl-6 pb-4 ">
                                        <span>{product.name}</span>
                                        <span>{product.serves || "1"} * {product.price} LKR</span>
                                    </div>
                                    <div className="w-[10vh] h-[10vh] flex flex-col justify-end items-center font-semibold text-sm pb-4 ">{Number(product.serves || 1) * Number(product.price)} LKR</div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="w-[80%] h-[12vh] border-t-1 boreder-gray-300 flex flex-row justify-end font-semibold items-center">
                        <span>Total: {total} LKR</span>
                    </div>
                </div>

                <div className="w-[1px] h-[30vh] bg-gray-200"></div>

                <div className="flex flex-col items-center justify-center">
                    <div className="max-w-md mx-auto mt-10 p-6 border rounded-2xl shadow-md bg-white">
                        <div className="flex items-center justify-center mb-6 gap-2 text-xl font-bold">
                            <FaShoppingCart className="text-green-600 text-2xl" />
                            <h2>Pay with Card</h2>
                        </div>

                        <div className="mb-4">
                            <label className="block mb-1 font-medium">Cardholder Name</label>
                            <input
                                type="text"
                                name="name"
                                value={form.name}
                                onChange={handleChange}
                                className="w-full border px-3 py-2 rounded"
                            />
                            {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                        </div>

                        <div className="mb-4">
                            <label className="block mb-1 font-medium">Card Number</label>
                            <input
                                type="text"
                                name="number"
                                maxLength={16}
                                value={form.number}
                                onChange={handleChange}
                                className="w-full border px-3 py-2 rounded"
                            />
                            {errors.number && <p className="text-red-500 text-sm">{errors.number}</p>}
                        </div>

                        <div className="flex gap-4 mb-4">
                            <div className="w-1/2">
                                <label className="block mb-1 font-medium">Expiry (MM/YY)</label>
                                <input
                                    type="text"
                                    name="expiry"
                                    placeholder="MM/YY"
                                    value={form.expiry}
                                    onChange={handleChange}
                                    className="w-full border px-3 py-2 rounded"
                                />
                                {errors.expiry && <p className="text-red-500 text-sm">{errors.expiry}</p>}
                            </div>

                            <div className="w-1/2">
                                <label className="block mb-1 font-medium">CVV</label>
                                <input
                                    type="password"
                                    name="cvv"
                                    maxLength={4}
                                    value={form.cvv}
                                    onChange={handleChange}
                                    className="w-full border px-3 py-2 rounded"
                                />
                                {errors.cvv && <p className="text-red-500 text-sm">{errors.cvv}</p>}
                            </div>
                        </div>

                        <button
                            onClick={handlePay}
                            className="w-full cursor-pointer flex justify-center items-center gap-2 bg-green-600 text-white py-2 rounded hover:bg-green-700"
                        >
                            <FaShoppingCart className="text-white" />
                            Pay Now {total} LKR
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Page


