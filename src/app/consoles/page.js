"use client"
import Console from "./Console";
import ConsoleList from "./ConsoleList";
import { useState, useEffect } from "react";
import "../styles/styles.css";
import { useCurrentUser } from "../login/useCurrentUser";

export default function ConsolePage(){
    const {user, loading}= useCurrentUser();
    const [consoles, setConsoles] = useState([]);
    useEffect(()=>{
        fetch("http://localhost:8080/console")
        .then((response) => response.json())
        .then((data) => {
            setConsoles(data.message);
        })
        .catch((error) => console.log(error));
    },[]);
    
    return(
        
        <>
            <header className="page-header">
                <h1>Consoles</h1>
                <p>Search games by Console!</p>
                {user.role ===1 && <a href="/consoles/create" className="generic-button">Add new Console</a> }
            </header>
            <ConsoleList Consoles={consoles} />
        </>
    );
}