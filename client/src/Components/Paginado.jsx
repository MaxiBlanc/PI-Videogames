import React from "react";
import "./Paginado.css"

export default function Paginado ({videogamesPerPage,allGames, paginado}){

    const pageNumbers = []

    for (let i=0; i<Math.ceil(allGames/videogamesPerPage); i++){
        pageNumbers.push(i+1)
    }
 
    return(
        <nav>
            <ul>
                <div className="paginado">

                {pageNumbers &&
                pageNumbers.map(number => (
                    <ul key={number}>
                    <button className="number" onClick={() => paginado(number)}>{number}</button>
                    </ul>
                ))}
                </div>
            </ul>
        </nav>
    )
    }