import { Address, Order, User } from "@/types";
import { useUser } from "@clerk/nextjs";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { set } from "react-hook-form";
import toast from "react-hot-toast";
import { ImCross } from "react-icons/im";

interface CancelOrderConfirmationModellProps {
  setIsCancelOrderModalOpen: (value: boolean) => void;
  OrderId: string;
  orderData?: Order[];
  fetchUser: () => void;
  setIsViewOrderModalOpen?: (value: boolean) => void;
}

const CancelOrderConfirmationModel = ({
  setIsCancelOrderModalOpen,
  OrderId,
  orderData,
  fetchUser,
  setIsViewOrderModalOpen,
}: CancelOrderConfirmationModellProps) => {
  const [animate, setAnimate] = useState(false);
  const { user } = useUser();
  const router = useRouter();

  const [isUpdating, setIsUpdating] = useState(false);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const handleCancelOrder = async () => {
    try {
      setIsUpdating(true);
      await axios.patch("/api/orders", {
        id: OrderId,
        status: {
          name: "CANCELED",
          color: "bg-red-500",
        },
        updatedAt: new Date().toISOString(),
      });
      toast.success("Order canceled");
    } catch (error) {
      console.log("ERROR CONNECTING API", error);
      toast.error("Failed to cancel order");
    } finally {
      if (setIsViewOrderModalOpen) setIsViewOrderModalOpen(false);
      fetchUser();
      setIsUpdating(false);
    }
    setIsCancelOrderModalOpen(false);
  };

  return (
    <div
      className={`fixed inset-0 z-50 bg-[#0000007c] transition-opacity duration-300 ease-in-out ${
        animate ? "opacity-100" : "opacity-0"
      }`}
    >
      <div
        className={`w-[30%]  fixed top-[35%] left-[35%] bg-white rounded-md shadow-md p-5 transform transition-all duration-300 ease-in-out ${
          animate ? "scale-100 translate-z-0" : "scale-95 translate-z-10"
        }`}
      >
        <div className="w-full  bg-white mt-4 flex flex-col items-center justify-center">
          <span>Are you sure you want to cancel this order ?</span>
          <div className="flex flex-row items-center justify-center gap-2 mt-5">
            <button
              onClick={() => setIsCancelOrderModalOpen(false)}
              className="bg-red-400 hover:bg-red-500 text-white font-bold text-[15px] p-3 w-[20vh] rounded-md cursor-pointer"
            >
              No
            </button>
            <button
              onClick={handleCancelOrder}
              className="bg-green-400 hover:bg-green-500 text-white font-bold text-[15px] w-[20vh] p-3 rounded-md cursor-pointer"
            >
              {isUpdating ? "Canceling..." : "Yes"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CancelOrderConfirmationModel;
