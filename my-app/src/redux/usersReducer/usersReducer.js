import { GET_USERS, GET_USERS_LOADING, GET_USERS_ERRORS } from "../actionTypes"

const initialState = {
    users: [],
    loading: false,
    error: null
}

export const usersReducer = (state = initialState, action) => {
    switch(action.type) {
        case GET_USERS_LOADING:
            return {
                ...state,
                loading: true
            }
        case GET_USERS:
            return {
                ...state,
                users: [...state.users, ...action.payload],
                loading: false
            }
        case GET_USERS_ERRORS:
            return {
                ...state,
                error: action.payload
            }
        default: {
            return state
        }
    }
}


export const getUsers = (offset) => {
    return async dispatch => {
        dispatch({type: GET_USERS_LOADING})
        try {           
            const response = await fetch(`https://gateway.marvel.com:443/v1/public/characters?limit=9&offset=${offset}&apikey=76bc5db775e2f95ca676f748bfd77c09`)
            const data = await response.json()
            // const allCharacters = data.data.results;
            const allCharacters = data.data.results.map(_transformCharacter);
            console.log(allCharacters)
            dispatch({type: GET_USERS, payload: allCharacters})
        } catch(e) {
            dispatch({type: GET_USERS_ERRORS, payload: e.toString()})
        }
    }
} 

const _transformCharacter = (char) => {
    return {
        id: char.id,
        name: char.name,
        description: char.description,
        thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
        homepage: char.urls[0].url,
        wiki: char.urls[1].url,
        comics: char.comics.items
    }
}