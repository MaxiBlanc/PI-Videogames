import axios from 'axios';
 
export function getVideogames(){
    return async function(dispatch){
        var json = await axios.get("http://localhost:3001/videogames");
        return dispatch({
            type: 'GET_VIDEOGAMES',
            payload: json.data
        })
    }
}

export function getDetails(id){
    return async function(dispatch){
        try{
            const json = await axios.get(`http://localhost:3001/videogames/`+id);
            return dispatch({
                type: 'GET_DETAILS',
                payload: json.data
            })
        }catch (error){
            console.log(error)
        }
     }
    }

export function filterGamesbyGenres (payload){
    console.log(payload)
    return{
        type:'FILTER_BY_GENRES',
        payload,
    }
}

export function filterCreated (payload){
    console.log(payload)
    return{
        type:'FILTER_CREATED',
        payload,
    }
}

export function orderByName (payload){
    return {
        type: 'ORDER_BY_NAME',
        payload
    }
}

export function orderByRating (payload){
    return {
        type: 'ORDER_BY_RATING',
        payload
    }
}

export function getVideoName (name){
    return async function (dispatch){
        try {
            var json = await axios.get('http://localhost:3001/videogames?name=' + name);
            return dispatch ({
                type : "GET_VIDEONAME",
                payload: json.data
            })
        } catch (error) {
            alert("There is no Videogame with the name entered")
        }
    }
}

export function getGenres() {
    return async function (dispatch) {
        var json = await axios.get("http://localhost:3001/genres",{

        });
        return dispatch({
            type: "GET_GENRES",
            payload: json.data
        })
    }
}

export function postVideogame(payload){
    return async function () {
        const json = await axios.post("http://localhost:3001/videogame",payload);
        return json;
    }
}
