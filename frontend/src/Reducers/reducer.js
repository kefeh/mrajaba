import client from '../services/Client'

export const initialState = {
    showRegister: false,
    showAddFolder: false,
    showAddFile: false,
    fileType: '',
    user: {},
    active_user: '',
    active_class: 'Administrative',
    active_nav: 'Recently',
}

function reducer (state, action) {
    switch(action.type) {
        case 'SHOW_REGISTER':
            return {
                ...state,
                showRegister: true,
            };
        case 'SHOW_ADD_FOLDER':
            return {
                ...state,
                showAddFolder: true,
            };
        case 'SHOW_ADD_FILE':
            return {
                ...state,
                showAddFile: true,
            };
        case 'HIDE_REGISTER':
            return {
                ...state,
                showRegister: false,
            };
        case 'HIDE_ADD_FOLDER':
            return {
                ...state,
                showAddFolder: false,
            };
        case 'HIDE_ADD_FILE':
            return {
                ...state,
                showAddFile: false,
            };
        case 'ADD_USER':
            client.setDataAndToken(action.item)
            return {
                ...state,
                user: action.item
            }
        case 'SET_USER':
            return {
                ...state,
                user: client.getUserData()
            }
        case 'ADD_ACTIVE_USER':
            return {
                ...state,
                active_user: action.item,
            }
        case 'ADD_ACTIVE_CLASS':
            return {
                ...state,
                active_class: action.item,
            }
        case 'ADD_ACTIVE_NAV':
            return {
                ...state,
                active_nav: action.item,
            }
        default:
            return state;
    }
}

export default reducer