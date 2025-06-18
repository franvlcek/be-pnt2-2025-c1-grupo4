"use client"
import CommentList from "./CommentList";
import { useState, useEffect } from "react";

export default function CommentPage(){
   
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
            <a href="/" className="card user-item__content">Back to Home</a>
            <div className="user-item__info">
                <h2>Comments</h2>
            </div>
            <CommentList Comments={comments} />
        </>
    );
}