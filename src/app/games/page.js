"use client"
import Game from "./Game";
import GameList from "./GameList";
import { useState, useEffect } from "react";
import "../styles/styles.css";
import { useCurrentUser } from "../login/useCurrentUser";

export default function GamePage(){
    const {user, loading}= useCurrentUser();
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
            <header className="page-header">
                <h1>Games</h1>
                <p>Our selection of games</p>
                {user.role ===1 && <a href="/games/create" className="generic-button">Add new Game</a> }
            </header>
            <GameList Games={games} />
        </>
    );
}