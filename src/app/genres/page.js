"use client"
import Genre from "./Genre";
import GenreList from "./GenreList";
import { useState, useEffect } from "react";
import "../styles/styles.css";

export default function GenrePage(){
    const [genres, setGenres] = useState([]);
    useEffect(()=>{
        fetch("http://localhost:8080/genre")
        .then((response) => response.json())
        .then((data) => {
            setGenres(data.message);
        })
        .catch((error) => console.log(error));
    },[]);
    
    return(
        
        <>
            <header className="page-header">
                <h1>Genres</h1>
                <p>Search games by Genre!</p>
            </header>
            <GenreList Genres={genres} />
        </>
    );
}