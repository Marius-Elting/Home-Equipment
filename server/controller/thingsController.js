import { addThing, allThings, editOneThing, deleteOneThing } from "../models/thingsDao.js"
import fs from "fs"


export const getAllThings = async (req, res) => {
    try {
        const data = await allThings()

        res.status(200).json({ data, error: "Successfully Loaded", code: 200 })
    } catch (err) {
        res.status(400).json({ error: "Loading Failed", code: 500 })
    }
}

export const addNewThing = async (req, res) => {
    if (!req.file) {
        res.status(500).json({ error: "Please upload a picture", code: 500 })
        return
    }
    const newThing = {
        title: req.body.title,
        room: req.body.room,
        img: req.file.path,
        message: req.body.message,
        size: req.body.size
    }
    if (req.body.size !== "small" || req.body.size !== "notsobig" || req.body.size !== "big") {
        res.status(500).json({ error: "STOP EDITING MY CODE", code: 500 })
        await fs.promises.unlink(`./${newThing.img}`)
        return
    }
    if (!newThing.title || !newThing.room || !newThing.message || !newThing.img || !newThing.size) {
        res.status(500).json({ error: "Please specify everything", code: 500 })
        await fs.promises.unlink(`./${newThing.img}`)
        return
    }

    try {
        const data = await addThing(newThing)
        res.status(200).json({ error: "Element successfully written", code: 200 })
    } catch (err) {
        res.status(500).json({ error: "Server Error", code: 500 })
    }
}
export const editThing = async (req, res) => {

    let editedThing = {
        title: req.body.title,
        room: req.body.room,
        message: req.body.message,
        size: req.body.size
    }

    if (req.file === undefined) {
        editedThing.img = req.body.oldPic
    } else {
        editedThing.img = req.file.path
    }

    if (!editedThing.title || !editedThing.room || !editedThing.message || !editedThing.size) {
        res.status(500).json({ error: "Please specify everything", code: 500 })
        if (req.file !== undefined) {
            await fs.promises.unlink(`./${editedThing.img}`)
        }
        return
    }

    try {
        await editOneThing(editedThing, req.body.mongoId)
        const data = await allThings()
        res.status(200).json({ data, error: "Element successfully written and loaded", code: 200 })
    } catch (err) {
        res.status(500).json({ error: "Server Error", code: 500 })
    }
}


export const deleteThing = async (req, res) => {
    console.log(req.body)
    try {
        const a = await deleteOneThing(req.body.mongoId)
        console.log(a)
        const data = await allThings()
        res.status(200).json({ data, error: "Element successfully Removed", code: 200 })
    } catch (err) {
        res.status(500).json({ error: "Server Error", code: 500 })
    }
}