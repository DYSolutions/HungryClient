import { db } from "@/lib/firebase"
import { auth } from "@clerk/nextjs/server"
import { NextResponse } from "next/server"
import { addDoc, collection, deleteField, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore"
import { Order, User } from "@/types"

export const GET = async (res: Request) => {
    try {
        const { userId } = await auth()
        if (!userId) {
            return NextResponse.json({ error: "unauthorized" }, { status: 401 })
        }
        const users: User[] = []
        const orders: Order[] = []
        const userRef = await getDocs(collection(db, "users"))
        userRef.forEach((doc) => {
            users.push(doc.data() as User)
        })
        const userSnap = users.find((user: User) => user.clerkUserId === userId)
        console.log("userSnap", userSnap);

        if (!userSnap) {
            return NextResponse.json({ error: "user not found" }, { status: 404 })
        }

        const orderSnap = await getDocs(collection(db, "users", userSnap.id,"orders"))
       orderSnap.forEach((doc) => {
           orders.push(doc.data() as Order)
       })
        return NextResponse.json(orders)
       
    } catch (error) {
        console.log("ERROR CONNECTING ORDER DATABASE", error);

    }
}


export const POST = async (res: Request) => {
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

        const data: Order = await res.json()
        const orderRef = await addDoc(collection(db, "users", userSnap.id, "orders"), data)
        const id = orderRef.id
        const newData: Order = {
            ...data,
            id,
            updatedAt: new Date().toISOString()
        }
        await setDoc(doc(db, "users", userSnap.id, "orders", id), newData)
        return NextResponse.json("success")

    } catch (error) {
        console.log("ERROR CONNECTING ORDERS DATABASE", error);

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

        await updateDoc(doc(db, "users", userSnap.id, "orders", data.id), data)

        return NextResponse.json("success")
    } catch (error) {
        console.log("ERROR CONNECTING ORDERS DATABASE", error);

    }
}
