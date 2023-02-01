import { Link } from "react-router-dom"
import "./Home.css"
import InputPopUp from "../../components/inputPopUp/InputPopUp"

const Home = ({ showPopUp, setPopUp, setalertSetting, setShowAlert }) => {
    return (
        <main className="HomeWrapper">
            {showPopUp && <InputPopUp setPopUp={setPopUp} setShowAlert={setShowAlert} setalertSetting={setalertSetting} />}
            <section className="Home-UpperSection">
                <h1>My Furniture</h1>
            </section>
            <section className="Home-LowerSection">
                <article>
                    <Link to="/stuff/small">
                        <img src="https://images.unsplash.com/photo-1584589167171-541ce45f1eea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80" alt="small decoration"></img>
                        <p>Small Stuff</p>
                    </Link>
                </article>
                <article>
                    <Link to="/stuff/notsobig">
                        <img src="https://images.unsplash.com/photo-1632935187086-49a9d8027292?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=722&q=80" alt="not so big decoration"></img>
                        <p>Not so big Stuff</p>
                    </Link>
                </article>
                <article>
                    <Link to="/stuff/big">
                        <img src="https://images.unsplash.com/photo-1596900779744-2bdc4a90509a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=938&q=80" alt="big decoration"></img>
                        <p>Big Stuff</p>
                    </Link>
                </article>
            </section>
        </main>
    )
}

export default Home
