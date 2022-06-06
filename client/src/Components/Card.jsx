import React from "react"
import "./Card.css"

export default function Card({ name, image, genres }) {
    return(

        <div className="cnt">
            <h2 className="h1">{name}</h2>
            <img src={image} alt="img not found" width="550px" heigh="400px"/>
            <p className="p">{genres}</p>
        </div>

    );
}