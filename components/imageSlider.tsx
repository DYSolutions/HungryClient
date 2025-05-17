'use client'
import { useEffect, useState } from "react";
import Image from "next/image";
import { IoCaretBack, IoCaretForwardOutline } from "react-icons/io5";

interface ImageSliderProps {
    images: { url: string }[]
}

const ImageSlider = ({ images }: ImageSliderProps) => {


    const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
    const [selectedImage, setSelectedImage] = useState<string>(images[0]?.url || "");
    const ItemPeSlice = 3

    const handleNext = () => {
        if (currentImageIndex + ItemPeSlice < images.length) {
            setCurrentImageIndex(currentImageIndex + 3);
        }
    };

    const handlePrev = () => {
        if (currentImageIndex - ItemPeSlice >= 0) {
            setCurrentImageIndex(currentImageIndex - 3);
        }
    };

    const slicedImages = images?.slice(currentImageIndex, currentImageIndex + ItemPeSlice);
    const featureImages: boolean = currentImageIndex + ItemPeSlice < images.length
    const pastImages: boolean = currentImageIndex - ItemPeSlice >= 0

    return (
        <div >
            <Image src={selectedImage} alt="Product Image" width={400} height={400} className="rounded-lg transition-all duration-100 ease-in-out" />
            <div className="flex flex-row items-center justify-center gap-2 mt-4  w-[400px]">
                <IoCaretBack className={`${pastImages ? "text-green-500" : "text-gray-500"} h-5 w-5 cursor-pointer`} onClick={handlePrev} />
                <div className="flex flex-row items-center justify-start gap-2  w-[315px]">
                    {slicedImages.map((image, index) => (
                        <Image key={index} src={image.url} onClick={() => setSelectedImage(image.url)} alt="Product Image" width={100} height={100}
                            className={`rounded-lg transition-all duration-100 ease-in-out ${selectedImage === image.url ? "border-4 border-green-500" : ""}`} />
                    ))}
                </div>
                <IoCaretForwardOutline className={`${featureImages ? "text-green-500" : "text-gray-500"} h-5 w-5 cursor-pointer`} onClick={handleNext} />
            </div>
        </div>
    );
}

export default ImageSlider