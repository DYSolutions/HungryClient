import { db } from "@/lib/firebase"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import { addDoc, collection, deleteField, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore"
import { User } from "@/types"

export const GET = async (res: Request) => {
    try {
        const { userId } = await auth()
        if (!userId) {
            return NextResponse.json({ error: "unauthorized" }, { status: 401 })
        }
        const users: User[] = []
        const userRef = await getDocs(collection(db, "users"))
        userRef.forEach((doc) => {
            users.push(doc.data() as User)
        })
        const userSnap = users.find((user: User) => user.clerkUserId === userId)
        console.log("userSnap", userSnap);

        if (!userSnap) {
            return NextResponse.json({ error: "user not found" }, { status: 404 })
        }
        return NextResponse.json(userSnap)
    } catch (error) {
        console.log("ERROR CONNECTING USERS DATABASE", error);

    }
}


export const POST = async (res: Request) => {
    try {
        const { userId } = await auth()
        if (!userId) {
            return NextResponse.json({ error: "unauthorized" }, { status: 401 })
        }

        const data: User = await res.json()
        const userRef = await addDoc(collection(db, "users"), data)
        const id = userRef.id
        const newData: User = {
            ...data,
            id,
            updatedAt: new Date().toISOString()
        }
        await setDoc(doc(db, "users", id), newData)
        return NextResponse.json("success")

    } catch (error) {
        console.log("ERROR CONNECTING USERS DATABASE", error);

    }
}

export const PATCH = async (res: Request) => {
    try {
        const { userId } = await auth()
        if (!userId) {
            return NextResponse.json({ error: "unauthorized" }, { status: 401 })
        }
        const data = await res.json()
        const userRef = await getDocs(collection(db, "users"))
        const users = userRef.docs.map(doc => ({ ...(doc.data() as User), id: doc.id }))
        const userSnap = users.find((user: User) => user.clerkUserId === userId)
        if (!userSnap) {
            return NextResponse.json({ error: "user not found" }, { status: 404 })
        }


        const updateData: any = {
            updatedAt: data.updatedAt,
        };
        if (data.removeShippingAddress) {
            updateData.shippingAddress = deleteField(); // ✅ delete field
            await updateDoc(doc(db, "users", userSnap.id), updateData);
            return NextResponse.json("Address removed successfully");
        }

        await updateDoc(doc(db, "users", userSnap.id), data)
        return NextResponse.json("success")
    } catch (error) {
        console.log("ERROR CONNECTING USERS DATABASE", error);

    }
}
