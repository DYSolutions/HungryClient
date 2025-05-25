import { Address, User } from "@/types"
import { useUser } from "@clerk/nextjs"
import axios from "axios"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { set } from "react-hook-form"
import toast from "react-hot-toast"
import { ImCross } from "react-icons/im"

interface AddressModelProps {
    setIsAddressModalOpen: (value: boolean) => void
    userData?: User
}

const AddressModel = ({ setIsAddressModalOpen, userData }: AddressModelProps) => {
    const [animate, setAnimate] = useState(false)
    const { user } = useUser()
    const router = useRouter()

    const [isUpdating, setIsUpdating] = useState(false)

    const [formData, setFormData] = useState<Address>({
        shippingAddress: userData?.shippingAddress?.shippingAddress || "",
        shippingCity: userData?.shippingAddress?.shippingCity || "",
        shippingCode: userData?.shippingAddress?.shippingCode || "",
        shippingCountry: userData?.shippingAddress?.shippingCountry || "",
        shippingPhone: userData?.shippingAddress?.shippingPhone || "",
        shippingName: userData?.shippingAddress?.shippingName || "",
        shippingEmail: userData?.shippingAddress?.shippingEmail || "",
    })


    useEffect(() => {
        setAnimate(true)
    }, [])


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()


        if (
            formData.shippingAddress.trim() === '' ||
            formData.shippingCity.trim() === "" ||
            formData.shippingCode.trim() === "" ||
            formData.shippingCountry.trim() === "" ||
            formData.shippingEmail.trim() === "" ||
            formData.shippingName.trim() === "" ||
            formData.shippingPhone.trim() === ""
        ) {
            toast.error("All fields are required.");
            return;
        }


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

                if (!userExists) {
                    await axios.post('/api/user', {
                        clerkUserId: user.id,
                        userName: user.fullName,
                        userEmail: user.emailAddresses[0].emailAddress,
                        isAdmin: false,
                        isActive: true,
                        soldProducts: [],
                        shippingAddress: formData,
                        createdAt: new Date().toISOString(),
                    });

                    toast.success("Shipping Address Updated");
                }
                else {
                    const user = await axios.get("/api/user");
                    await axios.patch('/api/user', {
                        shippingAddress: formData,
                        updatedAt: new Date().toISOString(),
                    });
                }
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

        setIsAddressModalOpen(false);
    };

    return (
        <div className={`fixed inset-0 z-50 bg-[#0000007c] transition-opacity duration-300 ease-in-out ${animate ? 'opacity-100' : 'opacity-0'}`}>
            <div
                className={`w-[50%] min-h-[50%] fixed top-[20%] left-[25%] bg-white rounded-md shadow-md p-5 transform transition-all duration-300 ease-in-out ${animate ? 'scale-100 translate-z-0' : 'scale-95 translate-z-10'
                    }`}
            >
                <div className="flex flex-row items-center justify-between bg-gray-100 absolute top-0 left-0 w-full p-2 py-3 rounded-t-md">
                    <h3 className="text-black font-semibold tracking-wide pl-4">Address</h3>
                    <button
                        onClick={() => setIsAddressModalOpen(false)}
                        className="bg-red-400 hover:bg-red-500 text-white font-bold text-[15px] p-3 rounded-md cursor-pointer"
                    >
                        <ImCross />
                    </button>
                </div>

                <div className="w-full p-5 bg-white mt-16">
                    <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-2 gap-10">
                            <input
                                type="text"
                                placeholder="Name"
                                value={formData.shippingName}
                                onChange={(e) => setFormData({ ...formData, shippingName: e.target.value })}
                                className="mb-2 border-b outline-none text-sm"
                            />

                            <input
                                type="text"
                                placeholder="Email"
                                value={formData.shippingEmail}
                                onChange={(e) => setFormData({ ...formData, shippingEmail: e.target.value })}
                                className="mb-2 border-b outline-none text-sm"
                            />

                            <input
                                type="text"
                                placeholder="Address"
                                value={formData.shippingAddress}
                                onChange={(e) => setFormData({ ...formData, shippingAddress: e.target.value })}
                                className="mb-2 border-b outline-none text-sm"
                            />

                            <input
                                type="text"
                                placeholder="City"
                                value={formData.shippingCity}
                                onChange={(e) => setFormData({ ...formData, shippingCity: e.target.value })}
                                className="mb-2 border-b outline-none text-sm"
                            />

                            <input
                                type="text"
                                placeholder="Zip Code"
                                value={formData.shippingCode}
                                onChange={(e) => setFormData({ ...formData, shippingCode: e.target.value })}
                                className="mb-2 border-b outline-none text-sm"
                            />

                            <input
                                type="text"
                                placeholder="Country"
                                value={formData.shippingCountry}
                                onChange={(e) => setFormData({ ...formData, shippingCountry: e.target.value })}
                                className="mb-2 border-b outline-none text-sm"
                            />

                            <input
                                type="text"
                                placeholder="Phone Number"
                                value={formData.shippingPhone}
                                onChange={(e) => setFormData({ ...formData, shippingPhone: e.target.value })}
                                className="mb-2 border-b outline-none text-sm"
                            />

                        </div>
                        <div className="w-full flex flex-row items-center justify-center mt-4">
                            <button
                                type="submit" className="bg-green-400 hover:bg-green-500 w-[30vh] text-white font-semibold text-[15px] p-3 rounded-md cursor-pointer">{isUpdating ? "Updating..." : "save"}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AddressModel
