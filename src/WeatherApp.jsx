import SearchBox from "./SearchBox"
import InfoCard from "./InfoCard"
import './App.css'
import { useState } from "react"

export default function WeatherApp() {
    const [info,setInfo] = useState({})
    function getInfo(info){
        setInfo(info)
    }
    return (
        <>
            <div className="weatherApp">
                <SearchBox getInfo={getInfo}/>
                <InfoCard info={info}/>
            </div>
        </>
    )
}