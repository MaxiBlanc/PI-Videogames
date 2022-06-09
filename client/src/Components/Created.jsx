import React from "react";
import { useState , useEffect } from 'react';
import { Link } from "react-router-dom";
import { postVideogame, getGenres } from '../Actions/Actions'
import { useDispatch, useSelector } from "react-redux";
import "./created.css"


export default function VideogameCreate(){
    const dispatch = useDispatch()
    const allgenres = useSelector((state) => state.genres)
    const [error,setError] = useState({}) 

    const [input,setInput] = useState({
        name: "",
        description: "",
        background_image : "",
        released : "",
        rating : "",
        platforms : [],
        genres: []
    })

    useEffect(()=>{
        dispatch(getGenres())
    },[])

    function validation (input){
        let error = {}
        if (!input.name) error.name = "You must enter a name for the game"
        if (!input.description) error.description = "You must enter a description for the game"
        if (!input.background_image) error.background_image = "You must enter a image for the game"
        if (input.rating<1 || input.rating>5) error.rating = "You must assign a rating between 1 and 5"
        if (input.platforms.length<1) error.platforms = "select at least one platforms for the game"
        if (input.genres.length<1) error.genres = "select at least one genre for the game"
        return error
    }

    function handleOnChange(e) {
        setInput({
          ...input,
          [e.target.name]: e.target.value
        })
        setError(validation({
           ...input,
          [e.target.name]: e.target.value
        }))
     }
     
     
          function handleGenres(e){
                 setInput({
                     ...input,
                     genres: [...input.genres, e.target.value]
                 })
                 setError(validation({
                     ...input,
                    genres:[...input.genres, e.target.value]
                  }))
         }
          
     function handleDeleteG(e){
        setInput({
            ...input,
            genres: input.genres.filter(g => g !== e)
        })
        setError(validation({
            ...input,
           genres: input.genres.filter(g=> g !==e)
         }))
    }
    
    function handlePlatforms(e){
            setInput({
                ...input,
                platforms: [...input.platforms, e.target.value]
            })
            setError(validation({
               ...input,
              platforms:[...input.platforms, e.target.value]
            }))
    }

     function handleDeleteP(e){
         setInput({
             ...input,
             platforms: input.platforms.filter(g => g !== e)
         })
         setError(validation({
            ...input,
           platforms:input.platforms.filter(g=> g !==e)
         }))
     }
     
     function handleSubmit(e){
        e.preventDefault()
        if (
             error.name ||
             error.rating ||
             error.description ||
             error.background_image ||
             !input.name ||
             error.genres ||
             error.platforms ||
             error.released
         ) {alert ("The video game could not be created, check to complete all the data correctly")
        } else {
             e.preventDefault();
             dispatch(postVideogame(input))
             alert ("the Videogame has been created successfully")
             setInput({
                 name: "",
                 description: "",
                 background_image : "",
                 released : "",
                 rating : "",
                 platforms : [],
                 genres: []
                })
            }
}

    //ctrl k u descom
    //ctrl k c com

    return(
        <div>
            <Link to='/home'><button className="back">◀ Back</button></Link>
            <div className="title">
            <h1>💽 Crea tu Videojuego 👾</h1>
            </div>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="data">
                <div>
                <h1>🕹️ Name 🕹️</h1>
                </div>
                <div>
                <input type="text"
                value= {input.name}
                name= "name"
                onChange={(e)=> handleOnChange(e)}/>
                {error.name && <p>{error.name}</p>}
                </div>
                </div>
                <div className="data">
                <div>
                <h1>🔮 Genres 🔮</h1>
                </div>
                <div>  
                    <select onChange={(e)=> handleGenres(e)}>
                        {allgenres.map((g) => (
                            <option value={g.name}>{g.name}</option>
                        ))}
                    </select>
                </div>
                <ul>
                        {input.genres.map(e => (
                            <div>
                                <ul>{e}<button
                                    type="button"
                                    onClick={() => handleDeleteG(e)}
                                    >X</button>
                                </ul>
                            </div>
                        ))}
                    </ul>
                        {error.genres && <p>{error.genres}</p>}
                    </div>
                <div className="data">
                <div>
                <h1>📸 Image 📸</h1>
                </div>
                <div>
                <input type="text"
                value= {input.background_image}
                name= "background_image" 
                onChange={(e)=> handleOnChange(e)}/>
                {error.background_image && <p>{error.background_image}</p>}
                </div>
                </div>
                <div className="data">
                <div>
                <h1>⭐ Rating ⭐</h1>
                </div>
                <div>
                <input type="number"
                value= {input.rating}
                name= "rating" 
                onChange={(e)=> handleOnChange(e)}/>
                {error.rating && <p>{error.rating}</p>}
                </div>
                </div>
                <div className="data"> 
                <div>
                <h1>📜 Description 📜</h1>
                </div>
                <div>
                <input type="text"
                value= {input.description}
                name= "description" 
                onChange={(e)=> handleOnChange(e)}/>
                {error.description && <p>{error.description}</p>}
                </div>
                </div>
                <div className="data">
                <div>
                <h1>🖥️ Platforms 🖥️</h1>
                </div>
                <div>
                <label>
                <select onChange={(e)=> handlePlatforms(e)}>
                            <option value="Nintendo">Nintendo</option>
                            <option value="PlayStation">PlayStation</option>
                            <option value="Xbox">Xbox</option>
                            <option value="Apple Macintosh">Apple Macintosh</option>
                            <option value="Linux">Linux</option>
                            <option value="iOS">iOS</option>
                            <option value="Android">Android</option>
                            <option value="PC">PC</option>
                    </select>  
                </label>
                </div>
                <ul>
                        {input.platforms.map(e => (
                            <div>
                                <ul>{e}<button
                                    type="button"
                                    onClick={() => handleDeleteP(e)}
                                    >X</button>
                                </ul>
                            </div>
                        ))}
                        {error.platforms && <p>{error.platforms}</p>}
                    </ul>
                    </div>
                <div className="data">
                <div>
                <h1>📅 Released 📅</h1>
                </div>
                <div>
                <input type="date"
                value= {input.released}
                name= "released" 
                onChange={(e)=> handleOnChange(e)}/>
                </div>
                </div>
                <button className="crear" type="submit">Crear</button>
            </form>
            <div>...</div>
        </div>
    )

}