import "./Header.css"
import { Link } from "react-router-dom"
import Alert from "../Alert/Alert"

const Header = ({ setPopUp, alertSetting, showAlert }) => {
    const pathname = window.location.pathname
    const addHandler = () => {
        setPopUp(true)
    }
    return (
        <header>
            {showAlert && <Alert message={alertSetting.message} type={alertSetting.type} />}

            {/* <Alert message="DANGER" type="Error" /> */}
            <nav>
                <ul>
                    <li className={pathname === "/home" ? "current" : ""} ><Link to="/home">Home</Link></li>
                    <li className={pathname === "/stuff/big" ? "current" : ""} ><Link to="/stuff/big">Big Stuff</Link></li>
                    <li className={pathname === "/stuff/notsobig" ? "current" : ""} ><Link to="/stuff/notsobig">Not so big Stuff</Link></li>
                    <li className={pathname === "/stuff/small" ? "current" : ""} ><Link to="/stuff/small">Small Stuff</Link></li >
                    <li ><button onClick={addHandler}>Add</button> </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header
