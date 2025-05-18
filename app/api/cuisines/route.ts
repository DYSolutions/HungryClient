import { db } from "@/lib/firebase";
import { Cuisine } from "@/types";
import { getDocs, collection } from "firebase/firestore";
import { NextResponse } from "next/server";


export const GET = async (res: Request) => {
    try {
        const cuisines: Cuisine[] = [];
        const cuisinesSnap = await getDocs(collection(db, "stores/R01psvnwELnzlzaCsgpT/cuisines"));
        cuisinesSnap.forEach((doc) => {
            cuisines.push(doc.data() as Cuisine)
        })
        return NextResponse.json(cuisines);
    } catch (error) {
        console.log("ERROR FETCH CUISINES FROM DATABASE", error);

    }
}