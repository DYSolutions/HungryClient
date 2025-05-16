import { UserButton } from "@clerk/nextjs";
import MainNav from "./main-nav";
import { auth } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { FaCartShopping } from "react-icons/fa6";
import Link from "next/link";

const Navbar = async () => {

    const { userId } = await auth()

    if (!userId) {
        redirect("/sign-in")
    }


    return (
        <div className=" h-16 flex items-center flex-row justify-between px-4">
            <Link className="font-bold text-green-400 cursor-pointer" href={"/"}>HUNGRY</Link>

            <div className="flex flex-row items-center space-x-4 lg:space-x-6 pl-6">
                {/* routes */}
                <MainNav />

                {/* usericon */}
                <div className="ml-auto"><UserButton /></div>
                <Link
                    className="h-6 w-10 rounded-4xl bg-black text-white flex flex-row items-center justify-center space-x-2 cursor-pointer"
                    href={"/cart"}
                >
                    <FaCartShopping className="h-3 w-3" />
                    <span className="text-[10px]">0</span>
                </Link>
            </div>
        </div>
    );
}

export default Navbar;