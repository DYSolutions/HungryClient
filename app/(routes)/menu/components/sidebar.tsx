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

    async function fetchCatagories() {
        try {
            const res = await axios.get("/api/catagories")
            setCatagories(res.data)
        } catch (error) {
            console.log("ERROR CONNECTING API", error);

        }
    }

    async function fetchSizes() {
        try {
            const res = await axios.get("/api/sizes")
            setSizes(res.data)
        } catch (error) {
            console.log("ERROR CONNECTING API", error);

        }
    }

    async function fetchCuisines() {
        try {
            const res = await axios.get("/api/cuisines")
            setCuisines(res.data)
        } catch (error) {
            console.log("ERROR CONNECTING API", error);

        }
    }

    async function fetchKitchens() {
        try {
            const res = await axios.get("/api/kitchens")
            setKitchens(res.data)
        } catch (error) {
            console.log("ERROR CONNECTING API", error);
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
                    {catagories.map((catagory) => (
                        <li onClick={() => setSelectedCategory(catagory?.label)} key={catagory?.id} className="cursor-pointer hover:text-green-400">
                            {catagory?.label}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="  w-full h-auto border-b-1 border-gray-100 min-h-[200px]">
                <ul className="space-y-2 p-4 text-[13px] mt-4">
                    <h3 className="font-bold text-[15px]">Size</h3>
                    {sizes.map((size) => (
                        <li onClick={() => setSelectedSize(size?.value)} key={size?.id} className="cursor-pointer hover:text-green-400">
                            {size?.name}
                        </li>
                    ))}
                </ul>
            </div>

            <div className=" w-full h-auto border-b-1 border-gray-100 min-h-[200px]">
                <ul className="space-y-2 p-4 text-[13px] mt-4">
                    <h3 className="font-bold text-[15px]">Kitchen</h3>
                    {kitchens.map((kitchen) => (
                        <li onClick={() => setSelectedKitchen(kitchen?.value)} key={kitchen?.id} className="cursor-pointer hover:text-green-400">
                            {kitchen?.value}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="  w-full h-auto border-b-1 border-gray-100 min-h-[200px]">
                <ul className="space-y-2 p-4 text-[13px] mt-4">
                    <h3 className="font-bold text-[15px]">Cuisine</h3>
                    {cuisines.map((cuisine) => (
                        <li onClick={() => setSelectedCuisine(cuisine?.value)} key={cuisine?.id} className="cursor-pointer hover:text-green-400">
                            {cuisine?.value}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default MenuSidebar;