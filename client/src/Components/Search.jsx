import React from "react";
import { useState } from 'react';
import { useDispatch } from "react-redux";
import { getVideoName } from "../Actions/Actions";

export default function Search (props) {
    const dispatch = useDispatch()
    const [name, setName] = useState (" ")
    const {setCurrentPage}=props
    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
    }

    function handleSubmit(e){
        setCurrentPage(1)
        e.preventDefault()
        dispatch(getVideoName(name))//voy guardando lo q va tipeando el usuario en mi estado local name
        
    }

    return(
        <div>
            <input type="text"
            placeholder="Search by name..."
            onChange = {(e) => handleInputChange(e)} />
            <button type="submit" onClick={(e)=> handleSubmit(e)}> Search </button>
        </div>
    )


    
}