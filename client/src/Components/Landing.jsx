import React from 'react';
import {Link} from 'react-router-dom';
import styledLanding from './LandingPage.module.css'

export default function Landing(){
    return (
        <div className={styledLanding.background}>
            <div>
            <button className={styledLanding.h1}>videogames</button>
            </div>
            <div>
            <Link to = '/home'> 
            <button className={styledLanding.btn}>
                <img src="http://imagenesquesemueven.com/wp-content/uploads/2014/10/Im%C3%A1genes-que-se-Mueven-de-Mario-Bros-4.gif" />
                <h1>START</h1>
                </button>
            </Link>
            </div>
        </div>
    )
}

