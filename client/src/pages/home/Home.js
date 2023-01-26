import React from "react"
import Header from "../../components/header/header";
import Posts from "../../components/posts/posts";

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