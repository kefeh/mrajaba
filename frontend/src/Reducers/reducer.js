import client from '../services/Client'

export const initialState = {
    showRegister: false,
    user: {}
}

function reducer (state, action) {
    switch(action.type) {
        case 'SHOW_REGISTER':
            return {
                ...state,
                showRegister: true,
            };
        case 'HIDE_REGISTER':
            return {
                ...state,
                showRegister: false,
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
        default:
            return state;
    }
}

export default reducer