export const initialState = {
    showRegister: false
}

function reducer (state, action) {
    switch(action.type) {
        case 'SHOW_REGISTER':
            return {
                ...state,
                showRegister: true,
            };
        case 'HIDE_REGISTER':
            return {state};
        default:
            return state;
    }
}

export default reducer