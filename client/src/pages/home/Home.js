import React, { useEffect } from "react"
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Navbar from "../../components/navbar/Navbar";
import {useContext} from 'react';
import {SocialContext} from '../../context/Context';
import axios from "axios";

export default function Home() {
    const {state,dispatch} = useContext(SocialContext);
    useEffect(() => {
        document.title = "Social App 💗";
        state.user = axios.get('http://localhost:5000/users/me', {withCredentials: true})
    }, [])
    return (
        <>
        <Navbar/>
        <Header/>
        <div className="homeContainer">
            <Posts/>
        </div>
        </>
    )
}