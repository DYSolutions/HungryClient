import { db } from "@/lib/firebase";
import { Kitchen } from "@/types";
import { getDocs, collection } from "firebase/firestore";
import { NextResponse } from "next/server";


export const GET = async (res: Request) => {
    try {
        const kitchens: Kitchen[] = [];
        const kitchenSnap = await getDocs(collection(db, "stores/R01psvnwELnzlzaCsgpT/kitchens"));
        kitchenSnap.forEach((doc) => {
            kitchens.push(doc.data() as Kitchen)
        })
        return NextResponse.json(kitchens);
    } catch (error) {
        console.log("ERROR FETCH KITCHENS FROM DATABASE", error);

    }
}