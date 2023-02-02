import React from 'react'
import { createContext, useReducer } from 'react'
export const SocialContext = createContext()
export default function ContextProvider({children})
{
    const reducer = (state, action) => {
        switch(action.type) {
            case 'login':
            return {
                ...state,
                user: {...action.payload}
            }
            case 'logout':
                return {
                    user: {},
                    posts: []
                }
            default:
                return state
            }
        }
    const [state, dispatch] = useReducer(reducer, 
        {
            user: null,
            posts: [],
            isFetching: false,
            error: false
        })    
  return (
    <SocialContext.Provider value={{state, dispatch}}>
        {children}
    </SocialContext.Provider>
  )
}