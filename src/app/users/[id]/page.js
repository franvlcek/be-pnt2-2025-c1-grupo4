"use client"
import { useState, useEffect, use } from "react";
import "../users.css";
import Link from "next/link";
import Image from "next/image";
import Comment from "@/app/comments/Comment";
import { useCurrentUser } from "@/app/login/useCurrentUser";

export default function PageDetail({params}){
    const {user,loading} = useCurrentUser();
    const {id}= use(params);
    const [currentUser, setUser]= useState([]);
    const [comments, setComments]= useState([]);
    const url = `http://localhost:8080/user/${id}`;
    let showComments = false;

    useEffect(()=>{
        fetch(url)
        .then((response) => response.json())
        .then((data) => {
            setUser(data.message);
            setComments(data.message.Comments);
        }).catch(error=>console.log(error));
        
    },[]);

    if(comments.length>0){
            showComments = true;
    }

    return(
        <>
            <ul>
            <li className="user-item">
                <div className="card user-item__content">
                    <Link href="">
                        <div className="user-item__image avatar">
                            <Image
                                src={`/img/user${currentUser["RoleId"]}.png`}
                                alt="User avatar"
                                width={50}
                                height={100}
                            />
                        </div>
                        <div className="user-item__info">
                            <h2>{currentUser["name"]}</h2>
                            <h3>{currentUser["mail"]}</h3>
                        </div>
                    </Link>
                </div>
            </li>
            <li>
                {user.role ===1 && <a href={`/users/${id}/edit`} className="generic-button">Edit</a> }
            </li>
            </ul>
            { showComments ? (
                <header className="page-header">
                    <p>Comments by this user:</p>
                </header>
            ) : (
                <header className="page-header">
                    <p>This user has not made any comments yet</p>
                </header>
            )}
            <ul className="users-list">
                {comments.map((comment,index)=>{
                    return(
                        <Comment key ={index} ID={comment["id"]} Content = {comment["content"]} 
                        Game={comment["Game"].gamename} GameLink={comment["GameId"]} />
                    )
                })}
            </ul>


        </>
    );
}