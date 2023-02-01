import express from "express"
import "./config/config.js"
import { addNewThing, getAllThings, editThing } from "./controller/thingsController.js"
import { getDb } from "./utils/db.js"
import multer from "multer"
import cors from "cors"

const app = express()
const PORT = process.env.PORT || 9999
const upload = multer({ dest: "./public" })

app.use(express.json())
app.use(cors())
app.use("/public", express.static("./public"))

app.get("/api/getHomeEquipment", getAllThings)

app.post("/api/addHomeEquipment", upload.single("thingImage"), addNewThing)

app.put("/api/editHomeEquipment", upload.single("thingImage"), editThing)


app.listen(PORT, () => { console.log("Server läuft") })
