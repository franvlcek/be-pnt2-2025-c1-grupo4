"use client"
import { useState, useEffect, use } from "react";
import "../games.css";
import Link from "next/link";
import Image from "next/image";
import GameList from "../GameList";

export default function PageDetail({params}){
    const {id}= use(params);
    const [game, setGame]= useState([]);
    const [genre, setGenre]= useState([]);
    const [console, setConsole]= useState([]);
    const url = `http://localhost:8080/game/${id}`;

    useEffect(()=>{
         fetch(url)
        .then((response) => response.json())
        .then((data) => {
            setGame(data.message);
            setGenre(data.message.Genre);
            setConsole(data.message.Console);
            
        }).catch(error=>console.log(error));
        
    },[]);

    return(
        <>
            <a href="/games" className="card user-item__content">Back to Games</a>
            
            <li className="user-item">
                <div className="card user-item__content">
                    <Link href="">
                        <div className="user-item__image avatar">
                            <Image
                                src={`/img/consoleicon.png`}
                                alt="Game avatar"
                                width={50}
                                height={100}
                            />
                        </div>
                        <div className="user-item__info">
                            <h2>{game["gameName"]}</h2>
                            <h3>{genre["genreName"]}</h3>
                            <h3>{console["name"]}</h3>
                        </div>
                    </Link>
                </div>
            </li>
        </>
    );
}