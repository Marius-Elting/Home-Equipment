import { MongoClient } from "mongodb"

const url = process.env.MONGO_URL
const database = process.env.MONGO_DB

const client = new MongoClient(url)

let db

export const getDb = () => {
    return new Promise(async (resolve, reject) => {
        if (db) resolve(db)
        try {
            await client.connect()
            db = client.db(database)
            resolve(db)
        }
        catch (err) {
            reject(err)
        }
    })
}
