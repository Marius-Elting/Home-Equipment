import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import "./Overview.css"

const Overview = () => {
    const { category } = useParams()
    const [stuff, setStuff] = useState()

    useEffect(() => {
        fetch(process.env.REACT_APP_BACKEND_URL + "/api/getHomeEquipment")
            .then(res => res.json())
            .then(data => { setStuff(data.data.filter(single => single.size === category)) })

    }, [category])
    console.log(stuff)

    if (!stuff) return


    return (
        <main>
            {stuff.map((data) => {
                if (data.size !== category) return null

                return (
                    <div>
                        <img src={`${process.env.REACT_APP_BACKEND_URL}/${data.img}`} alt={data.title}></img>
                        <div>
                            <h3>{data.title}</h3>
                            <p>{data.room}</p>
                            <p>{data.message}</p>
                        </div>
                    </div>
                )
            })}
        </main>
    )
}

export default Overview
