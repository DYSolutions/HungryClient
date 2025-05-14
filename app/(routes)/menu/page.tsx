'use client'
import { HomeIcon } from "lucide-react";
import MenuSidebar from "./components/sidebar";
import Link from "next/link";
import ProductCart from "@/components/productCart";
import { RxCross2 } from "react-icons/rx";
import { useState } from "react";

const MenuPage = () => {

    const [selectedSize, setSelectedSize] = useState<string>();
    const [selectedKitchen, setSelectedKitchen] = useState<string>();
    const [selectedCuisine, setSelectedCuisine] = useState<string>();
    const [selectedCategory, setSelectedCategory] = useState<string>();
    const [searchValue, setSearchValue] = useState<string>();

    return (
        <div className="flex flex-row w-full h-auto">
            <MenuSidebar
                setSelectedSize={setSelectedSize}
                setSelectedKitchen={setSelectedKitchen}
                setSelectedCuisine={setSelectedCuisine}
                setSelectedCategory={setSelectedCategory}
                setSearchValue={setSearchValue}
                searchValue={searchValue ?? ""}
            />


            <div className=" w-full">
                <div className="flex flex-row items-center justify-start gap-2 p-4 text-gray-600">
                    <HomeIcon className="h-5 w-5" />
                    <Link href="/" className="hover:text-green-400">Main menu </Link>
                    <span>{">"}</span>
                    <Link href="/menu" className="hover:text-green-400">Products</Link>
                </div>

                <div className="flex flex-row items-center justify-start w-full h-[50px] gap-2 p-4 text-gray-600">
                    <div className="flex flex-row justify-between text-center gap-2 text-[12px] font-semibold">
                        {searchValue && (
                            <span className="bg-green-200 flex flex-row justify-center items-center px-1 rounded-[3px]">
                                {searchValue}
                                <RxCross2
                                    className="ml-1 hover:text-black cursor-pointer"
                                    onClick={() => setSearchValue("")}
                                />
                            </span>
                        )}

                        {selectedCategory && (
                            <span className="bg-pink-200 flex flex-row justify-center items-center px-1 rounded-[3px]">
                                {selectedCategory}
                                <RxCross2
                                    className="ml-1 hover:text-black cursor-pointer"
                                    onClick={() => setSelectedCategory("")}
                                />
                            </span>
                        )}

                        {selectedSize && (
                            <span className="bg-yellow-200 flex flex-row justify-center items-center px-1 rounded-[3px]">
                                {selectedSize}
                                <RxCross2
                                    className="ml-1 hover:text-black cursor-pointer"
                                    onClick={() => setSelectedSize("")}
                                />
                            </span>
                        )}

                        {selectedKitchen && (
                            <span className="bg-red-300 flex flex-row justify-center items-center px-1 rounded-[3px]">
                                {selectedKitchen}
                                <RxCross2
                                    className="ml-1 hover:text-black cursor-pointer"
                                    onClick={() => setSelectedKitchen("")}
                                />
                            </span>
                        )}

                        {selectedCuisine && (
                            <span className="bg-blue-300 flex flex-row justify-center items-center px-1 rounded-[3px]">
                                {selectedCuisine}
                                <RxCross2
                                    className="ml-1 hover:text-black cursor-pointer"
                                    onClick={() => setSelectedCuisine("")}
                                />
                            </span>
                        )}
                    </div>
                </div>

                <div className="w-full p-4 grid grid-cols-5 gap-4">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20].map((item) => (
                        <div key={item} >
                            <ProductCart />
                        </div>
                    ))}
                </div>

            </div>
        </div>
    )
}

export default MenuPage;