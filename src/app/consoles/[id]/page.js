"use client"
import { useState, useEffect, use } from "react";
import "../consoles.css";
import Link from "next/link";
import Image from "next/image";
import Game from "@/app/games/Game";
import { useCurrentUser } from "@/app/login/useCurrentUser";

export default function PageDetail({params}){
    const {user,loading}=useCurrentUser();
    const {id}= use(params);
    const [console, setConsole]= useState([]);
    const [games, setGames]= useState([]);
    const url = `http://localhost:8080/console/${id}`;
    let showGames = false;

    useEffect(()=>{
        fetch(url)
        .then((response) => response.json())
        .then((data) => {
            setConsole(data.message);
            setGames(data.message.Games);
        }).catch(error=>console.log(error));
    },[]);
    if(games.length>0){
            showGames = true;
    }
    return(
        <>
            <ul>
            <li className="user-item">
                <div className="card user-item__content">
                    <Link href="">
                        <div className="user-item__image avatar">
                            <Image
                                src={`/img/consoleicon.png`}
                                alt="Console avatar"
                                width={50}
                                height={100}
                            />
                        </div>
                        <div className="user-item__info">
                            <h2>{console["name"]}</h2>
                        </div>
                    </Link>
                </div>
            </li>
            <li>
                {user.role ===1 && <a href={`/consoles/${console.id}/edit`} className="generic-button">Edit</a> }
            </li>
            </ul>
            { showGames ? (
                <header className="page-header">
                    <p>{console["name"]} games:</p>
                </header>
            ) : (
                <header className="page-header">
                    <p>There are no games for this console yet</p>
                </header>
            )}
            <ul className="users-list">
            {games.map((game,index)=>{
                return(
                    <Game key ={index} ID={game["id"]} Name = {game["gameName"]} />
                )
            })}
            </ul>
        
        </>
    );
}