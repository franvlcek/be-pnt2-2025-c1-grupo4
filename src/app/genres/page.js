"use client"
import Genre from "./Genre";
import GenreList from "./GenreList";
import { useState, useEffect } from "react";

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
            <a href="/" className="card user-item__content">Back to Home</a>
            <div className="user-item__info">
                <h2>Search Games by Genre!</h2>
            </div>
            <GenreList Genres={genres} />
        </>
    );
}