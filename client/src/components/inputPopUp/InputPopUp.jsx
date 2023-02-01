import "./inputPopUp.css"

const InputPopUp = () => {

    const handleFormSubmit = (e) => {
        const form = new FormData(e.target)
        fetch(process.env.REACT_APP_BACKEND_URL)

    }
    return (
        <div className="inputPopUpWrapper">
            <h4>Add a new one</h4>
            <form onSubmit={handleFormSubmit}>
                <label htmlFor="title">Title</label>
                <input type="text" id="title" placeholder="title" name="title"></input>
                <label htmlFor="room">Room</label>
                <input type="text" id="room" placeholder="room" name="room"></input>
                <select>
                    <option name="small">Small</option>
                    <option name="notsobig">Not so big</option>
                    <option name="big">Big</option>
                </select>
                <label htmlFor="message">Message</label>
                <input type="text" id="message" placeholder="message" name="message"></input>
                <label htmlFor="image">Image</label>
                <input type="file" id="image" placeholder="image" name="thingImage"></input>
                <button type="submit">Add</button>
            </form>
        </div>
    )
}

export default InputPopUp
