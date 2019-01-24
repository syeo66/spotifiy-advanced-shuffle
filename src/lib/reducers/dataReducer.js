import { 
    FETCH_USER, 
    LOAD_LIBRARY_PAGE,
    FETCH_LIBRARY, 
    FIRST_PAGE,
    PREVIOUS_PAGE, 
    NEXT_PAGE,
    FETCH_PLAYLISTS,
    APPEND_PLAYLISTS,
    FETCH_PLAYER,
    FETCH_PLAY_STATE,
    TOGGLE_CONFIG,
    UPDATE_CONFIG,
    DB_COUNT,
} from "../actions/types";
import db from '../database';

export default (state = {}, action) => {
    switch (action.type) {
        case FIRST_PAGE:
            return {
                ...state,
                currentPage: 1,
            };
        case NEXT_PAGE:
            const currentPage = Math.min(Math.ceil(state.librarySize / state.itemsPerPage), state.currentPage+1);
            return {
                ...state, 
                currentPage: currentPage,
            };
        case PREVIOUS_PAGE:
            return {...state, currentPage: Math.max(1, state.currentPage-1)};
        case APPEND_PLAYLISTS:
            const playlists = state.playlists.concat(action.payload.items);
            return {
                ...state,
                playlists: playlists,
                playlistsSize: action.payload.total,
            };
        case FETCH_PLAYLISTS:
            return {
                ...state,
                playlists: action.payload.items,
                playlistsSize: action.payload.total,
            };
        case LOAD_LIBRARY_PAGE:
            return {
                ...state,
                library: action.payload,
            };
        case FETCH_LIBRARY:
            return {
                ...state,
                current: action.payload.current,
                librarySize: action.payload.total,
            };
        case DB_COUNT:
            return {
                ...state,
                dbSize: action.payload.dbSize || 0,
            };
        case FETCH_USER:
            return {...state,user:action.user};
        case FETCH_PLAYER:
            return {...state,devices:action.devices.devices};
        case FETCH_PLAY_STATE:
            return {...state,playstate:action.playstate};
        case TOGGLE_CONFIG:
            return {...state,showConfig:!state.showConfig};
        case UPDATE_CONFIG:
            return {...state,config:{...state.config,...action.config}};
        default:
            return state;
    }
}