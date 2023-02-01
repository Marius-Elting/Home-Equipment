import React from 'react'
import "./Alert.css"
const Alert = ({ message, type }) => {
    return (
        <div className="Alert"
            style={{
                "backgroundColor": type === "Error" ? "Red" : type === "Success" ? "Green" : "Yellow"
            }}>
            <p>{message}</p>
        </div>
    )
}

export default Alert
