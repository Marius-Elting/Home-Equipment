import { Db } from "mongodb"
import { getDb } from "../utils/db.js"


export const allThings = async () => {
    const db = await getDb()
    const pointer = await db.collection("Things").find()
    const data = await pointer.toArray()
    return data
}

export const addThing = async (newThing) => {
    try {
        const db = await getDb()
        const pointer = await db.collection("Things").insertOne(newThing)
        return pointer
    } catch (err) {
        return err
    }
}