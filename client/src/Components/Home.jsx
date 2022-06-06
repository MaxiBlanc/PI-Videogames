import React from "react";
import { useState , useEffect } from 'react';
import { useDispatch, useSelector} from 'react-redux';
import {getVideogames, filterGamesbyGenres, filterCreated, orderByName, orderByRating} from '../Actions/Actions';
import { Link } from "react-router-dom";
import Card from "./Card";
import Paginado from "./Paginado"
import Search from "./Search";
import "./Card.css"

export default function Home(){
    const dispatch = useDispatch();
    const allGames = useSelector((state) => state.videogames)
    
    const [ordenR, setOrdenR] = useState('') // todos estos son estados locales
    const [orden, setOrden] = useState('')
    const [currentPage, setCurrentPage] = useState(1); // setcurrentpage seteo en 1, 
    const [videogamesPerPage /*setVideogamesPerPage*/] = useState(15);
    const indexOfLastVideogame = currentPage * videogamesPerPage; // 15
    const indexOfFirstVideogame = indexOfLastVideogame - videogamesPerPage; // 0
  //Videojuegos que estan en la pagina actual
    const currentVideogames = allGames.slice(
    indexOfFirstVideogame,
    indexOfLastVideogame
  );

  const paginado = (pageNumber) => {
    setCurrentPage(pageNumber);
  };


useEffect(()=>{
    dispatch(getVideogames())
},[dispatch])

function handleOrderAZ (e){
  e.preventDefault();
  dispatch(orderByName(e.target.value))
  setCurrentPage(1);
  setOrden(`Ordenado ${e.target.value}`)
};

function handleOrderRat (e){
  e.preventDefault();
  dispatch(orderByRating(e.target.value))
  setCurrentPage(1);
  setOrdenR(`Ordenado ${e.target.value}`)
};


function handleFilterGenres(e){
  dispatch(filterGamesbyGenres(e.target.value))
  setCurrentPage(1);
}

function handleFilterCreated(e){
  dispatch(filterCreated(e.target.value))
  setCurrentPage(1);
}


return (
  <div>
    <button className="btncreate">
        <h1>
          <Link to= '/videogame'>Create Videogame</Link>
          </h1>
    </button>
    <div className="videogame">
      <h1>🎮 Videogames Page 🎮</h1>
    </div>
        <div>
        <select defaultValue="Order Alphabetical"
        onChange={e => handleOrderAZ(e)}>
            <option disabled>Order Alphabetical</option>
            <option value= 'AZ'>A-Z</option>
            <option value= 'ZA'>Z-A</option>
        </select>
        <select defaultValue="Order by Rating"
        onChange={e => handleOrderRat(e)}>
            <option disabled>Order by Rating</option>
            <option value= 'max'>Max. rating</option>
            <option value= 'min'>Min. rating</option>
        </select>
        <select
          defaultValue="Genres"
          onChange={(e) => handleFilterGenres(e)}
          >
          <option disabled>Genres</option>
          <option value="All">All</option>
          <option value="Action">Action</option>
          <option value="Indie">Indie</option>
          <option value="Adventure">Adventure</option>
          <option value="RPG">RPG</option>
          <option value="Strategy">Strategy</option>
          <option value="Shooter">Shooter</option>
          <option value="Puzzle">Puzzle</option>
          <option value="Casual">Casual</option>
          <option value="Simulation">Simulation</option>
          <option value="Arcade">Arcade</option>
          <option value="Platformer">Platformer</option>
          <option value="Racing">Racing</option>
          <option value="Massively Multiplayer">Multiplayer</option>
          <option value="Sports">Sports</option>
          <option value="Fighting">Fighting</option>
          <option value="Family">Family</option>
          <option value="Educational">Educational</option>
          <option value="Card">Card</option>
        </select>
        <select
        defaultValue="Api or Created"
        onChange={(e) => handleFilterCreated(e)}
        >
            <option disabled>Api or Created</option>
            <option value="All">All</option>
            <option value="Created">Created</option>
            <option value="Api">Api</option>
        </select>
<Paginado
videogamesPerPage={videogamesPerPage}
allGames={allGames.length}
paginado={paginado}
/>

<Search/> 

        <div className="orden">

          {currentVideogames.length > 0 ? (
            currentVideogames.map((e) => {
              return (
                <div key={e.id}>
                  <Link to={"/home/" + e.id}>
                    <Card
                      name={e.name}
                      image={e.background_image}
                      genres={e.genres}
                      />
                  </Link>
                </div>
              );
            })
            ) 
            : (
              <div>
              <img src="http://pa1.narvii.com/6807/6d7562ffa0dbc0eee3f0f1c1e5e7bcc58fdb5bb6_00.gif"/>
              <h1>Loading...</h1>
            </div>
          )}
        </div>
        </div>
    </div>
)
}