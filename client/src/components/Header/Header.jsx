import "./Header.css"
import { Link } from "react-router-dom"

const Header = ({ setPopUp }) => {
    const addHandler = () => {
        setPopUp(true)
    }
    return (
        <header>
            <nav>
                <ul>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/stuff/big">Big Stuff</Link></li>
                    <li><Link to="/stuff/notsobig">Not so big Stuff</Link></li>
                    <li><Link to="/stuff/small">Small Stuff</Link></li>
                    <li><button onClick={addHandler}>Add</button> </li>
                </ul>
            </nav>
        </header>
    )
}

export default Header
