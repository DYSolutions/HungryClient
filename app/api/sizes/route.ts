import { db } from "@/lib/firebase";
import { Size } from "@/types";
import { getDocs, collection } from "firebase/firestore";
import { NextResponse } from "next/server";


export const GET = async (res: Request) => {
    try {
        const sizes: Size[] = [];
        const sizeSnap = await getDocs(collection(db, "stores/R01psvnwELnzlzaCsgpT/sizes"));
        sizeSnap.forEach((doc) => {
            sizes.push(doc.data() as Size)
        })
        return NextResponse.json(sizes);
    } catch (error) {
        console.log("ERROR FETCH SIZES FROM DATABASE", error);

    }
}