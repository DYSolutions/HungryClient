'use client'
import { HomeIcon } from "lucide-react";
import MenuSidebar from "./components/sidebar";
import Link from "next/link";
import ProductCart from "@/components/productCart";
import { RxCross2 } from "react-icons/rx";
import { useEffect, useState } from "react";
import { Product } from "@/types";
import axios from "axios";
import { useLoader } from "@/contacts/loaderContact";
import Loader from "@/components/loader";
import Processing from "@/components/processing";

const MenuPage = () => {

    const { isLoading, setIsLoading } = useLoader();
    const [selectedSize, setSelectedSize] = useState<string>();
    const [selectedKitchen, setSelectedKitchen] = useState<string>();
    const [selectedCuisine, setSelectedCuisine] = useState<string>();
    const [selectedCategory, setSelectedCategory] = useState<string>();
    const [searchValue, setSearchValue] = useState<string>();
    const [adding, setAdding] = useState<boolean>(false);

    const [products, setProducts] = useState<Product[]>([]);
    const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

    async function fetchProducts() {
        try {
            setIsLoading(true)
            const res = await axios.get("/api/products")
            setProducts(res.data)
        } catch (error) {
            console.log("ERROR CONNECTING API", error);
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    useEffect(() => {
        let tempProducts = [...products];

        if (selectedSize) {
            tempProducts = tempProducts.filter((product) => product.size === selectedSize);
        }
        if (selectedKitchen) {
            tempProducts = tempProducts.filter((product) => product.kitchen === selectedKitchen);
        }
        if (selectedCuisine) {
            tempProducts = tempProducts.filter((product) => product.cuisine === selectedCuisine);
        }
        if (selectedCategory) {
            tempProducts = tempProducts.filter((product) => product.category === selectedCategory);
        }
        if (searchValue) {
            tempProducts = tempProducts.filter((product) =>
                product.name?.toLowerCase().includes(searchValue.toLowerCase())
            );
        }
        setFilteredProducts(tempProducts);
    }, [selectedCategory, selectedCuisine, selectedKitchen, selectedSize, searchValue, products]);

    if (isLoading) return <Loader />

    return (
        <div className="flex flex-row w-full min-h-[100vh]">
            <MenuSidebar
                setSelectedSize={setSelectedSize}
                setSelectedKitchen={setSelectedKitchen}
                setSelectedCuisine={setSelectedCuisine}
                setSelectedCategory={setSelectedCategory}
                setSearchValue={setSearchValue}
                searchValue={searchValue ?? ""}
            />

            {adding && <Processing />}

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
                    {filteredProducts.map((product) => (
                        <ProductCart key={product?.id} product={product} setAdding={setAdding} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default MenuPage;