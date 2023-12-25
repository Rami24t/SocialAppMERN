import React from "react";
import { createContext, useReducer } from "react";
// import { useNavigate } from 'react-router-dom'
export const SocialContext = createContext();

export default function ContextProvider({ children }) {
  // const Navigate = useNavigate();
  const reducer = (state, action) => {
    switch (action.type) {
      case "login":
        return {
          ...state,
          user: { ...action.payload },
        };
      case "logout":
        return reset;
      case "saveProfile":
        return {
          ...state,
          user: { ...action.payload },
        };
      case "updateCover":
        return {
          ...state,
          user: { ...state.user, coverImage: action.payload },
        };
      case "setViewProfile":
        return {
          ...state,
          viewProfileData: action.payload,
        };
      default:
        return state;
    }
  };
  const reset = {
    user: {
      name: "",
      title: "",
      email: "",
      phone: "",
      about: "",
      likes: [],
      facebook: "",
      twitter: "",
      instagram: "",
      username: "",
      coverImage: "",
      profileImage: "",
      followers: [],
      followings: [],
      isAdmin: false,
      _id: "",
      createdAt: "",
      updatedAt: "",
      verified: false,
    },
    posts: [],
    // isFetching: false,
    // error: false
  };
  const [state, dispatch] = useReducer(reducer, reset);
  return (
    <SocialContext.Provider value={{ state, dispatch }}>
      {children}
    </SocialContext.Provider>
  );
}
