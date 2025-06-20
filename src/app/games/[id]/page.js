"use client"
import { useState, useEffect, use } from "react";
import "../games.css";
import Link from "next/link";
import Image from "next/image";
import GameList from "../GameList";
import Comment from "@/app/comments/Comment";
import { useCurrentUser } from "@/app/login/useCurrentUser";
import { useParams } from "next/navigation";

export default function PageDetail({params}){
    const {user} = useCurrentUser();
    const {id}= useParams();
    const [game, setGame]= useState([]);
    const [genre, setGenre]= useState([]);
    const [console, setConsole]= useState([]);
    const [comments, setComments]= useState([]);
    const [newComment, setNewComment] = useState([]);
    let showComments = false;
    useEffect(()=>{
        const url = `http://localhost:8080/game/${id}`;
        if(!id){
            return;
        }
         fetch(url)
        .then((response) => response.json())
        .then((data) => {
            setGame(data.message);
            setGenre(data.message.Genre);
            setConsole(data.message.Console);
            setComments(data.message.Comments);
            
        }).catch(error=>console.log(error));
        
    },[id]);

    if(comments.length>0){
            showComments = true;
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();

        if (!user || !user.id) {
            return;
        }

        try {
            const res = await fetch("http://localhost:8080/comment",{
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded"}, 
            body : new URLSearchParams({
                content: newComment,
                UserId: user.id,
                GameId: id,
            }),
            credentials:"include",
        });
        if (res.ok) {
            const data = await res.json();
            //setComments([...comments, data.message]);
            setNewComment("");
            window.location.href = `/games/${id}`;
        }
        } catch (error){
            console.log(error);
        }
        
    };

    return(
        <>
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
                <header className="page-header">
                    <p>Comments:</p>
                </header>
            ) : (
                <header className="page-header">
                    <p>There are no comments for this game yet</p>
                </header>
            )}

            <ul className="users-list">
                {comments.map((comment,index)=>{
                    return(
                        <Comment key ={index} ID={comment["id"]} Content = {comment["content"]} User={comment["User"].name} 
                        Role={comment["User"].RoleId} UserLink={comment["User"].id} />
                    )
                })}
            </ul>

                <form className="comment-form" onSubmit={handleSubmit}>
                    <textarea
                    value={newComment}
                    onChange={(e)=>setNewComment(e.target.value)}
                    placeholder="Leave a comment on this game"
                    required
                    />
                    <button type="submit">Post Comment</button>
                </form>


        </>
    );
}