"use client"
import { useState, useEffect, use } from "react";
import "../games.css";
import Link from "next/link";
import Image from "next/image";
import GameList from "../GameList";
import Comment from "@/app/comments/Comment";

export default function PageDetail({params}){
    const {id}= use(params);
    const [game, setGame]= useState([]);
    const [genre, setGenre]= useState([]);
    const [console, setConsole]= useState([]);
    const [comments, setComments]= useState([]);
    const url = `http://localhost:8080/game/${id}`;
    let showComments = false;

    useEffect(()=>{
         fetch(url)
        .then((response) => response.json())
        .then((data) => {
            setGame(data.message);
            setGenre(data.message.Genre);
            setConsole(data.message.Console);
            setComments(data.message.Comments);
            
        }).catch(error=>console.log(error));
        
    },[]);

    if(comments.length>0){
            showComments = true;
    }

    return(
        <>
            <a href="/games" className="card user-item__content">Back to Games</a>
            <ul>
            <li className="user-item">
                <div className="card user-item__content">
                    <Link href="">
                        <div className="user-item__image avatar">
                            <Image
                                src={`/img/gameicon.png`}
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
            </ul>
            { showComments ? (
                <div className="user-item__info">
                    <h2>Comments:</h2>
                </div>
            ) : (
                <div className="user-item__info">
                    <h2>There are no comments for this game yet</h2>
                </div>
            )}

            <ul>
                {comments.map((comment,index)=>{
                    return(
                        <Comment key ={index} ID={comment["id"]} Content = {comment["content"]} User={comment["User"].name} 
                        Role={comment["User"].RoleId} UserLink={comment["User"].id} />
                    )
                })}
            </ul>

        </>
    );
}