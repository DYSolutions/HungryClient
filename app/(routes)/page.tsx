'use client'
import ProductCart from "@/components/productCart";
import Image from "next/image";
import { IoFastFood } from "react-icons/io5";
import { MdHighQuality } from "react-icons/md";
import { TbTruckDelivery } from "react-icons/tb";
import axios from "axios";
import { Product } from "@/types";
import { useEffect, useState } from "react";
import { useLoader } from "@/contacts/loaderContact"
import Loader from "@/components/loader";
import Processing from "@/components/processing";

const HomePage = () => {

  const { isLoading, setIsLoading } = useLoader();
  const [products, setProducts] = useState<Product[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [adding, setAdding] = useState(false)

  async function fetchProducts() {
    try {
      setIsLoading(true)
      const res = await axios.get("/api/products")
      setProducts(res.data)
      const filteredProducts = res.data.filter((product: Product) => product.isFeatured === true);
      setFeaturedProducts(filteredProducts);
    } catch (error) {
      console.log("ERROR CONNECTING API", error);
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  if (isLoading) return <Loader />;

  return (
    <div>
      {/* hero */}

      {adding && <Processing />}
      <div className="w-full h-auto flex flex-row justify-between">
        <div className="text-center w-full flex flex-col justify-center items-center bg-green-400 rounded-2xl shadow-lg p-10">
          <h1 className="text-4xl font-bold text-center text-white mb-4">
            JUST COME TO HUNGRY <br />& ORDER
          </h1>
          <button className="bg-white text-green-400 font-bold py-2 px-4 rounded-full hover:bg-green-500 hover:text-white transition duration-300 cursor-pointer">
            Order Now
          </button>
          <p className="text-white text-center mt-4">
            Experience the best food delivery service in town.
            <br />
            Order your favorite meals with just a few clicks!
          </p>
        </div>
        <Image src="/main.png" alt="Hero Image" width={620} height={620} className="h-auto" />
      </div>

      {/* products */}
      <div className="grid grid-cols-6 p-4 mt-10 gap-4">
        {featuredProducts.map((product) => (
          <ProductCart key={product.id} product={product} setAdding={setAdding} />
        ))}
      </div>

      {/* why choose us */}
      <div className="w-full h-auto flex flex-col justify-center items-center p-10 mt-10">
        <h1 className="text-4xl font-bold text-center text-black mb-4">
          Why Choose Us?
        </h1>
        <p className="text-black text-center mt-4 w-[800px]">
          We offer a wide variety of cuisines, fast delivery, and excellent customer service.
          You can see the available snippets
          for a language by running the Insert Snippet command in the
        </p>

        <div className="flex flex-row justify-center items-center gap-8 mt-4 w-full">
          <div className="h-[170px] w-[300px] shadow-2xl rounded-lg flex flex-col justify-center items-center text-white p-4 mt-4 transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
            <IoFastFood className="text-green-400" />
            <h3 className="text-black font-semibold">Serve Health Food</h3>
            <p className="text-black text-[13px] text-center">You can see the available snippets
              for a language by running the Insert Snippet command in the</p>
          </div>

          <div className="h-[170px] w-[300px] shadow-2xl rounded-lg flex flex-col justify-center items-center text-white p-4 mt-4 transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
            <MdHighQuality className="text-green-400" />
            <h3 className="text-black font-semibold">Best Quality</h3>
            <p className="text-black text-[13px] text-center">You can see the available snippets
              for a language by running the Insert Snippet command in the</p>
          </div>

          <div className="h-[170px] w-[300px] shadow-2xl rounded-lg flex flex-col justify-center items-center text-white p-4 mt-4 transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-2xl">
            <TbTruckDelivery className="text-green-400" />
            <h3 className="text-black font-semibold">Fast Delivery</h3>
            <p className="text-black text-[13px] text-center">You can see the available snippets
              for a language by running the Insert Snippet command in the</p>
          </div>
        </div>
      </div>

      {/* our special chefs */}
      <div className="w-full h-auto flex flex-col justify-center items-center p-10 mt-10">
        <h1 className="text-4xl font-bold text-center text-black mb-4">
          Our Special Chefs
        </h1>
        <p className="text-black text-center mt-4 w-[800px]">
          We offer a wide variety of cuisines, fast delivery, and excellent customer service.
          You can see the available snippets
          for a language by running the Insert Snippet command in the
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-8 mt-4 w-full justify-center items-center">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9].map((index) => (
            <div
              key={index}
              className="group cursor-pointer h-[250px] w-[200px] bg-white rounded-xl shadow-xl p-4 flex flex-col justify-center items-center transform transition duration-300 ease-in-out hover:scale-105 hover:shadow-2xl"
            >
              <Image
                src="/chef1.webp"
                alt="Chef Image"
                width={100}
                height={100}
                className="rounded-full border-4 border-green-400 transition duration-300 group-hover:scale-110"
              />
              <h3 className="text-black font-semibold mt-2 text-lg transition-all duration-300 group-hover:text-green-600">
                Chef Name
              </h3>
              <p className="text-black text-[13px] text-center mt-2 transition-opacity duration-300 opacity-80 group-hover:opacity-100">
                You can see the available snippets for a language by running the Insert Snippet command in the
              </p>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default HomePage;