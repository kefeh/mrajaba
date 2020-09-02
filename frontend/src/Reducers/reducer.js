export const initialState = {
    showRegister: false
}

function reducer (state, action) {
    switch(action.type) {
        case 'SHOW_REGISTER':
            break;
        case 'HIDE_REGISTER':
            break;
        default:
            return state;
    }
}

export default reducer