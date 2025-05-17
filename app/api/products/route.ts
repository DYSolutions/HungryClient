import { db } from "@/lib/firebase";
import { Product } from "@/types";
import { collection, getDocs } from "firebase/firestore";
import { NextResponse } from "next/server";

export const GET = async (res: Request) => {
    try {
        const products: Product[] = [];
        const productsSnap = await getDocs(collection(db, "stores/R01psvnwELnzlzaCsgpT/products"));
        productsSnap.forEach((doc) => {
            products.push(doc.data() as Product)
        })
        return NextResponse.json(products);
    } catch (error) {
        console.log("ERROR FETCH PRODUCTS FROM DATABASE", error);
    }
}