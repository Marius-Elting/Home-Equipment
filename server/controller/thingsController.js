import { addThing, allThings, editOneThing } from "../models/thingsDao.js"
import fs from "fs"


export const getAllThings = async (req, res) => {
    try {
        const data = await allThings()

        res.status(200).json({ data, error: "Erfolgreich Geladen", code: 200 })
    } catch (err) {
        res.status(400).json({ error: "Laden Fehlgeschlagen", code: 500 })
    }
}

export const addNewThing = async (req, res) => {
    if (!req.file) {
        res.status(500).json({ error: "Bitte lade ein Bild hoch", code: 500 })
        return
    }
    const newThing = {
        title: req.body.title,
        room: req.body.room,
        img: req.file.path,
        message: req.body.message,
        size: req.body.size
    }
    if (!newThing.title || !newThing.room || !newThing.message || !newThing.img || !newThing.size) {
        res.status(500).json({ error: "Bitte alles angeben", code: 500 })
        await fs.promises.unlink(`./${newThing.img}`)
        return
    }

    try {
        const data = await addThing(newThing)
        res.status(200).json({ error: "Daten erfolgreich geschrieben", code: 200 })
    } catch (err) {
        res.status(500).json({ error: "Server Error", code: 500 })
    }
}
export const editThing = async (req, res) => {
    let editedThing;

    if (req.file === undefined) {
        console.log("undefined", req.file)
        editedThing = {
            title: req.body.title,
            room: req.body.room,
            img: req.body.oldPic,
            message: req.body.message,
            size: req.body.size
        }
    } else {
        console.log("Defined", req.file)
        editedThing = {
            title: req.body.title,
            room: req.body.room,
            img: req.file.path,
            message: req.body.message,
            size: req.body.size
        }
    }

    console.log(editedThing)

    if (!editedThing.title || !editedThing.room || !editedThing.message || !editedThing.size) {
        res.status(500).json({ error: "Bitte alles angeben", code: 500 })
        if (req.file !== undefined) {
            await fs.promises.unlink(`./${editedThing.img}`)
        }
        return
    }

    try {
        await editOneThing(editedThing, req.body.mongoId)
        const data = await allThings()
        console.log(data)
        res.status(200).json({ data, error: "Daten erfolgreich geschrieben und geladen", code: 200 })
    } catch (err) {
        console.log(err)
        res.status(500).json({ error: "Server Error", code: 500 })
    }
}