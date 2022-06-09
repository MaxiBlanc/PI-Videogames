import React from "react";
import { useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import { getDetails } from '../Actions/Actions';
import { Link, useParams } from "react-router-dom";
import  "./Detail.css"

export default function Detail () {
    const dispatch = useDispatch();
    const {id} = useParams(); //lo pasamos por params, lo saca de la url
    
    useEffect(()=>{
        dispatch(getDetails(id)) 
    },[id])// que el use effect se dispache cada vez que cambia el id(la matriz de dependencia)

    const GamesId = useSelector((state) => state.videogamesId)


return(
    <div>
        <Link to='/home'><button className="back">◀ Back</button></Link>
        <div  className="name">
        <h1>🕹️ {GamesId.name} 🕹️</h1>
        </div>
                            <div className="data">
                            <h1>🔮 Genres:</h1>
                            <h1>{GamesId.genres}</h1>
                            </div>
                            <img src={GamesId.background_image?GamesId.background_image : "https://www.trecebits.com/wp-content/uploads/2019/04/11854.jpg"} alt={"img not found"}  width="1000px" height="600px"/>
                            <div className="data">
                            <h1>⭐ Rating: </h1>
                            <h1>{GamesId.rating}</h1>
                            </div>
                            <div className="data">
                            <h1>📜 Description:</h1>
                            <h3>{GamesId.description}</h3>
                            </div>
                            <div className="data">
                            <h1>🖥️ Platforms: </h1>
                            <h1>{GamesId.platforms}</h1>
                            </div>
                            <div className="data">
                            <h1>📅 Released:</h1>
                            <h1>{GamesId.released}</h1>
                            </div>
    </div>
)

}