import { db } from "@/lib/firebase";
import { Catagory } from "@/types";
import { getDocs, collection } from "firebase/firestore";
import { NextResponse } from "next/server";


export const GET = async (res: Request) => {
    try {
        const catagories: Catagory[] = [];
        const catagorySnap = await getDocs(collection(db, "stores/R01psvnwELnzlzaCsgpT/catagories"));
        catagorySnap.forEach((doc) => {
            catagories.push(doc.data() as Catagory)
        })
        return NextResponse.json(catagories);
    } catch (error) {
        console.log("ERROR FETCH CATAGORIES FROM DATABASE", error);

    }
}