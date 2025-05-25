'use client'
import { BsFillEyeFill } from "react-icons/bs";
import ViewOrderModel from "@/components/viewOrderModel";
import { useEffect, useState } from "react";
import { Order, User } from "@/types";
import axios from "axios";
import { useLoader } from "@/contacts/loaderContact";
import Loader from "@/components/loader";
import CancelOrderConfirmationModel from "@/components/cancelOrderConfirmationModel";
import { Timestamp } from "firebase/firestore";

const OrdersPage = () => {

    const [isViewOrderModalOpen, setIsViewOrderModalOpen] = useState<boolean>(false);
    const [isCancelOrderModalOpen, setIsCancelOrderModalOpen] = useState<boolean>(false);
    const [userData, setUserData] = useState<User>();
    const { setIsLoading, isLoading } = useLoader();
    const [selectedOrder, setSelectedOrder] = useState<Order>();
    const [cancelOrderId, setCancelOrderId] = useState<string>("");

    async function fetchUser() {
        try {
            setIsLoading(true)
            const res = await axios.get("/api/user")
            setUserData(res.data);
        } catch (error) {
            console.log("ERROR CONNECTING API", error);
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchUser();
    }, []);


    return isLoading ? <Loader /> : (
        <div className="flex flex-col w-full h-auto p-4 min-h-[600px] mb-10">
            {isViewOrderModalOpen && <ViewOrderModel setIsViewOrderModalOpen={setIsViewOrderModalOpen} Order={selectedOrder} userData={userData} fetchUser={fetchUser} />}
            {isCancelOrderModalOpen && <CancelOrderConfirmationModel setIsCancelOrderModalOpen={setIsCancelOrderModalOpen} OrderId={cancelOrderId} userData={userData} fetchUser={fetchUser} />}
            <div className="w-full h-[50px] flex flex-row items-center justify-between">
                <h4 className="font-bold text-black text-[20px]">My Orders {"(" + (userData?.soldProducts?.length || "0") + ")"}</h4>
            </div>

            <div className="w-full h-full flex flex-col items-start justify-start gap-2">
                <div className="w-full h-auto p-3 shadow-md flex flex-row items-center justify-between">
                    <div className="w-[30%] h-full flex flex-row items-start justify-start">
                        <h4 className="font-semibold text-black text-[15px]">Items</h4>
                    </div>
                    <div className="w-[50%] h-full flex flex-row items-center justify-start">
                        <h4 className="font-semibold text-black text-[15px]">Order ID</h4>
                    </div>
                    <div className="w-[30%] h-full flex flex-row items-center justify-start">
                        <h4 className="font-semibold text-black text-[15px]">Date</h4>
                    </div>
                    <div className="w-[30%] h-full flex flex-row items-center justify-start">
                        <h4 className="font-semibold text-black text-[15px]">Total</h4>
                    </div>
                    <div className="w-[30%] h-full flex flex-row items-center justify-start">
                        <h4 className="font-semibold text-black text-[15px]">Status</h4>
                    </div>
                    <div className="w-[30%] h-full flex flex-row items-center justify-start">
                        <h4 className="font-semibold text-black text-[15px]">Actions</h4>
                    </div>
                </div>

{userData?.soldProducts?
(<>
                {userData?.soldProducts
                    ?.slice()
                    .sort((a: Order, b: Order) => {
                        const dateA = a.createdAt instanceof Timestamp ? a.createdAt.toDate() : new Date(a.createdAt);
                        const dateB = b.createdAt instanceof Timestamp ? b.createdAt.toDate() : new Date(b.createdAt);
                        return dateB.getTime() - dateA.getTime();
                    })
                    .map((order: Order) => (
                        <div key={order.id} className="w-full h-auto p-3 flex flex-row items-center justify-between">
                            <div className="w-[30%] h-full flex flex-row items-start justify-start">
                                <h4 className=" text-black text-[15px] pl-2"><BsFillEyeFill onClick={() => { setSelectedOrder(order); setIsViewOrderModalOpen(true) }} className="h-6 w-6 cursor-pointer text-green-400" /></h4>
                            </div>
                            <div className="w-[50%] h-full flex flex-row items-center justify-start">
                                <h4 className=" text-black text-[15px] whitespace-nowrap">{order.id}</h4>
                            </div>
                            <div className="w-[30%] h-full flex flex-row items-center justify-start">
                                <h4 className=" text-black text-[15px]">{order.createdAt.toString().slice(0, 15)}</h4>
                            </div>
                            <div className="w-[30%] h-full flex flex-row items-center justify-start">
                                <h4 className=" text-black text-[15px]">{order.totalPrice} LKR</h4>
                            </div>
                            <div className="w-[30%] h-full flex flex-row items-center justify-start">
                                <h4 className={` text-black text-[12px] font-semibold ${order.status.color} text-white p-1 rounded-md`}>{order.status.name}</h4>
                            </div>
                            <div className="w-[30%] h-full flex flex-row items-center justify-start">
                                <div className="w-auto bg-white flex flex-col gap-4">

                                    {order?.status.name === "PENDING" ? (
                                        <button onClick={() => { { setCancelOrderId(order.id), setIsCancelOrderModalOpen(true) } }} className="bg-red-400 hover:bg-red-500 text-white font-bold text-[10px] p-2 rounded-md cursor-pointer">
                                            Cancel Order
                                        </button>
                                    ) : (
                                        <button className={`${order?.status.name === "COMPLETED" ?
                                            " text-green-400"
                                            : order?.status.name === "CANCELED" ?
                                                " text-red-400"
                                                : order?.status.name === "DELIVERED" ?
                                                    "bg-green-400 hover:bg-green-500 text-white cursor-pointer"
                                                    : "text-yellow-500"} font-bold text-[12px] p-1 rounded-md`
                                        }
                                        >
                                            {
                                                order?.status.name === "COMPLETED" ?
                                                    "Order Completed"
                                                    : order?.status.name === "CANCELED" ?
                                                        "Order Cancelled"
                                                        : order?.status.name === "DELIVERED" ?
                                                            "Add Review"
                                                            : "Order Delivering"
                                            }
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                    </>)
                    :(
                        <div className="w-full h-[400px] flex flex-row items-center justify-center">
                            <h4 className=" text-black text-[15px]">No orders found</h4>
                        </div>
                    ) }
            </div>
        </div>
    )
}

export default OrdersPage