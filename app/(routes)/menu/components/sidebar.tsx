
interface MenuSidebarProps {
    setSelectedCategory: (category: string) => void;
    setSelectedSize: (size: string) => void;
    setSelectedKitchen: (kitchen: string) => void;
    setSelectedCuisine: (cuisine: string) => void;
    setSearchValue: (searchValue: string) => void;
    searchValue: string;
}

const MenuSidebar = ({ setSelectedCategory, setSearchValue, setSelectedCuisine, setSelectedKitchen, setSelectedSize, searchValue }: MenuSidebarProps) => {
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

            <div className=" w-full h-auto border-b-1 border-gray-100 ">
                <ul className="space-y-2 p-4 text-[13px]">
                    <h3 className="font-bold text-[15px]">Category</h3>
                    <li onClick={() => setSelectedCategory("Pizza")} className="cursor-pointer hover:text-green-400">
                        Pizza
                    </li>
                    <li onClick={() => setSelectedCategory("Biriyani")} className="cursor-pointer hover:text-green-400">
                        Biriyani
                    </li>
                    <li onClick={() => setSelectedCategory("Fruits")} className="cursor-pointer hover:text-green-400">
                        Fruits
                    </li>
                    <li onClick={() => setSelectedCategory("Drinks")} className="cursor-pointer hover:text-green-400">
                        Drinks
                    </li>
                </ul>
            </div>

            <div className="  w-full h-auto border-b-1 border-gray-100 ">
                <ul className="space-y-2 p-4 text-[13px] mt-4">
                    <h3 className="font-bold text-[15px]">Size</h3>
                    <li onClick={() => setSelectedSize("Small")} className="cursor-pointer hover:text-green-400">
                        Small
                    </li>
                    <li onClick={() => setSelectedSize("Medium")} className="cursor-pointer hover:text-green-400">
                        Medium
                    </li>
                    <li onClick={() => setSelectedSize("Large")} className="cursor-pointer hover:text-green-400">
                        Large
                    </li>
                    <li onClick={() => setSelectedSize("Extra Large")} className="cursor-pointer hover:text-green-400">
                        Extra Large
                    </li>
                </ul>
            </div>

            <div className=" w-full h-auto border-b-1 border-gray-100">
                <ul className="space-y-2 p-4 text-[13px] mt-4">
                    <h3 className="font-bold text-[15px]">Kitchen</h3>
                    <li onClick={() => setSelectedKitchen("Italian")} className="cursor-pointer hover:text-green-400">
                        Italian
                    </li>
                    <li onClick={() => setSelectedKitchen("Indian")} className="cursor-pointer hover:text-green-400">
                        Indian
                    </li>
                    <li onClick={() => setSelectedKitchen("Chinese")} className="cursor-pointer hover:text-green-400">
                        Chinese
                    </li>
                    <li onClick={() => setSelectedKitchen("Mexican")} className="cursor-pointer hover:text-green-400">
                        Mexican
                    </li>
                </ul>
            </div>

            <div className="  w-full h-auto border-b-1 border-gray-100">
                <ul className="space-y-2 p-4 text-[13px] mt-4">
                    <h3 className="font-bold text-[15px]">Cuisine</h3>
                    <li onClick={() => setSelectedCuisine("Italian")} className="cursor-pointer hover:text-green-400">
                        Italian
                    </li>
                    <li onClick={() => setSelectedCuisine("Indian")} className="cursor-pointer hover:text-green-400">
                        Indian
                    </li>
                    <li onClick={() => setSelectedCuisine("Chinese")} className="cursor-pointer hover:text-green-400">
                        Chinese
                    </li>
                    <li onClick={() => setSelectedCuisine("Mexican")} className="cursor-pointer hover:text-green-400">
                        Mexican
                    </li>
                </ul>
            </div>
        </div>
    );
}

export default MenuSidebar;