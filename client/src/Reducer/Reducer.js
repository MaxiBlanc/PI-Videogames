const initialState = {
    videogames : [],
    videogamesId: [],
    AllVideogames: [],
    genres: []  
}

function rootReducer (state = initialState, action){
    switch(action.type){ 
        case 'GET_VIDEOGAMES':
            return{
                ...state,
                videogames: action.payload, 
                AllVideogames: action.payload 
            }
        case 'GET_DETAILS':
            return{
                ...state,
                videogamesId: action.payload
            }
            case 'FILTER_BY_GENRES':
                const allGames = state.AllVideogames;
                const FilterbyG = action.payload === 'All' ? allGames 
                : allGames.filter(e => e.genres.includes(action.payload))
            return{
                ...state,
                videogames: FilterbyG 
            }
            case 'FILTER_CREATED':
                const allVidegames = state.AllVideogames;
               const created_Filter = action.payload === 'Created' ? allVidegames.filter(e=> typeof e.id=== "string")
               : allVidegames.filter(e=> typeof e.id=== "number")
            return{
                ...state,
                videogames: action.payload === "All" ? state.AllVideogames : created_Filter
            }
            case 'ORDER_BY_NAME':
                let Order = action.payload === 'AZ'?
                state.videogames.sort(function (a,b){
                    if (a.name > b.name){
                        return 1;
                    }
                    if (b.name > a.name) {
                        return -1;
                    }
                    return 0;
                }):
                state.videogames.sort(function (a,b){
                if (a.name > b.name){
                    return -1;
                }
                if (b.name > a.name) {
                    return 1;
                }
                return 0;
            })
            return{
                ...state,
                videogames: Order
            }
            case 'ORDER_BY_RATING':
                let OrderRat = action.payload === 'min'?
                state.videogames.sort(function (a,b){
                    if (a.rating > b.rating){
                        return 1;
                    }
                    if (b.rating > a.rating) {
                        return -1;
                    }
                    return 0;
                }):
                state.videogames.sort(function (a,b){
                if (a.rating > b.rating){
                    return -1;
                }
                if (b.rating > a.rating) {
                    return 1;
                }
                return 0;
            })
            return{
                ...state,
                videogames: OrderRat
            }
            case 'GET_VIDEONAME':
                return{
                    ...state,
                    videogames: action.payload
                }
            case 'POST_VIDEOGAME':
            return {
                ...state
            }
            case 'GET_GENRES':
                return {
                    ...state,
                    genres: action.payload
                }


            default:
                return state;
    }
}

export default rootReducer ;