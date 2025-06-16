import { Address, Order, User } from "@/types"
import { useUser } from "@clerk/nextjs"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { set } from "react-hook-form"
import toast from "react-hot-toast"
import { ImCross } from "react-icons/im"
import CancelOrderConfirmationModel from "./cancelOrderConfirmationModel"

interface ViewOrderModelProps {
    setIsViewOrderModalOpen: (value: boolean) => void
    Order?: Order
    orderData?: Order[]
    fetchUser: () => void
}

const ViewOrderModel = ({ setIsViewOrderModalOpen, Order, orderData ,fetchUser}: ViewOrderModelProps) => {
    const [animate, setAnimate] = useState(false)
    const { user } = useUser()
    const router = useRouter()

    const [isCancelOrderModalOpen, setIsCancelOrderModalOpen] = useState<boolean>(false);

    useEffect(() => {
        setAnimate(true)
    }, [])

    return (
        <div className={`fixed inset-0 z-50 bg-[#0000007c] transition-opacity duration-300 ease-in-out ${animate ? 'opacity-100' : 'opacity-0'}`}>
            <div
                className={`w-[40%] min-h-[50%] fixed top-[15%] left-[30%] bg-white rounded-md shadow-md p-5 transform transition-all duration-300 ease-in-out ${animate ? 'scale-100 translate-z-0' : 'scale-95 translate-z-10'
                    }`}
            >
                <div className="flex flex-row items-center justify-between absolute top-0 left-0 w-full p-2 py-3 rounded-t-md">
                    <div className="flex flex-row items-start  gap-4">
                        <h3 className="text-black tracking-wide pl-4"><span className="font-semibold">Order Id :</span> #{Order?.id}</h3>
                        <span className={`text-black font-semibold tracking-wide text-[12px] ${Order?.status.color} text-white p-1 rounded-md`}>{Order?.status.name}</span>
                    </div>
                    <button
                        onClick={() => setIsViewOrderModalOpen(false)}
                        className="bg-red-400 hover:bg-red-500 text-white font-bold text-[15px] p-3 rounded-md cursor-pointer"
                    >
                        <ImCross />
                    </button>
                </div>

                <div className="w-full h-[300px] p-5 bg-white mt-12 flex flex-col gap-4 overflow-y-scroll">
                    {Order?.orderItems.map((item) => (
                        <div className=" flex flex-row items-center justify-between gap-2 border p-3 rounded-md" key={item.id}>
                            <div className="w-[100px] h-[100px]">
                                <img src={item.images[0].url} alt="" className="w-full h-full object-cover rounded-md shadow-md" />
                            </div>
                            <div className="flex flex-col">
                                <h4 className="font-semibold text-black text-[15px]">{item.name}</h4>
                                <h4 className=" text-black text-[12px]">LKR {item.price}</h4>
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                <h4 className="font-semibold text-black text-[15px]"></h4>
                                <h4 className=" text-black text-[12px]">{item.serves}</h4>
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                <h4 className="font-semibold text-black text-[15px]"></h4>
                                <h4 className=" text-black text-[12px]">{Number(item.serves) * Number(item.price)} LKR</h4>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="w-[100%] p-5 mt-2  flex flex-row items-center justify-between">
                    <div className="w-full flex flex-row items-center bg-green-200 text-[#0a4805] justify-between gap-2 border p-3 rounded-md">
                        <h4 className=" font-semibold text-[16px]">Total</h4>
                        <h4 className=" font-semibold text-[16px]">LKR {Order?.totalPrice}</h4>
                    </div>
                </div>

                <div className="w-full p-5 bg-white flex flex-col gap-4">

                    {Order?.status.name === "PENDING" ? (
                        <button onClick={() => setIsCancelOrderModalOpen(true)} className="bg-red-400 hover:bg-red-500 text-white font-bold text-[15px] p-3 rounded-md cursor-pointer">
                            Cancel Order
                        </button>
                    ) : (
                        <button className={`${Order?.status.name === "COMPLETED" ?
                            " text-green-400"
                            : Order?.status.name === "CANCELED" ?
                                " text-red-400"
                                : Order?.status.name === "DELIVERED" ?
                                    "bg-green-400 hover:bg-green-500 text-white cursor-pointer"
                                    : "text-yellow-500"} font-bold text-[15px] p-3 rounded-md`
                        }
                        >
                            {
                                Order?.status.name === "COMPLETED" ?
                                    "Order Completed"
                                    : Order?.status.name === "CANCELED" ?
                                        "Order Cancelled"
                                        : Order?.status.name === "DELIVERED" ?
                                            "Add Review"
                                            : "Order Delivering"
                            }
                        </button>
                    )}
                </div>
            </div>
            {isCancelOrderModalOpen && Order?.id && orderData && (
                <CancelOrderConfirmationModel setIsCancelOrderModalOpen={setIsCancelOrderModalOpen} OrderId={Order.id} orderData={orderData} fetchUser={fetchUser} setIsViewOrderModalOpen={setIsViewOrderModalOpen} />
            )}
        </div>
    )
}

export default ViewOrderModel
