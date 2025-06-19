"use client";
import Link from "next/link";
import "../styles/styles.css";
import { useState, useEffect, use } from "react";

export default function Navbar() {
    const [username, setUsername] = useState([]);
    useEffect(()=>{
        const token = localStorage.getItem("token");
        console.log(token); 
        if(!token){
            return
        }
        fetch("http://localhost:8080/user/me",{
            method: "GET",
            credentials: "include",
        }).then((res)=>res.json()).then((data)=>{
            setUsername(data.message.name);
            console.log(data);
        }).catch((error) => console.log(error));
    },[]); 


  return (
    <nav className="navbar">
          <a href="/">Home</a>
          <a href="/users">Users </a>
          <a href="/games">Games </a>
          <a href="/consoles">Consoles </a>
          <a href="/genres">Game Genres</a>
          {username ? (
                <p className="redtext">Logged in as {username}</p>
            ) : (
                <p><a href="/login">Login</a></p>
            )}
    </nav>
  );
}