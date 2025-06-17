"use client"
import { useState, useEffect, use } from "react";
import "../genres.css";
import Link from "next/link";
import Image from "next/image";
import Game from "@/app/games/Game";

export default function PageDetail({params}){
    const {id}= use(params);
    const [genre, setGenre]= useState([]);
    const [games, setGames]= useState([]);
    const url = `http://localhost:8080/genre/${id}`;
    let showGames = false;

    useEffect(()=>{
        fetch(url)
        .then((response) => response.json())
        .then((data) => {
            setGenre(data.message);
            setGames(data.message.Games);
        }).catch(error=>console.log(error));
        
    },[]);
    
    if(games.length>0){
            showGames = true;
    }

    return(
        <>
            <a href="/genres" className="card user-item__content">Back to Genres</a>
            
            <ul>
            <li className="user-item">
                <div className="card user-item__content">
                    <Link href="">
                        <div className="user-item__image avatar">
                            <Image
                                src={`/img/genreicon.png`}
                                alt="Genre avatar"
                                width={50}
                                height={100}
                            />
                        </div>
                        <div className="user-item__info">
                            <h2>{genre["genreName"]}</h2>
                        </div>
                    </Link>
                </div>
            </li>
            </ul>
            { showGames ? (
                <div className="user-item__info">
                    <h2>{genre["genreName"]} games:</h2>
                </div>
            ) : (
                <div className="user-item__info">
                    <h2>There are no Games for this genre yet</h2>
                </div>
            )}
            <ul>
                {games.map((game,index)=>{
                    return(
                        <Game key ={index} ID={game["id"]} Name = {game["gameName"]} />
                    )
                })}
            </ul>
        </>
    );
}