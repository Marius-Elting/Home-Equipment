import "./inputPopUp.css"

const InputPopUp = ({ setPopUp, setalertSetting, setShowAlert }) => {

    const handleFormSubmit = (e) => {
        setShowAlert(true)
        setalertSetting({ message: "Adding Element", type: "Loading" })

        e.preventDefault()
        const form = new FormData(e.target)
        fetch(`${process.env.REACT_APP_BACKEND_URL}/api/addHomeEquipment`, {
            method: "POST",
            body: form
        })
            .then(res => res.json())
            .then(res => {
                console.log(res)
                switch (res.code) {
                    case 500: setalertSetting({ message: res.error, type: "Error" })
                        break
                    case 200: setalertSetting({ message: res.error, type: "Success" })
                        setPopUp(false)
                        break
                    case 400: setalertSetting({ message: res.error, type: "Error" })
                        break
                    default: setalertSetting({ message: res.error, type: "Error" })
                }
            })
            .catch(err => {
                setalertSetting({ message: "Adding Failed", type: "Error" })
            })

        setTimeout(() => {
            setShowAlert(false)
        }, 2000)
    }

    const handleExit = () => {
        setPopUp(false)
    }

    return (
        <div className="inputPopUpWrapper">
            <h4>Add a new one</h4>
            <form onSubmit={handleFormSubmit}>
                <label htmlFor="title">Title</label>
                <input type="text" id="title" placeholder="title" name="title"></input>
                <label htmlFor="room">Room</label>
                <input type="text" id="room" placeholder="room" name="room"></input>
                <select name="size">
                    <option name="size" value="small">Small</option>
                    <option name="size" value="notsobig">Not so big</option>
                    <option name="size" value="big">Big</option>
                </select>
                <label htmlFor="message">Message</label>
                <textarea type="text" id="message" placeholder="message" name="message"></textarea>
                <label htmlFor="image">Image</label>
                <input type="file" id="image" placeholder="image" name="thingImage"></input>
                <div>
                    <button type="submit">Add</button>
                    <button type="reset">Reset</button>
                    <button onClick={handleExit} type="button">Exit</button>
                </div>
            </form>
        </div>
    )
}

export default InputPopUp
