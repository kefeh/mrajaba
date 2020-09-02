import React, {createContext, useContext} from 'react'

const StateContext = useContext(contextValue)

function StateProvider({reducer, initialState, children}) {
    return (
        <StateContext.Provider value={useReducer(reducer, initialState, init)}>
            {children}
        </StateContext.Provider>
    )
}

export default StateProvider
