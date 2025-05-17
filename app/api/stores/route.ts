import { db } from "@/lib/firebase";
import { Store } from "@/types";
import { collection, getDocs } from "firebase/firestore"
import { NextResponse } from "next/server";



export const GET = async (res: Request) => {
    try {
        const Stores: Store[] = []
        const storeSnab = await getDocs(collection(db, "stores"));
        storeSnab.forEach((doc) => {
            Stores.push(doc.data() as Store)
        })

        return NextResponse.json(Stores)

    } catch (error) {
        console.log("ERROR FETCH STORES FROM DATABASE", error);

    }
}