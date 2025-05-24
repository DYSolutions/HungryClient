import { Address, User } from "@/types"
import { useUser } from "@clerk/nextjs"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { set } from "react-hook-form"
import toast from "react-hot-toast"
import { ImCross } from "react-icons/im"

interface AddressModelProps {
    setIsRemoveAddressModalOpen: (value: boolean) => void
    userData?: User
}

const RemoveAddressModel = ({ setIsRemoveAddressModalOpen, userData }: AddressModelProps) => {
    const [animate, setAnimate] = useState(false)
    const { user } = useUser()
    const router = useRouter()

    const [isUpdating, setIsUpdating] = useState(false)

    useEffect(() => {
        setAnimate(true)
    }, [])


    const handleSubmit = async () => {

        if (user?.id) {
            try {
                setIsUpdating(true)
                let userExists = true;
                try {
                    await axios.get("/api/user");
                } catch (err: any) {
                    if (err.response?.status === 404) {
                        userExists = false;
                    }
                }
                await axios.patch('/api/user', {
                    removeShippingAddress: true,
                    updatedAt: new Date().toISOString(),
                });

                toast.success("Shipping Address Updated");
            } catch (error) {
                console.log("ERROR UPDATING ADDRESS", error);
                toast.error("Failed to updateAddress");
            } finally {
                setIsUpdating(false)
            }
        } else {
            router.push(`/sign-in`);
        }

        setIsRemoveAddressModalOpen(false);
    };

    return (
        <div className={`fixed inset-0 z-50 bg-[#0000007c] transition-opacity duration-300 ease-in-out ${animate ? 'opacity-100' : 'opacity-0'}`}>
            <div
                className={`w-[30%]  fixed top-[35%] left-[35%] bg-white rounded-md shadow-md p-5 transform transition-all duration-300 ease-in-out ${animate ? 'scale-100 translate-z-0' : 'scale-95 translate-z-10'
                    }`}
            >

                <div className="w-full  bg-white mt-4 flex flex-col items-center justify-center">
                    <span>Are you sure you want to remove this address ?</span>
                    <div className="flex flex-row items-center justify-center gap-2 mt-5">
                        <button
                            onClick={() => setIsRemoveAddressModalOpen(false)}
                            className="bg-red-400 text-white font-bold text-[15px] p-3 w-[20vh] rounded-md cursor-pointer"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSubmit}
                            className="bg-green-400 text-white font-bold text-[15px] w-[20vh] p-3 rounded-md cursor-pointer"
                        >
                            {isUpdating ? "Removing..." : "Remove"}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default RemoveAddressModel
