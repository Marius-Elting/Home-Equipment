import { addThing, allThings } from "../models/thingsDao.js"
import fs from "fs"
export const getAllThings = async (req, res) => {
    try {
        const data = await allThings()
        res.status(200).json({ data })
    } catch (err) {
        res.status(400).json("Can not get Data")
    }
}

export const addNewThing = async (req, res) => {
    const newThing = {
        title: req.body.title,
        room: req.body.room,
        img: req.file.path,
        message: req.body.message,
        size: req.body.size
    }
    if (!newThing.title || !newThing.room || !newThing.message || !newThing.img || !newThing.size) {
        res.status(500).send("Bitte alles angeben")
        await fs.promises.unlink(`./${newThing.img}`)
        return
    }

    try {
        const data = await addThing(newThing)
        res.status(200).send("Daten geschrieben")
    } catch (err) {
        res.status(400).send(err)
    }
}