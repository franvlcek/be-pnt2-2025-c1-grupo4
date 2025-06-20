"use client"
import CommentList from "./CommentList";
import { useState, useEffect } from "react";
import "../styles/styles.css";

export default function CommentPage(){

    fetch("http://localhost:8080/user/me",{
            method: "GET",
            credentials: "include",
        }).then((res)=>res.json()).then((data)=>{
            if(data.message.role !==1){
                window.location.href = "/unauthorized";
            }
        }).catch((error) => console.log(error));
   
    const [comments, setComments] = useState([]);
    useEffect(()=>{
        fetch("http://localhost:8080/comment")
        .then((response) => response.json())
        .then((data) => {
            setComments(data.message);
        })
        .catch((error) => console.log(error));
    },[]);
    
    return(
        
        <>
            <header className="page-header">
                <h1>Comments</h1>
                <p>All comments on the platform, for Admin eyes only</p>
            </header>
            <CommentList Comments={comments} />
        </>
    );
}