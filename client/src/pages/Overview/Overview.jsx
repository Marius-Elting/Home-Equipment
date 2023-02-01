import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import InputPopUp from "../../components/inputPopUp/InputPopUp"
import "./Overview.css"

const Overview = ({ showPopUp, setPopUp, setalertSetting, setShowAlert }) => {
    const { category } = useParams()
    const [stuff, setStuff] = useState()
    const [editMode, setEditMode] = useState(false)

    useEffect(() => {
        setShowAlert(true)
        setalertSetting({ message: "Loading Elements", type: "Loading" })
        fetch(process.env.REACT_APP_BACKEND_URL + "/api/getHomeEquipment")
            .then(res => res.json())
            .then(data => {
                switch (data.code) {
                    case 500: setalertSetting({ message: data.error, type: "Error" })
                        break
                    case 200: setalertSetting({ message: data.error, type: "Success" })
                        break
                    case 400: setalertSetting({ message: data.error, type: "Error" })
                        break
                    default: setalertSetting({ message: data.error, type: "Error" })
                }

                setStuff(data.data.filter(single => single.size === category))


                setTimeout(() => {
                    setShowAlert(false)
                }, 1000)
            })
    }, [category])

    const handleFormSubmit = (e, mongoId, oldPic) => {
        e.preventDefault()
        setShowAlert(true)
        setalertSetting({ message: "Editing Element", type: "Loading" })
        const form = new FormData(e.target)
        form.append("mongoId", mongoId)
        form.append("oldPic", oldPic)

        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/editHomeEquipment`, {
            method: "PUT",
            body: form
        })
            .then(res => res.json())
            .then(data => {

                setStuff(data.data.filter(single => single.size === category))
                console.log(data)
                switch (data.code) {
                    case 500: setalertSetting({ message: data.error, type: "Error" })
                        break
                    case 200: setalertSetting({ message: data.error, type: "Success" })
                        break
                    case 400: setalertSetting({ message: data.error, type: "Error" })
                        break
                    default: setalertSetting({ message: data.error, type: "Error" })
                }
                setEditMode(false)
            })
            .catch(err => {
                setalertSetting({ message: "Editing Failed", type: "Error" })
            })

        setTimeout(() => {
            setShowAlert(false)
        }, 2000)
    }
    if (!stuff) return


    return (
        <main className="OverviewWrapper">
            {showPopUp && <InputPopUp setPopUp={setPopUp} setShowAlert={setShowAlert} setalertSetting={setalertSetting} />}

            {stuff.map((data, index) => {
                if (editMode === data._id) {
                    return (
                        <form className="SingleElementWrapper SingleElementWrapperForm" onSubmit={(e) => handleFormSubmit(e, data._id, data.image)}>
                            <label htmlFor="title">Title</label>
                            <input defaultValue={data.title} type="text" id="title" placeholder="title" name="title"></input>
                            <label htmlFor="room">Room</label>
                            <input defaultValue={data.room} type="text" id="room" placeholder="room" name="room"></input>
                            <select defaultValue={data.size} name="size">
                                <option name="size" value="small">Small</option>
                                <option name="size" value="notsobig">Not so big</option>
                                <option name="size" value="big">Big</option>
                            </select>
                            <label htmlFor="message">Message</label>
                            <textarea defaultValue={data.message} type="text" id="message" placeholder="message" name="message"></textarea>
                            <label htmlFor="image">Image</label>
                            <input fileName={data.image} type="file" id="image" placeholder="image" name="thingImage"></input>
                            <div>
                                <button type="button" onClick={() => setEditMode(false)}>Exit</button>
                                <button type="submit">Submit</button>

                            </div>
                        </form>
                    )
                } else {
                    return (
                        <article key={index} className="SingleElementWrapper">
                            <img src={`${process.env.REACT_APP_BACKEND_URL}/${data.img}`} alt={data.title}></img>
                            <div className="TextWrapper">
                                <h3>{data.title}</h3>
                                <p>{data.room}</p>
                                <h3>Beschreibung:</h3>
                                <p>{data.message}</p>
                            </div>
                            <button value={data._id} onClick={(e) => setEditMode(e.target.value)}>edit</button>
                        </article>
                    )
                }
            })}
        </main>
    )
}

export default Overview
