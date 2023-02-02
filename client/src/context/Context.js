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
                return reset
            case 'saveProfile':
                return {
                    ...state,
                    user: {...action.payload}
                }
            default:
                return state
            }
        }
        const reset = {
                user: {
                        name: '',
                        title: '',
                        email: '',
                        phone: '',
                        about: '',
                        likes:  [],
                        facebook: '',
                        twitter: '',
                        instagram: '',
                        username: ''
                     },       
                posts: [],
                isFetching: false,
                error: false
            }
    const [state, dispatch] = useReducer(reducer, reset)
  return (
    <SocialContext.Provider value={{state, dispatch}}>
        {children}
    </SocialContext.Provider>
  )
}