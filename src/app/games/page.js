"use client"
import Game from "./Game";
import GameList from "./GameList";
import { useState, useEffect } from "react";

export default function GamePage(){
    //ACA VA EL FETCH AL BACKEND CON LOS USUARIOS
    //ALMACENAR STATE
    //PASAR A USERLIST
    const [games, setGames] = useState([]);
    useEffect(()=>{
        fetch("http://localhost:8080/game")
        .then((response) => response.json())
        .then((data) => {
            setGames(data.message);
        })
        .catch((error) => console.log(error));
    },[]);
    
    return(
        
        <>
            <a href="/" className="card user-item__content">Back to Home</a>
            <div className="user-item__info">
                <h2>Our selection of games:</h2>
            </div>
            <GameList Games={games} />
        </>
    );
}