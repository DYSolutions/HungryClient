'use client'
import { useAppSelector } from "@/redux/hooks";
import { Product } from "@/types";
import React, { useState } from "react";
import { FaShoppingCart } from "react-icons/fa";


type CardForm = {
    name: string;
    number: string;
    expiry: string;
    cvv: string;
};

const Page = () => {

    const products: Product[] = useAppSelector((state) => state.productSlice.products);

    const [form, setForm] = useState<CardForm>({
        name: "",
        number: "",
        expiry: "",
        cvv: "",
    });

    const [errors, setErrors] = useState<Partial<CardForm>>({});

    const validate = () => {
        const errs: Partial<CardForm> = {};
        if (!form.name.trim()) errs.name = "Cardholder name is required.";
        if (!/^\d{16}$/.test(form.number)) errs.number = "Card number must be 16 digits.";
        if (!/^\d{2}\/\d{2}$/.test(form.expiry)) errs.expiry = "Expiry must be in MM/YY format.";
        if (!/^\d{3,4}$/.test(form.cvv)) errs.cvv = "CVV must be 3 or 4 digits.";
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handlePay = () => {
        if (!validate()) return;
        alert("Payment processed successfully!");
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
        setErrors((prev) => ({ ...prev, [name]: "" }));
    };

    const total = products.reduce((acc, product) => acc + Number(product.price) * Number(product.serves || 1), 0);

    return (
        <div className="w-full min-h-[80vh] p-10 flex flex-row items-center justify-center gap-10">
            <div className="flex flex-col items-center justify-between h-[50vh] gap-2">
                <div className="w-[400px] h-full max-w-md mx-auto mt-10 p-6  ">
                    <div className="w-full h-[30vh] flex flex-col justyfy-start items-center gap-2 overflow-auto">
                        {products.map((product) => (
                            <div key={product.id} className="w-full h-[10vh] flex flex-row justify-between items-center">
                                <div className="w-[10vh] h-[10vh] rounded-md ">
                                    <img
                                        src={product.images[0].url}
                                        alt={product.name}
                                        className="w-full h-full object-cover rounded-md"
                                    />
                                </div>
                                <div className="w-[15vh] h-[10vh] flex flex-col justify-end items-start gap-2 font-semibold text-sm pl-6 pb-4 ">
                                    <span>{product.name}</span>
                                    <span>{product.serves || "1"} * {product.price} LKR</span>
                                </div>
                                <div className="w-[10vh] h-[10vh] flex flex-col justify-end items-center font-semibold text-sm pb-4 ">{Number(product.serves || 1) * Number(product.price)} LKR</div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="w-[80%] h-[12vh] border-t-1 boreder-gray-300 flex flex-row justify-end font-semibold items-center">
                    <span>Total: {total} LKR</span>
                </div>
            </div>

            <div className="w-[1px] h-[30vh] bg-gray-200"></div>

            <div className="flex flex-col items-center justify-center">
                <div className="max-w-md mx-auto mt-10 p-6 border rounded-2xl shadow-md bg-white">
                    <div className="flex items-center justify-center mb-6 gap-2 text-xl font-bold">
                        <FaShoppingCart className="text-green-600 text-2xl" />
                        <h2>Pay with Card</h2>
                    </div>

                    <div className="mb-4">
                        <label className="block mb-1 font-medium">Cardholder Name</label>
                        <input
                            type="text"
                            name="name"
                            value={form.name}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                        />
                        {errors.name && <p className="text-red-500 text-sm">{errors.name}</p>}
                    </div>

                    <div className="mb-4">
                        <label className="block mb-1 font-medium">Card Number</label>
                        <input
                            type="text"
                            name="number"
                            maxLength={16}
                            value={form.number}
                            onChange={handleChange}
                            className="w-full border px-3 py-2 rounded"
                        />
                        {errors.number && <p className="text-red-500 text-sm">{errors.number}</p>}
                    </div>

                    <div className="flex gap-4 mb-4">
                        <div className="w-1/2">
                            <label className="block mb-1 font-medium">Expiry (MM/YY)</label>
                            <input
                                type="text"
                                name="expiry"
                                placeholder="MM/YY"
                                value={form.expiry}
                                onChange={handleChange}
                                className="w-full border px-3 py-2 rounded"
                            />
                            {errors.expiry && <p className="text-red-500 text-sm">{errors.expiry}</p>}
                        </div>

                        <div className="w-1/2">
                            <label className="block mb-1 font-medium">CVV</label>
                            <input
                                type="password"
                                name="cvv"
                                maxLength={4}
                                value={form.cvv}
                                onChange={handleChange}
                                className="w-full border px-3 py-2 rounded"
                            />
                            {errors.cvv && <p className="text-red-500 text-sm">{errors.cvv}</p>}
                        </div>
                    </div>

                    <button
                        onClick={handlePay}
                        className="w-full flex justify-center items-center gap-2 bg-green-600 text-white py-2 rounded hover:bg-green-700"
                    >
                        <FaShoppingCart className="text-white" />
                        Pay Now {total} LKR
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Page


