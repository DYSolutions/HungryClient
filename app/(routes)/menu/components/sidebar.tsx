'use client'
import { Catagory, Size, Kitchen, Cuisine } from "@/types";
import axios from "axios";
import { useEffect, useState } from "react";

interface MenuSidebarProps {
    setSelectedCategory: (category: string) => void;
    setSelectedSize: (size: string) => void;
    setSelectedKitchen: (kitchen: string) => void;
    setSelectedCuisine: (cuisine: string) => void;
    setSearchValue: (searchValue: string) => void;
    searchValue: string;
}

const MenuSidebar = ({ setSelectedCategory, setSearchValue, setSelectedCuisine, setSelectedKitchen, setSelectedSize, searchValue }: MenuSidebarProps) => {

    const [catagories, setCatagories] = useState<Catagory[]>([])
    const [sizes, setSizes] = useState<Size[]>([])
    const [kitchens, setKitchens] = useState<Kitchen[]>([])
    const [cuisines, setCuisines] = useState<Cuisine[]>([])

    const [isCatagoriesLoading, setIsCatagoriesLoading] = useState<boolean>(false)
    const [isSizesLoading, setIsSizesLoading] = useState<boolean>(false)
    const [isKitchensLoading, setIsKitchensLoading] = useState<boolean>(false)
    const [isCuisinesLoading, setIsCuisinesLoading] = useState<boolean>(false)

    async function fetchCatagories() {
        try {
            setIsCatagoriesLoading(true)
            const res = await axios.get("/api/catagories")
            setCatagories(res.data)
        } catch (error) {
            console.log("ERROR CONNECTING API", error);
        } finally {
            setIsCatagoriesLoading(false)
        }
    }

    async function fetchSizes() {
        try {
            setIsSizesLoading(true)
            const res = await axios.get("/api/sizes")
            setSizes(res.data)
        } catch (error) {
            console.log("ERROR CONNECTING API", error);
        } finally {
            setIsSizesLoading(false)
        }
    }

    async function fetchCuisines() {
        try {
            setIsCuisinesLoading(true)
            const res = await axios.get("/api/cuisines")
            setCuisines(res.data)
        } catch (error) {
            console.log("ERROR CONNECTING API", error);
        } finally {
            setIsCuisinesLoading(false)
        }
    }

    async function fetchKitchens() {
        try {
            setIsKitchensLoading(true)
            const res = await axios.get("/api/kitchens")
            setKitchens(res.data)
        } catch (error) {
            console.log("ERROR CONNECTING API", error);
        } finally {
            setIsKitchensLoading(false)
        }
    }

    useEffect(() => {
        fetchCatagories()
        fetchSizes()
        fetchCuisines()
        fetchKitchens()
    }, [])

    return (
        <div className="flex flex-col w-[180px] text-black shadow-lg">

            <div className=" w-full h-auto">
                <div className="px-2 text-[13px] mt-4">
                    <input
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        type="text" placeholder="Search products..." className="w-full h-[30px] border-2 border-gray-300 rounded-lg px-2 text-[13px] focus:outline-none focus:border-green-400" />
                </div>
            </div>

            <div className=" w-full h-auto border-b-1 border-gray-100 min-h-[200px]">
                <ul className="space-y-2 p-4 text-[13px]">
                    <h3 className="font-bold text-[15px]">Category</h3>
                    {!isCatagoriesLoading ? (
                        <>
                            {catagories.map((catagory) => (
                                <li onClick={() => setSelectedCategory(catagory?.label)} key={catagory?.id} className="cursor-pointer hover:text-green-400">
                                    {catagory?.label}
                                </li>
                            ))}
                        </>
                    ) : (
                        <div className="w-full h-[200px] flex flex-col items-center justify-center">
                            <svg aria-hidden="true" role="status" className="inline w-5 h-5 me-3 text-green-400 animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                            </svg>
                        </div>
                    )}
                </ul>
            </div>

            <div className="  w-full h-auto border-b-1 border-gray-100 min-h-[200px]">
                <ul className="space-y-2 p-4 text-[13px] mt-4">
                    <h3 className="font-bold text-[15px]">Size</h3>
                    {!isSizesLoading ? (
                        <>
                            {sizes.map((size) => (
                                <li onClick={() => setSelectedSize(size?.value)} key={size?.id} className="cursor-pointer hover:text-green-400">
                                    {size?.name}
                                </li>
                            ))}
                        </>
                    ) : (
                        <div className="w-full h-[200px] flex flex-col items-center justify-center">
                            <svg aria-hidden="true" role="status" className="inline w-5 h-5 me-3 text-green-400 animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                            </svg>
                        </div>
                    )}
                </ul>
            </div>

            <div className=" w-full h-auto border-b-1 border-gray-100 min-h-[200px]">
                <ul className="space-y-2 p-4 text-[13px] mt-4">
                    <h3 className="font-bold text-[15px]">Kitchen</h3>
                    {!isKitchensLoading ? (
                        <>
                            {kitchens.map((kitchen) => (
                                <li onClick={() => setSelectedKitchen(kitchen?.value)} key={kitchen?.id} className="cursor-pointer hover:text-green-400">
                                    {kitchen?.value}
                                </li>
                            ))}
                        </>
                    ) : (
                        <div className="w-full h-[200px] flex flex-col items-center justify-center">
                            <svg aria-hidden="true" role="status" className="inline w-5 h-5 me-3 text-green-400 animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                            </svg>
                        </div>
                    )}
                </ul>
            </div>

            <div className="  w-full h-auto border-b-1 border-gray-100 min-h-[200px]">
                <ul className="space-y-2 p-4 text-[13px] mt-4">
                    <h3 className="font-bold text-[15px]">Cuisine</h3>
                    {!isCuisinesLoading ? (
                        <>
                            {cuisines.map((cuisine) => (
                                <li onClick={() => setSelectedCuisine(cuisine?.value)} key={cuisine?.id} className="cursor-pointer hover:text-green-400">
                                    {cuisine?.value}
                                </li>
                            ))}
                        </>
                    ) : (
                        <div className="w-full h-[200px] flex flex-col items-center justify-center">
                            <svg aria-hidden="true" role="status" className="inline w-5 h-5 me-3 text-green-400 animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB" />
                                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor" />
                            </svg>
                        </div>
                    )}
                </ul>
            </div>
        </div>
    );
}

export default MenuSidebar;