"use client";
import Link from "next/link";
import "../styles/styles.css";
import { useState, useEffect } from "react";
import LogoutButton from "../logout/LogoutButton";

export default function Navbar() {
    const [username, setUsername] = useState([]);
    const [userrole, setUserrole] = useState([]);
    useEffect(()=>{
        const token = localStorage.getItem("token");
        
        if(!token){
            return
        }
        fetch("http://localhost:8080/user/me",{
            method: "GET",
            credentials: "include",
        }).then((res)=>res.json()).then((data)=>{
            setUsername(data.message.name);
            setUserrole(data.message.role);
        }).catch((error) => console.log(error));
    },[]); 

  return (
    <nav className="navbar">
          <a href="/">Home</a>
          {userrole ===1 && <a href="/users">Users </a> }
          <a href="/games">Games </a>
          <a href="/consoles">Consoles </a>
          <a href="/genres">Game Genres</a>
          {userrole ===1 && <a href="/comments">Comments </a> }
          {username ? (
                <p className="login-section" >
                    <i>Logged in as {username} </i>
                    <LogoutButton/>
                </p>
            ) : (
                <p className="login-button"><a href="/login">Login</a></p>
            )}
    </nav>
  );
}