import React from "react"
import Header from "../../components/header/Header";
import Posts from "../../components/posts/Posts";

export default function Home() {
    return (
        <>
        <Header/>
        <div className="homeContainer">
            <Posts/>
        </div>
        </>
    )
}