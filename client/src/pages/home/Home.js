import React from "react"
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";
import Navbar from "../../components/navbar/Navbar";

export default function Home() {
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